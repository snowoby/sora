import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import EpisodeCard from "@/components/EpisodeCard";
import MainFrame from "@/pages/frame/MainFrame";
import { APIGetAllEpisode } from "@/api/Episode";
import { EpisodeInfo } from "@/types";
import log from "@/log";
import { Masonry } from "@mui/lab";

const MainPage = () => {
  const [episodes, setEpisodes] = useState<EpisodeInfo[]>();
  useEffect(() => {
    APIGetAllEpisode()
      .then(({ data }) => {
        setEpisodes(data);
      })
      .catch((e) => log.error(e));
  }, []);

  return (
    <MainFrame>
      <Stack spacing={2}>
        {episodes && (
          <Masonry columns={2} spacing={1}>
            {episodes.map((episode) => (
              <Box key={episode.id}>
                <EpisodeCard episodeInfo={episode} />
              </Box>
            ))}
          </Masonry>
        )}
      </Stack>
    </MainFrame>
  );
};

export default MainPage;
