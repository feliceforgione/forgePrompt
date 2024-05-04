import { Edit } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import CartNav from "./CartNav";
import { MainNav } from "./MainNav";
import SearchInput from "./SearchInput";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <Suspense>
          <SearchInput />
        </Suspense>

        <div className="flex items-center space-x-1">
          {process.env.NEXT_PUBLIC_ENABLESHOPPING == "true" && <CartNav />}
          <ThemeToggle />
          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <Button size="sm" variant="ghost">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
