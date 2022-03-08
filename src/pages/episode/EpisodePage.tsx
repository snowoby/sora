import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIGetEpisode } from "@/api/Episode";
import { Episode } from "@/types";
import log from "@/log";
import MarkdownViewer from "@/components/publish/MarkdownViewer";
import ProfileCard from "@/components/profile";
import BackTitleBar from "@/components/BackTitleBar";
import SeriesCard from "@/components/series";
import { StorageUrl } from "@/api/Storage";

const EpisodePage = () => {
  let { id } = useParams();
  const [episode, setEpisode] = useState<Episode>();

  useEffect(() => {
    if (!id) return;
    APIGetEpisode(id)
      .then(({ data }) => setEpisode(data))
      .catch((e) => log.error(e));
  }, [id]);

  if (!episode) return <Container>Loading...</Container>;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box position="sticky" top="0">
            <BackTitleBar>{episode.title}</BackTitleBar>
          </Box>
          {episode.cover && (
            <img
              style={{ maxWidth: "100%" }}
              srcSet={StorageUrl(episode.cover, "file", "compressed")}
            />
          )}
          <Box sx={{ padding: "0.5rem" }}>
            <MarkdownViewer>{episode.content}</MarkdownViewer>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box position="sticky" top="1rem" bottom="0">
            <Typography variant="h6">Author</Typography>
            <ProfileCard profile={episode.profile} />
            {episode.series && (
              <>
                <Typography variant="h6">Series</Typography>
                <SeriesCard series={episode.series} />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EpisodePage;
