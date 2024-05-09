import AddComment from "@/app/components/comments/AddComment";
import AllComments from "@/app/components/comments/AllComments";
import TableOfContents from "@/app/components/posts/TableOfContents";
import Share from "@/app/components/Share";
import Tags from "@/app/components/Tags";
import getPortableTextComponents from "@/app/hooks/getPortableTextComponents";
import { getPost } from "@/app/hooks/getPosts";
import { siteConfig } from "@/config/site";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@root/sanity/lib/image";
import { shimmer, toBase64 } from "@root/src/lib/image";
import Head from "next/head";
import Image from "next/image";
import { Icons } from "@/app/components/icons";
interface Params {
  params: {
    slug: string;
  };
}
export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const post = await getPost(slug);
  if (!post) {
    return;
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/posts/${slug}`,
      siteName: "Forge Prompt",
      locale: "en-US",
      type: "article",
      images: [
        {
          url: post.mainImage
            ? urlForImage(post.mainImage?.asset!)
            : `${siteConfig.url}/open-graph.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export const revalidate = 60; // nextjs will revalidate this page every 60 seconds

export default async function Page({ params }: Params) {
  const { slug } = params;
  const post = await getPost(slug);

  const myPortableTextComponents = getPortableTextComponents;

  if (!post) {
    return <div>Post not found</div>;
  }
  const { title, body, mainImage, publishedAt, author, tags, headings } = post;

  return (
    <main className="mx-auto max-w-5xl  sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <Head>
          <title>{title}</title>
        </Head>
        <article>
          <h1 className="text-4xl font-bold text-center my-6">{title}</h1>
          <hr />
          <div className="flex justify-between py-3 ">
            <span>{new Date(publishedAt!).toDateString()}</span>
            <span>By {author?.name}</span>
          </div>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
            {mainImage ? (
              <Image
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(900, 600)
                )}`}
                src={urlForImage(mainImage!.asset!)}
                alt={mainImage?.alt || "Post image"}
                width={900}
                height={600}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="h-full w-full object-cover object-center">
                {Icons.defaultImagePlaceholder({})}{" "}
              </div>
            )}
          </div>

          {headings && headings.length > 1 && (
            <div className="float-right  my-8 mx-4 ">
              <TableOfContents headings={headings} />
            </div>
          )}
          <div className={richTextStyles}>
            <PortableText value={body!} components={myPortableTextComponents} />
            <Tags tags={tags} />
          </div>

          <Share
            shareUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/posts/${slug}`}
            title={title}
          />
          <div className="mt-14">
            <AddComment postId={post?._id} />
          </div>
          <div className="mt-8">
            <AllComments comments={post?.comments} />
          </div>
        </article>
      </div>
    </main>
  );
}

const richTextStyles = `
mt-14
text-justify
max-w-4xl
m-auto
prose
prose-zinc
prose-lg
prose-headings:scroll-mt-16
dark:prose-invert
`;
