import PostsView from "@/app/components/posts/PostsView";
import { getPostsByTag } from "@/app/hooks/getPosts";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    tag: string;
  };
}

export const revalidate = 60; // nextjs will revalidate this page every 60 seconds

async function Page({ params }: Props) {
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
