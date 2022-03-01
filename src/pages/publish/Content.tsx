import React from "react";
import MarkdownEditor from "@/components/publish/MarkdownEditor";

type Props = {
  content: string;
  onChange: (content: string) => void;
};

const Content = (props: Props) => {
  return (
    <MarkdownEditor
      multiline
      variant="filled"
      minRows={5}
      fullWidth
      label="content"
      name="content"
      value={props.content}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};
export default Content;
