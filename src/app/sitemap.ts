import { siteConfig } from "@/config/site";
import { MetadataRoute } from "next";
import { getPosts } from "./hooks/getPosts";
import { getTags } from "./hooks/getTags";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const tags = await getTags();

  const postsUrls = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post?.slug}`,
    lastModified: new Date(post?.publishedAt!),
  }));

  const tagUrls = tags.map((tag) => ({
    url: `${siteConfig.url}/tags/${tag?.slug.current}`,
    lastModified: new Date(),
  }));

  const footerUrls = siteConfig.footer.map((item) => ({
    url: `${siteConfig.url}/${item.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${siteConfig.url}`,
      lastModified: new Date(),
    },
    ...footerUrls,
    ...postsUrls,
    ...tagUrls,
  ];
}
