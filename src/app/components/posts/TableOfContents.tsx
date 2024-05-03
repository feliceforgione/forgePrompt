import { slugify } from "@/utils/utils";
import React from "react";

interface Props {
  headings: Array<string | HTMLHeadElement>;
}

function TableOfContents({ headings }: Props) {
  return (
    <div className="max-w-96 mt-8 border rounded-sm">
      <h2 className=" text-center text-lg font-bold p-2 m-0 border-b">
        Table of Contents
      </h2>
      <nav className="p-4 text-left">
        <ul>
          {headings.map((heading: any) => {
            const headingText = heading.children[0].text;
            return (
              <li key={heading?._key} className="py-2">
                <a
                  href={`#${slugify(headingText)}`}
                  className="hover:underline"
                >
                  {headingText}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default TableOfContents;
