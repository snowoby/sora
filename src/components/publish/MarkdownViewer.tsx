import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownViewer = ({ children }: { children: string }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
);

export default MarkdownViewer;
