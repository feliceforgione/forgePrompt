import { Tag } from "@root/sanity.types";
import { client } from "@root/sanity/lib/client";
import { groq } from "next-sanity";

export async function getTags() {
  return await client.fetch<Tag[]>(
    groq`*[_type == 'tag'] {
        "value": slug.current,
        "count": count(*[_type == "post" && references("tags", ^._id)])
      }`,
    {},
    { cache: "default" }
  );
}
