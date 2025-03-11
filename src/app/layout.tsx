import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { cn } from "@/utils/utils";
import { fontSans } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "./components/header/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { SiteBlob } from "./components/SiteBlob";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Forge Prompt",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/open-graph.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <SiteBlob />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </Providers>
        <Script
          defer
          src="https://umami.forgeai.dev/script.js"
          data-website-id="32b7fc12-4feb-41eb-af47-656269a1e4c5"
        ></Script>
      </body>
    </html>
  );
}
