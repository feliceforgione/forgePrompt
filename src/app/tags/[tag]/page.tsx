import PostsView from "@/app/components/posts/PostsView";
import { getPostsByTag } from "@/app/hooks/getPosts";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import React from "react";

interface Params {
  params: {
    tag: string;
  };
}

export const revalidate = 60; // nextjs will revalidate this page every 60 seconds

export async function generateMetadata({ params }: Params) {
  const { tag } = params;
  return {
    title: `#${params.tag}`,
    description: `Posts with the tag ${tag}`,
    openGraph: {
      title: `#${params.tag}`,
      description: `Posts with tag ${tag}`,
      url: `${siteConfig.url}/tags/${tag}`,
      siteName: "Forge Prompt",
      locale: "en-US",
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/open-graph.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

async function Page({ params }: Params) {
  const { tag } = params;
  const posts = await getPostsByTag(tag);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="border-b py-6 text-center">
        <h2 className=" text-2xl font-bold">#{tag}</h2>
        <p className="text-sm italic">
          <Link href="/tags/">#tags</Link>
        </p>
      </div>
      <PostsView posts={posts} />
    </div>
  );
}

export default Page;
