import { Product } from "@root/sanity.types";
import ProductCard from "./ProductCard";
import NoItemFoundCard from "@/app/components/posts/NoItemFoundCard";

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return <NoItemFoundCard itemType="post" />;
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
