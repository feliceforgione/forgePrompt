import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemaTypes/blockContent";
import category from "./schemaTypes/category";
import post from "./schemaTypes/post";
import author from "./schemaTypes/author";
import product from "./schemaTypes/product";
import siteSettings from "./schemaTypes/siteSettings";
import tag from "./schemaTypes/tag";
import comment from "./schemaTypes/comment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    blockContent,
    comment,
    product,
    tag,
    siteSettings,
  ],
};
