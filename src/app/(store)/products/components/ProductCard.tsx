import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@root/sanity/lib/image";
import { shimmer, toBase64 } from "@/lib/image";
import { Product } from "@root/sanity.types";

interface Props {
  product: Product;
}

const basePath = "/products";

function ProductCard({ product }: Props) {
  const { _id, slug, images, name, price, currency } = product;
  return (
    <Link key={_id} href={`${basePath}/${slug}`} className="group text-sm">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
        {images && images.length > 0 && (
          <Image
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(225, 280)
            )}`}
            src={urlForImage(images[0].asset!)}
            alt={images[0]?.alt || "Post image"}
            width={225}
            height={280}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
      <h3 className="mt-4 font-medium">{name}</h3>
      <p className="mt-2">
        ${price} {currency}
      </p>
    </Link>
  );
}

export default ProductCard;
