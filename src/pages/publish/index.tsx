import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import AccountContext from "@/context/AccountContext";
import { FileInfo, Profile, Series } from "@/types";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import FileUploader from "@/components/publish/FileUploader";
import { FilePush } from "@/api/FileUpload";
import SourceImage from "@/components/Image";
import { Add } from "@mui/icons-material";
import BackTitleBar from "@/components/BackTitleBar";
import { APIAllMySeries } from "@/api/Series";
import FilePutter from "@/components/FilePutter";
import Content from "@/pages/publish/Content";
import ProfileSeriesSwitcher from "./ProfileSeriesSwitcher";

const PublishPage = () => {
  const { profiles } = useContext(AccountContext);
  const [seriesList, setSeriesList] = useState<Series[]>();
  const [formData, setFormData] = useState<Record<string, any>>({
    title: "",
    content: "",
    seriesID: null,
    profileID: "",
    cover: "",
  });

  const handleCoverChange = (cover: FileInfo) => {
    setFormData({
      ...formData,
      cover: `${cover.path}/${cover.id}`,
    });
    setCover(cover);
  };
  const [cover, setCover] = useState<FileInfo>();
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
                    FilePush("file", files[0]).then(({ data }) =>
                      handleCoverChange(data)
                    );
                  }}
                >
                  <Box
                    height={cover ? "18rem" : "6rem"}
                    width="100%"
                    display="flex"
                    justifyItems="center"
                    justifyContent="center"
                  >
                    {cover ? (
                      <SourceImage
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                        source={`${cover.path}/${cover.id}`}
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
                <Content
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />

                <FilePutter files={files} onChange={setFiles} />
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
