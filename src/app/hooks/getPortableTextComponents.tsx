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
