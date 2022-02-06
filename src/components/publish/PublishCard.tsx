import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Icon,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import { FileInfo, PublishCardProps } from "@/types";
import { FilePush } from "@/api/FileUpload";
import MarkdownEditor from "./MarkdownEditor";
import SourceImage from "../Image";
import FileUploader from "@/components/publish/FileUploader";
import Image from "../Image";

const PublishCard = ({ profileID, afterSubmit }: PublishCardProps) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [headPic, setHeadPic] = useState<FileInfo>();
  const [files, setFiles] = useState<FileInfo[]>([]);

  return (
    <Card>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          APICreateEpisode(form)
            .then(({ data }) => {
              afterSubmit?.(data);
              log.info(e);
            })
            .catch((e) => log.error(e));
        }}
      >
        <Stack spacing={2}>
          <FileUploader
            multiple={false}
            onDrop={(files) => {
              log.info(files);
              FilePush("file", files[0]).then(({ data }) => setHeadPic(data));
            }}
          >
            <Box height="18rem" width="100%">
              {headPic && (
                <SourceImage
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                  source={`${headPic.path}/${headPic.id}`}
                />
              )}
            </Box>
          </FileUploader>
          <TextField
            variant="filled"
            fullWidth
            label="title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <MarkdownEditor
            multiline
            variant="filled"
            minRows={5}
            fullWidth
            label="content"
            name="content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <Stack direction="row" flexWrap="wrap">
            <div style={{ width: "6rem", height: "6rem", margin: "0.5rem" }}>
              <FileUploader
                accept={["image/*"]}
                onDrop={async (files) => {
                  for (let i = 0; i < files.length; i++) {
                    const { data } = await FilePush("file", files[i]);
                    log.info(data);
                    setFiles((prevFiles) => [...prevFiles, data]);
                  }
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "6rem", height: "6rem", textAlign: "left" }}
                >
                  Upload files here
                </Button>
              </FileUploader>
            </div>
            {files
              .filter((file) => file.mime.startsWith("image/"))
              .map((file) => (
                <Box
                  width="6rem"
                  height="6rem"
                  display="block"
                  position="relative"
                  margin="0.5rem"
                  key={file.id}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    source={`${file.path}/${file.id}`}
                  />

                  <Box
                    position="absolute"
                    bottom="0"
                    maxWidth="100%"
                    sx={{
                      wordBreak: "break-all",
                      lineClamp: "4",
                      overflow: "hidden",
                      boxOrient: "vertical",
                      display: "webkit-box",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="0.75rem"
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {file.filename}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};

export default PublishCard;

// const ImagePreview = ({
//   source,
//   filename,
// }: {
//   source: string;
//   filename: string;
// }) => {
//   return (
//
//   );
// };
