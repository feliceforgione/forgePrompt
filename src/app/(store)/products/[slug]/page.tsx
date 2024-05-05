import { Product } from "@root/sanity.types";
import { client } from "@root/sanity/lib/client";
import { groq } from "next-sanity";
import { ProductInfo } from "../components/ProductInfo";
import { ProductGallery } from "../components/ProductGallery";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const products = await client.fetch<Product[]>(
    groq`*[_type == "product" && slug.current == "${slug}"] {
      name,
      currency,
      _id,
      sku,
      price,
      description,
      _updatedAt,
      "slug": slug.current,
      images
    }`,
    {},
    { cache: "no-cache" }
  );

  const product = products[0];

  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Product */}
        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  );
}
