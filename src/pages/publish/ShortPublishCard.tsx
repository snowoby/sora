import React from "react";
import MarkdownEditor from "@/components/publish/MarkdownEditor";
import FilePutter from "@/components/FilePutter";
import { FileInfo } from "@/types";
import Content from "./Content";

// type Props = {
//   onChange: (field: string, value: unknown) => void;
//   content: string;
//   files: FileInfo[];
// };

const ShortPublishCard = () => {
  const [content, setContent] = React.useState("");
  const [files, setFiles] = React.useState<FileInfo[]>([]);
  return (
    <>
      <Content content={content} onChange={setContent} />
      <FilePutter files={files} onChange={setFiles} />;
    </>
  );
};

export default ShortPublishCard;
