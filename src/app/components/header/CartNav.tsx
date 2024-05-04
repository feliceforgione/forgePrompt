"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { ShoppingBag } from "lucide-react";

function CartNav() {
  const { cartCount } = useShoppingCart();
  return (
    <Link href="/cart">
      <Button size="sm" variant="ghost">
        <ShoppingBag className="h-5 w-5" />
        <span className="ml-2 text-sm font-bold">{cartCount}</span>
        <span className="sr-only">Cart</span>
      </Button>
    </Link>
  );
}

export default CartNav;
