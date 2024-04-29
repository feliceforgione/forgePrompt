import React from "react";
import { XCircle } from "lucide-react";

interface Props {
  itemType: string;
}

function NoItemFoundCard({ itemType }: Props) {
  return (
    <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
      <div>
        <XCircle className="mx-auto h-10 w-10 text-gray-500 dark:text-gray-200" />
        <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
          No {itemType} found
        </h1>
      </div>
    </div>
  );
}

export default NoItemFoundCard;
