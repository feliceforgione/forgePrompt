export type SiteConfig = typeof siteConfig;

const footerShopLinks =
  process.env.NEXT_PUBLIC_ENABLESHOPPING == "true"
    ? [
        { name: "Terms & Conditions", href: "#" },
        { name: "Shipping & Return Policy", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "FAQ", href: "#" },
      ]
    : [];

export const siteConfig = {
  name: "Forge Prompt | AI Developer News",
  description:
    "A blog discussing Prompt engineering, Generative AI, and AI chatbots",
  url: "https://www.forgeprompt.ai",
  footer: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    ...footerShopLinks,
  ],
};
