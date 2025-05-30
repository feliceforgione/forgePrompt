"use client";
import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@root/sanity/lib/image";

import { shimmer, toBase64 } from "@/lib/image";
import { Product } from "@root/sanity.types";

interface Props {
  product: Product;
}

export function ProductGallery({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <ul className="grid grid-cols-4 gap-6">
          {product.images &&
            product.images.map((image, index) => (
              <div
                key={image._key as string}
                onClick={() => setSelectedImage(index)}
                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50"
              >
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <Image
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(200, 200)
                    )}`}
                    src={urlForImage(image!.asset!)}
                    width={200}
                    height={200}
                    alt={image.alt || "Product image"}
                    className="h-full w-full object-cover object-center"
                  />
                </span>
                {index === selectedImage && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-md ring-4 ring-indigo-500 ring-offset-2"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
        </ul>
      </div>
      {/* Main Image */}
      <div className="aspect-h-1 aspect-w-1 w-full">
        {product.images && product.images.length > 0 && (
          <Image
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(600, 750)
            )}`}
            src={urlForImage(product.images[selectedImage].asset!)}
            alt={`Main ${product.name} image`}
            width={600}
            height={750}
            className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
