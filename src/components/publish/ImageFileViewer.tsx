import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FileInfo } from "@/types";
import { StorageExists, StorageUrl } from "@/api/Storage";

const ImageFileViewer = ({ file }: { file: FileInfo }) => {
  const [src, setSrc] = useState("");
  // const [errCount, setErrCount] = useState(0);
  const errCount = useRef(0);

  useEffect(() => {
    const id = setInterval(async () => {
      const ok = await StorageExists(`${file.path}/${file.id}`, "compressed");
      if (ok) {
        setSrc(StorageUrl(`${file.path}/${file.id}`, "compressed"));
        clearInterval(id);
      } else {
        errCount.current += 1;
        if (errCount.current >= 3) clearInterval(id);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Box textAlign="center">
      <Box height="6rem">
        <img
          src={src}
          alt={file.filename}
          style={{ maxWidth: "8rem", maxHeight: "6rem", display: "block" }}
        />
      </Box>
      <Box height="2rem" overflow="hidden">
        <Typography
          variant="subtitle2"
          maxWidth="100%"
          noWrap={false}
          sx={{ textOverflow: "ellipsis" }}
        >
          {file.filename}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageFileViewer;
