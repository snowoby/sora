import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountContext from "@/context/AccountContext";
import PublishCard from "@/components/publish/PublishCard";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { FileInfo } from "@/types";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import FileUploader from "@/components/publish/FileUploader";
import { FilePush } from "@/api/FileUpload";
import SourceImage from "@/components/Image";
import { Add } from "@mui/icons-material";
import MarkdownEditor from "@/components/publish/MarkdownEditor";
import Image from "@/components/Image";

const PublishPage = () => {
  const { currentProfile } = useContext(AccountContext);
  const [formData, setFormData] = useState({
    profileID: currentProfile?.id,
    title: "",
    content: "",
    navPicture: "",
  });

  // useEffect watch profileID change
  useEffect(() => {
    setFormData({
      ...formData,
      profileID: currentProfile?.id,
    });
  }, [currentProfile]);

  const handleNavPicChange = (navPic: FileInfo) => {
    setFormData({
      ...formData,
      navPicture: `${navPic.path}/${navPic.id}`,
    });
    setNavPic(navPic);
  };
  const [navPic, setNavPic] = useState<FileInfo>();
  const [files, setFiles] = useState<FileInfo[]>([]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Card>
            <form>
              <Stack spacing={2}>
                <FileUploader
                  multiple={false}
                  onDrop={(files) => {
                    log.info(files);
                    FilePush("file", files[0]).then(({ data }) =>
                      handleNavPicChange(data)
                    );
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
                      <Button fullWidth>
                        <Add />
                      </Button>
                    )}
                  </Box>
                </FileUploader>
                <TextField
                  variant="filled"
                  fullWidth
                  label="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <MarkdownEditor
                  multiline
                  variant="filled"
                  minRows={5}
                  fullWidth
                  label="content"
                  name="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />

                <Box display="grid" gridTemplateColumns="auto 1fr">
                  <div
                    style={{ width: "6rem", height: "6rem", margin: "0.5rem" }}
                  >
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
                              <Typography variant="body2">
                                {file.filename}
                              </Typography>
                            }
                          />
                        </ImageListItem>
                      ))}
                  </List>
                </Box>
              </Stack>
            </form>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={2}>
            <div />
            <div>
              <ProfileSwitcher />
            </div>
            <Button
              fullWidth
              type="button"
              variant="contained"
              size="large"
              onClick={() =>
                APICreateEpisode(formData)
                  .then(({ data }) => {
                    log.info(data);
                  })
                  .catch((e) => log.error(e))
              }
            >
              publish
            </Button>
            {/*<Button fullWidth type="button" variant="outlined" size="large">*/}
            {/*  save to draft*/}
            {/*</Button>*/}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PublishPage;
