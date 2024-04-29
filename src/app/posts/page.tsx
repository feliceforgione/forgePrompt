import { PostFilters } from "@/app/components/postfilter/PostFilters";
import { PostSort } from "@/app/components/postfilter/PostSort";
import { getPosts, SearchParams } from "@/app/hooks/getPosts";
import { cn } from "@/utils/utils";
import { client } from "@root/sanity/lib/client";
import { groq } from "next-sanity";
import PostsView from "../components/posts/PostsView";

interface Props {
  searchParams: SearchParams;
}

export const revalidate = 60; // nextjs will revalidate this page every 60 seconds

export default async function Page({ searchParams }: Props) {
  const posts = await getPosts(searchParams);
  return (
    <div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-4 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Posts
            </h1>
            <PostSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Posts
            </h2>
            <div
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-10 ",
                posts.length > 0
                  ? "lg:grid-cols-[1fr_3fr]"
                  : "lg:grid-cols-[1fr_3fr]"
              )}
            >
              <div className="hidden lg:block">
                <PostFilters enableCategories enablePostTypes enableTags />
              </div>
              <PostsView posts={posts} style="list" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
