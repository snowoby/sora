import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import EpisodeCard from "@/components/EpisodeCard";
import MainFrame from "@/pages/frame/MainFrame";
import { APIGetAllEpisode } from "@/api/Episode";
import { EpisodeInfo } from "@/types";
import log from "@/log";

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
        {episodes?.map((episode) => (
          <EpisodeCard key={episode.id} episodeInfo={episode} />
        ))}
      </Stack>
    </MainFrame>
  );
};

export default MainPage;
