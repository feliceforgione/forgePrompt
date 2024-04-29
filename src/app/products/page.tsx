import { client } from "@root/sanity/lib/client";
import { groq } from "next-sanity";

import { cn } from "@/utils/utils";
import { getProducts } from "../hooks/getProducts";
import { ProductGrid } from "./components/ProductGrid";

export default async function Page() {
  const products1 = await getProducts();
  const products = [...products1, ...products1, ...products1];

  return (
    <div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-4 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Products
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div
              className={"grid grid-cols-1 gap-x-8 gap-y-10  lg:grid-cols-4"}
            >
              <ProductGrid products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
