"use client";

import { TagCloud } from "react-tagcloud";
import { useRouter } from "next/navigation";

function TagsCloud({ tags }: any) {
  const router = useRouter();
  return (
    <TagCloud
      minSize={14}
      maxSize={35}
      tags={tags}
      onClick={(tag) => router.push(`/tags/${tag.value}`)}
    />
  );
}

export default TagsCloud;
