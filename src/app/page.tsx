import HeroCanvas from "@/app/components/hero/herocanvas";
import { PostSort } from "@/app/components/postfilter/PostSort";
import { PostGrid } from "@/app/components/posts/PostGrid";
import { getPosts, SearchParams } from "@/app/hooks/getPosts";
import Link from "next/link";

interface Props {
  searchParams: SearchParams;
}

export const revalidate = 60; // nextjs will revalidate this page every 60 seconds

export default async function Home({ searchParams }: Props) {
  const posts = await getPosts(searchParams);

  return (
    <div>
      <HeroCanvas />
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-4 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              <Link href="/posts">Posts</Link>
            </h1>
            <PostSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Posts
            </h2>
            <div className={"grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2"}>
              <PostGrid posts={posts} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
