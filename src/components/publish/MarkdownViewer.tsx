import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StorageUrl } from "@/api/Storage";
import log from "@/log";
import { Box } from "@mui/material";

const MarkdownViewer = ({ children }: { children: string }) => (
  <Box sx={[
    {
      "& img": {
        maxWidth: "100%",
        maxHeight: "100%",
        display: "block",
        margin: "auto"
      }
    }
  ]} >
    <ReactMarkdown remarkPlugins={[remarkGfm]} transformImageUri={(src, alt, title)=>{
      const groups = src.match(/^image:(.*?\/.*?)$/)
      log.info(groups, src, alt, title)
      if (groups && groups.length > 1)
        src = StorageUrl(groups[1],"compressed")
      return src
    }}
    >{children}</ReactMarkdown>
  </Box>

);

export default MarkdownViewer;
