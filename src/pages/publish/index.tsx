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
  ListSubheader,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountContext from "@/context/AccountContext";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { FileInfo, Profile, Series } from "@/types";
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
import FrameSwitcher from "@/components/FrameSwitcher";
import SeriesCard from "@/components/series";
import ProfileCard from "@/components/profile";

const PublishPage = () => {
  const { profiles } = useContext(AccountContext);
  const [seriesList, setSeriesList] = useState<Series[]>();

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
            <ProfileSeriesSwitcher
              onChange={(item) => {
                if (item.valueType === "series") {
                  const series = item as Series;
                  setFormData({
                    ...formData,
                    seriesID: series.id,
                    profileID: series.profile.id,
                  });
                } else {
                  const profile = item as Profile;
                  setFormData({
                    ...formData,
                    profileID: profile.id,
                    seriesID: null,
                  });
                }
              }}
              profileOptions={profiles ?? []}
              seriesOptions={seriesList ?? []}
              selected={
                formData.seriesID
                  ? seriesList.find((series) => series.id === formData.seriesID)
                  : profiles.find(
                      (profile) => profile.id === formData.profileID
                    )
              }
            />
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

type GroupLabel = { valueType: "group"; children: React.ReactNode };

type ProfileSeriesSwitcherProps = {
  profileOptions: Profile[];
  seriesOptions: Series[];
  selected?: Profile | Series;
  onChange: (selected: Profile | Series) => void;
  placeholder?: string;
};

const ProfileSeriesSwitcher = ({
  profileOptions,
  seriesOptions,
  selected,
  onChange,
  placeholder,
}: ProfileSeriesSwitcherProps) => {
  return (
    <FrameSwitcher<Series | Profile | GroupLabel>
      selected={selected}
      options={[
        {
          valueType: "group",
          children: <Divider />,
        },
        ...profileOptions,
        {
          valueType: "group",
          children: <Divider />,
        },
        ...seriesOptions,
      ]}
      placeholder={placeholder}
      renderButton={(item) => (
        <>
          {item.valueType === "profile" ? (
            <ProfileCard profile={item as Profile} size="normal" />
          ) : (
            <SeriesCard series={item as Series} />
          )}
        </>
      )}
      renderSelected={(selected) => {
        switch (selected.valueType) {
          case "profile":
            return <ProfileCard profile={selected as Profile} size="normal" />;
          case "series":
            return <SeriesCard series={selected as Series} />;
          default:
            return null;
        }
      }}
      renderUnselectedMenuItem={(unselected, callAfterClick) => {
        if (unselected.valueType === "group")
          return (
            <ListSubheader sx={{ backgroundColor: "text.disabled" }}>
              {(unselected as GroupLabel).children}
            </ListSubheader>
          );
        let inner;
        switch (unselected.valueType) {
          case "profile":
            inner = <ProfileCard profile={unselected as Profile} size="lite" />;
            break;
          case "series":
            inner = <SeriesCard series={unselected as Series} />;
            break;
          default:
            inner = null;
        }
        return (
          <MenuItem
            onClick={() => {
              onChange(unselected as Profile | Series);
              callAfterClick();
            }}
          >
            {inner}
          </MenuItem>
        );
      }}
    />
  );
};
