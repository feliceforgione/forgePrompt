import { client } from "@root/sanity/lib/client";
import { groq } from "next-sanity";
import { GetPostQueryResult } from "@root/sanity.types";

export interface SearchParams {
  date?: string;
  title?: string;
  postType?: string;
  category?: string;
  tag?: string;
  search?: string;
}

const cache = "default";

const postFields = `
  _id,
  publishedAt,
  title,
  "slug":slug.current,
  author-> {
    name,
    image
  },
  postType,
  'categories': categories[]->,
  'tags': tags[]->,
  mainImage,
  excerpt,
  body`;

const headings = `"headings": body[style in ["h2", "h3", "h4", "h5"]]`;

type GetPostQueryResultWithHeadings = GetPostQueryResult & {
  headings?: Array<string | HTMLHeadElement>;
};

export async function getPost(slug: string = "") {
  const getPostQuery = groq`*[_type == "post" && slug.current == "${slug}"][0] {${postFields}, ${headings}}`;

  return await client.fetch<GetPostQueryResultWithHeadings>(
    getPostQuery,
    {},
    { cache: cache }
  );
}

export async function getPosts(
  searchParams: SearchParams = {}
): Promise<GetPostQueryResult[]> {
  const { date, title, category, postType, search, tag } = searchParams;

  const postFilter = `_type=="post"`;
  const categoryFilter = category
    ? ` && ('${category}' in categories[]->slug.current)`
    : "";
  const tagFilter = tag ? ` && ('${tag}' in tags[]->slug.current)` : "";
  const postTypeFilter = postType ? ` && postType == '${postType}'` : "";
  const searchFilter = search
    ? ` && (title match "${search}" ||  body match "${search}") `
    : "";
  const filter = `${postFilter}${categoryFilter}${tagFilter}${postTypeFilter}${searchFilter}`;

  const orderDate = date ? `publishedAt ${date}` : "";
  const orderTitle = title ? `title ${title}` : "";
  const order = orderDate || orderTitle;
  const orderClause = order && ` | order(${order})`;

  return await client.fetch(
    groq`*[${filter}] ${orderClause} {${postFields}}`,
    {},
    { cache: cache }
  );
}

export async function getPostsByTag(tag: string = "") {
  return await client.fetch(
    groq`*[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id) ] {      
      ${postFields}}`,
    {},
    { cache: cache }
  );
}
