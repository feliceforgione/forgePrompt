"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { Product as CartProduct } from "use-shopping-cart/core";

import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import { Product } from "@root/sanity.types";
import { PortableText } from "@portabletext/react";
import getPortableTextComponents from "@/app/hooks/getPortableTextComponents";
import { urlForImage } from "@root/sanity/lib/image";

interface Props {
  product: Product;
}

export function ProductInfo({ product }: Props) {
  const { name, currency, sku, price, description, _id, images, slug } =
    product;
  const { addItem, cartDetails, incrementItem } = useShoppingCart();
  const { toast } = useToast();

  const myPortableTextComponents = getPortableTextComponents;

  const cartItem: CartProduct = {
    id: _id,
    name: name!,
    currency: currency!,
    price: price!,
    quantity: 1,
    image: urlForImage(images![0].asset!),
    slug,

    product_data: {
      metadata: { sku },
    },
    price_data: {},
  };
  function addToCart() {
    const isInCart = !!cartDetails?.[_id];

    isInCart ? incrementItem(_id) : addItem(cartItem);
    toast({
      title: `${name}`,
      description: "Product added to cart",
      action: (
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Open Cart</span> <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      ),
    });
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: price!,
            currency: currency!,
          })}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base productDescription">
          <PortableText
            value={description!}
            components={myPortableTextComponents as any}
          />
        </div>
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            onClick={addToCart}
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
}
