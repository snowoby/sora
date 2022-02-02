import React from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { EpisodeCardProps, EpisodeInfo } from "@/types";

const EpisodeCard = ({ episodeInfo }: EpisodeCardProps) => {
  return (
    <>
      <Stack spacing={1}>
        <Typography variant="subtitle1">
          {episodeInfo.edges.profile.title}
        </Typography>
        <Typography variant="subtitle1">
          {episodeInfo.edges.profile.callSign}
        </Typography>
        <Typography variant="subtitle1">{episodeInfo.title}</Typography>
        <Typography variant="subtitle1">{episodeInfo.content}</Typography>
      </Stack>
    </>
  );
};

export default EpisodeCard;
