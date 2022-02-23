import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Grid, Stack } from "@mui/material";
import EpisodeCard from "@/components/EpisodeCard";
import MainFrame from "@/pages/frame/MainFrame";
import { APIGetAllEpisode } from "@/api/Episode";
import { Episode } from "@/types";
import log from "@/log";
import { Masonry } from "@mui/lab";

const MainPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  useEffect(() => {
    APIGetAllEpisode()
      .then(({ data }) => {
        setEpisodes(data);
      })
      .catch((e) => log.error(e));
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid xs={3}></Grid>
        <Grid xs={6}>
          <Stack spacing={2}>
            {episodes && (
              <Stack>
                {episodes.map((episode) => (
                  <Box key={episode.id}>
                    <EpisodeCard episode={episode} />
                    <Divider />
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid xs={3}></Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
