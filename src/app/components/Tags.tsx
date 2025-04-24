import { Tag } from "@root/sanity.types";
import Link from "next/link";
import React from "react";

interface Props {
  tags: Tag[] | null;
}

function Tags({ tags }: Props) {
  if (!tags) return null;
  return (
    <div>
      {tags?.map((tag) => (
        <Link key={tag._id} href={`/tags/${tag.slug!.current}`}>
          <span className="mr-2 p-1 text-sm lowercase rounded-sm">
            #{tag.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Tags;
