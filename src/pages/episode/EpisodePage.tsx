import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { APIGetEpisode } from "@/api/Episode";
import { Episode } from "@/types";
import log from "@/log";
import MarkdownViewer from "@/components/publish/MarkdownViewer";
import ProfileCard from "@/components/profile";
import BackTitleBar from "@/components/BackTitleBar";
import SeriesCard from "@/components/series";
import { StorageUrl } from "@/api/Storage";
import ShortEpisodeCard from "@/components/ShortEpisodeCard";
import RoundedButton from "@/components/RoundedButton";

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

  return (
    <Container>
      <Grid container>
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8}>
          <Box position="sticky" top="0" zIndex={100}>
            <BackTitleBar>{episode.title}</BackTitleBar>
          </Box>
          <ShortEpisodeCard episode={episode} fullImage={true} />
          {location.hash !== "#comments" ? "" : <>no comments</>}
        </Grid>
        <Grid item xs={0} md={2} />
      </Grid>
    </Container>
  );
};

export default EpisodePage;
