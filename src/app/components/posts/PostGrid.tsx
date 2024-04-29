import { GetPostQueryResult } from "@root/sanity.types";
import NoItemFoundCard from "./NoItemFoundCard";
import PostCard from "./PostCard";

interface Props {
  posts: GetPostQueryResult[];
}

export function PostGrid({ posts }: Props) {
  if (!posts || posts.length === 0) {
    return <NoItemFoundCard itemType="post" />;
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
      {posts.map((post) => (
        <PostCard key={post?._id} post={post} />
      ))}
    </div>
  );
}
