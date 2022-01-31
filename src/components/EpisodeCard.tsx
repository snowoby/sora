import React from "react";
import { Skeleton, Stack } from "@mui/material";

const EpisodeCard = () => {
  return (
    <>
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" height={118} />
      </Stack>
    </>
  );
};

export default EpisodeCard;
