import CodeBlock from "@/app/components/CodeBlock";
import { slugify } from "@/utils/utils";
import { urlForImage } from "@root/sanity/lib/image";
import Image from "next/image";

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        className="m-auto"
        src={urlForImage(value)}
        alt={value.alt}
        width={800}
        height={800}
      />
    ),
    code: ({ value }: any) => <CodeBlock codeblock={value} />,
    table: ({ value }: any) => {
      const headerRow = value.rows[0];
      const bodyRows = value.rows.slice(1);
      return (
        <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
          <table>
            <thead>
              <tr>
                {headerRow.cells.map((cell: string) => (
                  <th scope="col" key={cell}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row: any) => (
                <tr key={row._key}>
                  {row.cells.map((cell: string) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  block: {
    h2: ({ value }: any) => (
      <h2 id={slugify(value.children[0].text)}>{value.children[0].text}</h2>
    ),
    h3: ({ value }: any) => (
      <h3 id={slugify(value.children[0].text)}>{value.children[0].text}</h3>
    ),
    h4: ({ value }: any) => (
      <h4 id={slugify(value.children[0].text)}>{value.children[0].text}</h4>
    ),
    h5: ({ value }: any) => (
      <h5 id={slugify(value.children[0].text)}>{value.children[0].text}</h5>
    ),
    pre: ({ value }: any) => <pre>{value.children[0].text}</pre>,
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} target="_blank" rel={rel}>
          {children}
        </a>
      );
    },
    highlight: ({ children, value }: any) => {
      return <span className="highlightTextColor">{children}</span>;
    },
    alert: ({ children, value }: any) => {
      return (
        <div className="alertBlock">
          <div className="flex py-1">{children}</div>
        </div>
      );
    },
  },
};

export default myPortableTextComponents;
