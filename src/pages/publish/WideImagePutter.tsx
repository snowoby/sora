import React from "react";
import { FilePush } from "@/api/FileUpload";
import { Box, Button } from "@mui/material";
import SourceImage from "@/components/Image";
import { Add } from "@mui/icons-material";
import FileUploader from "@/components/publish/FileUploader";
import { FileInfo } from "@/types";
interface Props {
  file?: FileInfo;
  onChange: (file: FileInfo) => void;
}
const WideImagePutter = (props: Props) => {
  return (
    <FileUploader
      multiple={false}
      onDrop={(files) => {
        FilePush("file", files[0]).then(({ data }) => props.onChange(data));
      }}
    >
      <Box
        height={props.file ? "18rem" : "6rem"}
        width="100%"
        display="flex"
        justifyItems="center"
        justifyContent="center"
      >
        {props.file ? (
          <SourceImage
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              overflow: "hidden",
            }}
            source={props.file.id}
          />
        ) : (
          <Button fullWidth>
            <Add />
          </Button>
        )}
      </Box>
    </FileUploader>
  );
};

export default WideImagePutter;
