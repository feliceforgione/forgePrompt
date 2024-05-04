import { XCircle } from "lucide-react";
import React from "react";

function StoreClosed() {
  return (
    <div className="max-w-6xl mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 my-10 py-10 text-center dark:bg-gray-900">
      <div>
        <XCircle className="mx-auto h-10 w-10 text-gray-500 dark:text-gray-200" />
        <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
          Purchasing is currently not available
        </h1>
      </div>
    </div>
  );
}

export default StoreClosed;
