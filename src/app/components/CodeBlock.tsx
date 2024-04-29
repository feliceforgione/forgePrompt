"use client";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardCheck, Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface Props {
  codeblock: {
    code: string;
    filename: string;
    _type: string;
    language: string;
    _key: string;
  };
}

function CodeBlock({ codeblock }: Props) {
  const [copied, setCopied] = useState(false);
  const { code, language, filename } = codeblock;

  const notify = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  return (
    <div className="relative">
      <button className="absolute flex flex-row  top-1 right-0 p-2">
        <span className="text-sm mr-2">{language}</span>
        <CopyToClipboard text={code} onCopy={(copied) => notify()}>
          {copied ? <ClipboardCheck color="green" /> : <Copy />}
        </CopyToClipboard>
      </button>
      <SyntaxHighlighter
        className="pb-10"
        language={language}
        style={atomDark}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={false}
        showInlineLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
      <span className="absolute flex flex-row  bottom-1 right-0 p-2 text-sm">
        {filename}
      </span>
    </div>
  );
}

export default CodeBlock;
