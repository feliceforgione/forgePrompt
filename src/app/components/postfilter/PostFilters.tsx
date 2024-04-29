import { client } from "@root/sanity/lib/client";
import PostFilterForm from "./PostFilterForm";
import { groq } from "next-sanity";

export interface IFilterOptions {
  value: string;
  label: string;
}

export interface IFilter {
  id: string;
  name: string;
  options: IFilterOptions[];
}

interface Props {
  enableCategories?: boolean;
  enablePostTypes?: boolean;
  enableTags?: boolean;
}

const cache = "default";

export async function PostFilters({
  enableCategories,
  enablePostTypes,
  enableTags,
}: Props) {
  const filters: IFilter[] = [];

  if (enableCategories) {
    const categories = await client.fetch(
      groq`*[_type == "category"] {"value":slug.current, "label": title}`,
      {},
      { cache: cache }
    );

    filters.push({
      id: "category",
      name: "Category",
      options: categories,
    });
  }

  if (enablePostTypes) {
    const postTypes = await client.fetch(
      groq`array::unique(*[_type=="post" ].postType)`,
      {},
      { cache: cache }
    );

    const postTypesFilter = postTypes.map((postType: string) => ({
      value: postType,
      label: postType,
    }));

    filters.push({
      id: "postType",
      name: "Post Type",
      options: postTypesFilter,
    });
  }

  if (enableTags) {
    const tags = await client.fetch(
      groq`*[_type == "tag"] {"value":slug.current, "label": title}`,
      {},
      { cache: cache }
    );
    filters.push({ id: "tag", name: "Tags", options: tags });
  }
  return <PostFilterForm filters={filters} />;
}
