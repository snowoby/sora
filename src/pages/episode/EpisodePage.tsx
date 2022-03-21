import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { APIGetEpisode } from "@/api/Episode";
import { Episode, Profile, Series } from "@/types";
import log from "@/log";
import MarkdownViewer from "@/components/publish/MarkdownViewer";
import ProfileCard from "@/components/profile";
import BackTitleBar from "@/components/BackTitleBar";
import SeriesCard from "@/components/series";
import { StorageUrl } from "@/api/Storage";
import ShortEpisodeCard from "@/components/ShortEpisodeCard";
import RoundedButton from "@/components/RoundedButton";
import TitleBarFrame from "../frame/TitleBarFrame";
import ShortPublishCard from "../publish/ShortPublishCard";
import MarkdownEditor from "@/components/publish/MarkdownEditor";
import ProfileSeriesSwitcher from "@/components/ProfileSeriesSwitcher";
import DefaultProfileSeriesSwitcher from "@/components/DefaultProfileSeriesSwitcher";

const EpisodePage = () => {
  let { id } = useParams();
  const [episode, setEpisode] = useState<Episode>();

  useEffect(() => {
    if (!id) return;
    APIGetEpisode(id)
      .then(({ data }) => setEpisode(data))
      .catch((e) => log.error(e));
  }, [id]);

  const location = useLocation();
  if (!episode) return <Container>Loading...</Container>;

  const commentArea = () => {
    return (
      <Box>
        <Divider>
          <Typography sx={{ color: "divider" }}>comments</Typography>
        </Divider>
        <Box>
          <MarkdownEditor>asdasd</MarkdownEditor>
          <Box display="grid" gridTemplateColumns="1fr auto">
            <DefaultProfileSeriesSwitcher
              onChange={function (item: Series | Profile): void {
                //TODO
              }}
            />
            <Button>Publish</Button>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <TitleBarFrame
      title={<BackTitleBar>{episode.title ?? "details"}</BackTitleBar>}
    >
      <Grid container>
        <Grid item xs />
        <Grid item xs={12} md={8}>
          <ShortEpisodeCard episode={episode} fullImage={true} />
          <Box mx="1rem">
            {location.hash !== "#comments" ? "" : commentArea()}
          </Box>
        </Grid>
        <Grid item xs />
      </Grid>
    </TitleBarFrame>
  );
};

export default EpisodePage;
