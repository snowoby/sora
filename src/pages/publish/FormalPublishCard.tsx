import React from "react";
import { Stack, TextField } from "@mui/material";
import Content from "@/pages/publish/Content";
import FilePutter from "@/components/FilePutter";
import WideImagePutter from "@/pages/publish/WideImagePutter";
import { FileInfo, FileUploadProps } from "@/types";

interface Props {
  cover?: FileInfo;
  title: string;
  content: string;
  files: FileUploadProps[];
  onChange: (key: string, value: unknown) => void;
}
const FormalPublishCard = (props: Props) => {
  const { cover, title, content, files, onChange } = props;

  const handleChange = (key: string) => (content: unknown) => {
    onChange(key, content);
  };

  return (
    <>
      <Stack spacing={2}>
        <WideImagePutter onChange={handleChange("cover")} file={cover} />
        <TextField
          variant="filled"
          fullWidth
          label="title"
          name="title"
          value={title}
          onChange={(e) => handleChange("title")(e.target.value)}
        />
        <Content content={content} onChange={handleChange("content")} />
        <FilePutter files={files} onChange={handleChange("files")} />
      </Stack>
    </>
  );
};

export default FormalPublishCard;
