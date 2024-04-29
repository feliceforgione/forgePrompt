"use client";
import { GetPostQueryResult } from "@root/sanity.types";
import { List, Table } from "lucide-react";
import { useState } from "react";
import NoItemFoundCard from "./NoItemFoundCard";
import { PostGrid } from "./PostGrid";
import { PostList } from "./PostList";

interface Props {
  posts: GetPostQueryResult[];
  style?: "grid" | "list";
}

function PostsView({ posts, style = "grid" }: Props) {
  const [viewStyle, setViewStyle] = useState(style);

  if (posts.length === 0) {
    return <NoItemFoundCard itemType="post" />;
  }
  return (
    <div>
      <div className="hidden sm:flex justify-end gap-3 px-4 py-3">
        <Table
          className="cursor-pointer"
          onClick={() => setViewStyle("grid")}
        />
        <List className="cursor-pointer" onClick={() => setViewStyle("list")} />
      </div>
      {viewStyle === "list" ? (
        <PostList posts={posts} />
      ) : (
        <PostGrid posts={posts} />
      )}
    </div>
  );
}

export default PostsView;
