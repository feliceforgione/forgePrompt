"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultSearchQuery = searchParams.get("search") ?? "";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search");
    router.replace(`/?search=${searchQuery}`);
  }
  return (
    <form className="hidden items-center lg:inline-flex" onSubmit={onSubmit}>
      <Input
        id="search"
        name="search"
        type="search"
        autoComplete="off"
        placeholder="Search..."
        className="h-9 lg:w-[300px]"
        defaultValue={defaultSearchQuery}
      />
    </form>
  );
}

export default SearchInput;
