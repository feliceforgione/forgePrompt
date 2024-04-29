import { client } from "@root/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "@root/sanity.types";

export async function getProducts() {
  const products = await client.fetch<Product[]>(
    groq`*[_type=="product"] {
      name,
      currency,
      _id,
      sku,
      price,
      description,
      _updatedAt,
      "slug": slug.current,
      images
    } `,
    {},
    { cache: "no-cache" }
  );

  return products;
}
