import React, { useEffect, useState } from "react";
import { FileUploadProps } from "@/types";
import { Box, BoxProps, CircularProgress } from "@mui/material";
import PromiseFileReader from "promise-file-reader";

type Props = {
  file: FileUploadProps;
  percentagePosition?: "center" | "left";
} & BoxProps;

// const useImageUpload = (file: File | Blob) => {
//   const [percentage, setPercentage] = useState(0);
//   const [uploadingStatus, setUploadingStatus] = useState("uploading");
//   const [fileStatus, setFileStatus] = useState("uploading");
//   const [dataUrl, setDataUrl] = useState<string | null>(null);
//   const [localFile, setLocalFile] = useState<File | Blob>(file);
//   const [controller, setController] = useState<AbortController>(
//     new AbortController()
//   );

//   useEffect(() => {
//     if (!file) return;
//     if (file.type.startsWith("image/")) {
//       PromiseFileReader.readAsDataURL(file).then((data) => setDataUrl(data));
//     }
//   }, []);
// };

const UploadImage = ({ file, percentagePosition, ...boxProps }: Props) => {
  return (
    <Box {...boxProps}>
      {file.fileStatus === "uploading" && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)!important",
            zIndex: 10,
            height: 40, //but why?
          }}
        >
          <CircularProgress
            variant={
              file.uploadingStatus === "uploading"
                ? "determinate"
                : "indeterminate"
            }
            value={(file.progress ?? 0) * 100}
          />
        </Box>
      )}

      {file.uploadingStatus === "uploading" && (
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: percentagePosition === "center" ? "50%" : "0.4rem",
            transform:
              percentagePosition === "center"
                ? "translate(-50%, 0)!important"
                : "none",
            zIndex: 10,
            fontSize: "0.8rem",
            color: "white!important",
          }}
        >
          {Math.floor((file.progress ?? 0) * 100)}%
        </Box>
      )}

      <img
        style={{
          width: "100%",
          height: "100%",
          filter: file.fileStatus === "uploaded" ? "none" : "grayscale(80%)",
          objectFit: "cover",
          transition: "filter 0.5s",
        }}
        src={file.dataUrl}
      />
    </Box>
  );
};

export default UploadImage;
