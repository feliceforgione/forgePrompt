"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const sortOptions = [
  { name: "Newest", value: "date=desc" },
  { name: "Oldest", value: "date=asc" },
  { name: "Alphabetically", value: "title=asc" },
];

export function PostSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setOption = (option: string) => {
    const params = new URLSearchParams(searchParams);
    const [key, value] = option.split("=");
    params.delete("date");
    params.delete("title");
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center">
      <Select onValueChange={setOption}>
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
