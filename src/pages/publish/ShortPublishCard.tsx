import React, { useState } from "react";
import FilePutter from "@/components/FilePutter";
import { FileInfo, Profile, Series } from "@/types";
import Content from "./Content";
import ProfileSeriesSwitcher from "@/components/ProfileSeriesSwitcher";
import DefaultProfileSeriesSwitcher from "@/components/DefaultProfileSeriesSwitcher";

// type Props = {
//   onChange: (field: string, value: unknown) => void;
//   content: string;
//   files: FileInfo[];
// };

const ShortPublishCard = () => {
  const [content, setContent] = React.useState("");
  const [files, setFiles] = React.useState<FileInfo[]>([]);
  const [identity, setIdentity] = useState<Profile | Series>();
  return (
    <>
      <Content content={content} onChange={setContent} />
      <FilePutter files={files} onChange={setFiles} />
      <DefaultProfileSeriesSwitcher
        onChange={setIdentity}
        selected={identity}
      />
    </>
  );
};

export default ShortPublishCard;
