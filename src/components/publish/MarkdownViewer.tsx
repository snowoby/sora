import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StorageUrl } from "@/api/Storage";
import log from "@/log";
import { Box } from "@mui/material";

const MarkdownViewer = ({
  children,
  skipImage,
}: {
  children: string;
  skipImage?: boolean;
}) => (
  <Box
    sx={[
      {
        "& img": {
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
          margin: "auto",
        },
      },
    ]}
  >
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      transformImageUri={(src, alt, title) => {
        const groups = src.match(
          /^image:([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/
        );
        let newSrc = src;
        if (groups && groups.length > 1)
          newSrc = StorageUrl(groups[1], "file", "compressed");
        if (skipImage) {
          if (src.startsWith("image:")) {
            return "";
          }
          return newSrc;
        }
        return newSrc;
      }}
    >
      {children}
    </ReactMarkdown>
  </Box>
);

export default MarkdownViewer;
