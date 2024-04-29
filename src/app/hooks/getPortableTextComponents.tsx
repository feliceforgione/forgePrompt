import CodeBlock from "@/app/components/CodeBlock";
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
  },
};

export default myPortableTextComponents;
