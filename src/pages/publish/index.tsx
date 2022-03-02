import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Divider, Grid, Stack } from "@mui/material";
import AccountContext from "@/context/AccountContext";
import { FileInfo, Profile, Series } from "@/types";
import { APICreateEpisode } from "@/api/Episode";
import log from "@/log";
import BackTitleBar from "@/components/BackTitleBar";
import { APIAllMySeries } from "@/api/Series";
import ProfileSeriesSwitcher from "./ProfileSeriesSwitcher";
import FormalPublishCard from "@/pages/publish/FormalPublishCard";

const PublishPage = () => {
  const { profiles } = useContext(AccountContext);
  const [seriesList, setSeriesList] = useState<Series[]>();
  const [cover, setCover] = useState<FileInfo>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileInfo[]>([]);

  const handleTitleChange = (field: string, value: unknown) => {
    log.info(value);
    switch (field) {
      case "title":
        setTitle(value as string);
        break;
      case "content":
        setContent(value as string);
        break;
      case "cover":
        setCover(value as FileInfo);
        break;
      case "files":
        setFiles(value as FileInfo[]);
        break;
    }
  };

  const [series, setSeries] = useState<Series | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const submit = () => {
    APICreateEpisode({
      cover: cover?.id,
      content,
      title,
      files: files.map((file) => ({
        id: file.id,
        nsfw: false,
        mime: file.mime,
      })),
      seriesId: series?.id,
      profileId: profile?.id,
    })
      .then(({ data }) => {
        log.info(data);
      })
      .catch((e) => log.error(e));
  };

  useEffect(() => {
    APIAllMySeries()
      .then(({ data }) => setSeriesList(data))
      .catch(log.info);
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
              <FormalPublishCard
                cover={cover}
                title={title}
                content={content}
                files={files}
                onChange={handleTitleChange}
              />
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
                  setSeries(series);
                  setProfile(series.profile);
                } else {
                  const profile = item as Profile;
                  setSeries(null);
                  setProfile(profile);
                }
              }}
              profileOptions={profiles ?? []}
              seriesOptions={seriesList ?? []}
              selected={
                series
                  ? seriesList.find((item) => series?.id === item.id)
                  : profiles.find((item) => profile?.id === item.id)
              }
            />
            <Divider />
            <Button
              fullWidth
              type="button"
              variant="contained"
              size="large"
              onClick={submit}
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
