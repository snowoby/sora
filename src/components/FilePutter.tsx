import {
  Box,
  Button,
  ImageListItem,
  ImageListItemBar,
  List,
  Stack,
  Typography,
} from "@mui/material";
import FileUploader from "@/components/publish/FileUploader";
import { FilePush } from "@/api/FileUpload";
import Image from "@/components/Image";
import React from "react";
import { FileInfo } from "@/types";

interface Props {
  files: FileInfo[];
  onChange: (files: FileInfo[]) => void;
}
const FilePutter = (props: Props) => {
  const { files, onChange } = props;
  return (
    <Box display="grid" gridTemplateColumns="auto 1fr">
      <div style={{ width: "6rem", height: "6rem", margin: "0.5rem" }}>
        <FileUploader
          accept={["image/*"]}
          onDrop={async (dropFiles) => {
            for (let i = 0; i < dropFiles.length; i++) {
              const { data } = await FilePush("file", dropFiles[i]);
              onChange([...files, data]);
            }
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "6rem",
              height: "6rem",
              textAlign: "left",
            }}
          >
            Upload files here
          </Button>
        </FileUploader>
      </div>
      <List
        component={Stack}
        direction="row"
        spacing={2}
        sx={{ overflowX: "scroll" }}
      >
        {files
          .filter((file) => file.mime.startsWith("image/"))
          .map((file) => (
            <ImageListItem key={file.id}>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `![${file.filename}](image:${file.path}/${file.id} "${file.filename}")`
                  )
                }
              >
                <Image
                  style={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "cover",
                  }}
                  source={`${file.path}/${file.id}`}
                />
                <ImageListItemBar
                  subtitle={
                    <Typography variant="body2">{file.filename}</Typography>
                  }
                />
              </Button>
            </ImageListItem>
          ))}
      </List>
    </Box>
  );
};

export default FilePutter;
