import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  ImageListItem,
  ImageListItemBar,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountContext from "@/context/AccountContext";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { FileInfo, SeriesInfo } from "@/types";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import FileUploader from "@/components/publish/FileUploader";
import { FilePush } from "@/api/FileUpload";
import SourceImage from "@/components/Image";
import { Add } from "@mui/icons-material";
import MarkdownEditor from "@/components/publish/MarkdownEditor";
import Image from "@/components/Image";
import BackTitleBar from "@/components/BackTitleBar";
import { APIAllMySeries } from "@/api/Series";
import SeriesSwitcher from "@/components/SeriesSwitcher";

const PublishPage = () => {
  const { profiles } = useContext(AccountContext);
  const [seriesList, setSeriesList] = useState<SeriesInfo[]>();

  const [formData, setFormData] = useState<Record<string, any>>({
    title: "",
    content: "",
    seriesID: null,
    profileID: "",
    navPicture: "",
  });

  const handleNavPicChange = (navPic: FileInfo) => {
    setFormData({
      ...formData,
      navPicture: `${navPic.path}/${navPic.id}`,
    });
    setNavPic(navPic);
  };
  const [navPic, setNavPic] = useState<FileInfo>();
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    APIAllMySeries()
      .then(({ data }) => setSeriesList(data))
      .catch(log.error);
  }, []);

  if (!profiles || !seriesList) {
    return <div>Loading...</div>;
  }

  if (!profiles.length) {
    return <div>No profile</div>;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <BackTitleBar>publish</BackTitleBar>
          <Card sx={{ overflow: "visible" }}>
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
                                <Typography variant="body2">
                                  {file.filename}
                                </Typography>
                              }
                            />
                          </Button>
                        </ImageListItem>
                      ))}
                  </List>
                </Box>
              </Stack>
            </form>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <div />
            <div>
              <ProfileSwitcher
                profiles={profiles}
                selected={profiles.find((p) => p.id === formData.profileID)}
                onChange={(profile) =>
                  setFormData({ ...formData, profileID: profile.id })
                }
              />
            </div>
            <Divider />
            <div>
              <SeriesSwitcher
                seriesList={seriesList}
                onChange={(series) =>
                  setFormData({ ...formData, seriesID: series.id })
                }
                selected={seriesList.find((s) => s.id === formData.seriesID)}
                placeholder="not publish in a series"
              />
              {formData.seriesID && (
                <Button
                  sx={{ display: "block" }}
                  fullWidth
                  color="error"
                  onClick={() => setFormData({ ...formData, seriesID: null })}
                >
                  clear
                </Button>
              )}
            </div>
            <Divider />
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
