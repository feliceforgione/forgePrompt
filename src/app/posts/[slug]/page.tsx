import Share from "@/app/components/Share";
import Tags from "@/app/components/Tags";
import getPortableTextComponents from "@/app/hooks/getPortableTextComponents";
import { getPost } from "@/app/hooks/getPosts";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@root/sanity/lib/image";
import { shimmer, toBase64 } from "@root/src/lib/image";
import Head from "next/head";
import Image from "next/image";

interface Props {
  params: {
    slug: string;
  };
}
export const revalidate = 60; // nextjs will revalidate this page every 60 seconds

export default async function Page({ params }: Props) {
  const { slug } = params;
  const post = await getPost(slug);

  const myPortableTextComponents = getPortableTextComponents;

  if (!post) {
    return <div>Post not found</div>;
  }
  const { title, body, mainImage, publishedAt, author, tags } = post;

  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
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
          </div>
          <div className="text-gray-600 text-lg my-4 dark:text-gray-400">
            <PortableText value={body!} components={myPortableTextComponents} />
            <Tags tags={tags} />
          </div>

          <Share
            shareUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/posts/${slug}`}
            title={title}
          />
        </article>
      </div>
    </main>
  );
}
