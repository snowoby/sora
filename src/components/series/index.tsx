import React from "react";
import { Profile, Series } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";
import { Profiler } from "inspector";
import { StorageUrl } from "@/api/Storage";
import log from "@/log";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
type Props = {
  series: Series;
  profile?: Profile;
};

const SeriesCard = ({ series, profile }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      {profile && <Avatar src={StorageUrl(profile.avatar, "compressed")} />}
      <ArrowRightIcon />
      <Typography variant="subtitle2" height="fit-content">
        {series.title}
      </Typography>
    </div>
  );
};

export default SeriesCard;
