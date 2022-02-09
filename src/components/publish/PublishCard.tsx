import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  List,
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
import { Add } from "@mui/icons-material";

const PublishCard = ({ profileID, afterSubmit }: PublishCardProps) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [navPic, setNavPic] = useState<FileInfo>();
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
              FilePush("file", files[0]).then(({ data }) => setNavPic(data));
            }}
          >
            <Box
              height={navPic ? "18rem" : "6rem"}
              width="100%"
              display="flex"
              justifyItems="center"
              justifyContent="center"
            >
              {navPic ? (
                <SourceImage
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                  source={`${navPic.path}/${navPic.id}`}
                />
              ) : (
                <IconButton>
                  <Add />
                </IconButton>
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

          <Box display="grid" gridTemplateColumns="auto 1fr">
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
                  </ImageListItem>
                ))}
            </List>
          </Box>
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
