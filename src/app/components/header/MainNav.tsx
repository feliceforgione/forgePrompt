import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { Icons } from "@/app/components/icons";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {/* <Icons.logo className="h-7 w-7" /> */}

        <span className="inline-block text-xl font-bold">Forge Prompt</span>
      </Link>
    </div>
  );
}
