import { GetPostQueryResult, Post } from "@root/sanity.types";
import PostListCard from "./PostListCard";

interface Props {
  posts: GetPostQueryResult[];
}

export function PostList({ posts }: Props) {
  if (!posts || posts.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 ">
      {posts.map((post) => (
        <PostListCard key={post?._id} post={post} />
      ))}
    </div>
  );
}
