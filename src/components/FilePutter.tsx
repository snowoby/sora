import {
  Box,
  Button,
  CircularProgress,
  ImageListItem,
  ImageListItemBar,
  List,
  Stack,
  Typography,
} from "@mui/material";
import FileUploader from "@/components/publish/FileUploader";
import { FilePush } from "@/api/FileUpload";
// import Image from "@/components/Image";
import React, { useEffect, useRef } from "react";
import { FileInfo, FileUploadProps } from "@/types";
import { StorageUrl } from "@/api/Storage";
import PromiseFileReader from "promise-file-reader";

interface Props {
  files: FileUploadProps[];
  onChange: (f: (old: FileUploadProps[]) => FileUploadProps[]) => void;
}
const FilePutter = (props: Props) => {
  const { files, onChange } = props;
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <Box display="grid" gridTemplateColumns="auto 1fr">
      <div style={{ width: "6rem", height: "6rem", margin: "0.5rem" }}>
        <FileUploader
          accept={["image/*"]}
          onDrop={async (dropFiles) => {
            const newFiles: FileUploadProps[] = dropFiles.map((file) => {
              const fileUpload: FileUploadProps = {
                uploadingStatus: "uploading",
                fileStatus: "uploading",
                localFile: file,
              };
              return fileUpload;
            });
            for (const file of newFiles) {
              if (!file.localFile) continue;
              const dataUrl = await PromiseFileReader.readAsDataURL(
                file.localFile
              );
              file.dataUrl = dataUrl;
            }

            mounted.current && onChange((old) => [...old, ...newFiles]);
            for (const fileUpload of newFiles) {
              if (!fileUpload.localFile) continue;
              try {
                if (!mounted.current) return;
                const { data } = await FilePush(
                  "file",
                  fileUpload.localFile,
                  (status, percentage) => {
                    fileUpload.uploadingStatus = status;
                    fileUpload.progress = percentage;
                    mounted.current && onChange((old) => [...old]);
                  }
                );
                fileUpload.fileStatus = "uploaded";
                fileUpload.fileInfo = data;
                fileUpload.dataUrl = StorageUrl(
                  data.path,
                  data.id,
                  "thumbnail"
                );
              } catch (e) {
                fileUpload.fileStatus = "failed";
              }
              mounted.current && onChange((old) => [...old]);
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
          .filter((file) => file.fileStatus !== "deleted")
          .map((file, index) => (
            <ImageListItem key={index}>
              <Button
                disabled={file.fileStatus !== "uploaded"}
                onClick={() => {
                  if (!file.fileInfo) return;
                  navigator.clipboard.writeText(
                    `![${file.fileInfo.filename}](image:${file.fileInfo.id} "${file.fileInfo.filename}")`
                  );
                }}
              >
                <Box width="6rem" height="6rem">
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)!important",
                      zIndex: 10,
                    }}
                  >
                    {file.fileStatus === "uploading" && (
                      <CircularProgress
                        variant={
                          file.uploadingStatus === "uploading"
                            ? "determinate"
                            : "indeterminate"
                        }
                        value={(file.progress ?? 0) * 100}
                      />
                    )}
                  </Box>
                  {file.uploadingStatus === "uploading" && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        zIndex: 10,
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
                      filter:
                        file.fileStatus === "uploaded"
                          ? "none"
                          : "grayscale(80%)",
                      objectFit: "cover",
                      transition: "filter 0.5s",
                    }}
                    src={file.dataUrl}
                  />
                </Box>

                {file.fileStatus === "uploaded" && (
                  <ImageListItemBar
                    subtitle={
                      <Typography variant="body2">
                        {file.fileInfo?.filename}
                      </Typography>
                    }
                  />
                )}
              </Button>
            </ImageListItem>
          ))}
      </List>
    </Box>
  );
};

export default FilePutter;
