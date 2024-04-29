"use client";

import { Toaster } from "@/app/components/ui/toaster";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { CartProvider } from "use-shopping-cart";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <CartProvider
      currency="USD"
      shouldPersist
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        {children}
      </ThemeProvider>
    </CartProvider>
  );
}
