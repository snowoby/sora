import React from "react";
import { Profile, Series } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";
import { StorageUrl } from "@/api/Storage";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
type Props = {
  series: Series;
  profile?: Profile;
  size?: "display";
};

const SeriesCard = ({ series, profile, size }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={[size === "display" && { height: "2rem", width: "2rem" }]}
        src={profile && StorageUrl(profile.avatar, "compressed")}
      />
      <ArrowRightIcon />
      <Typography variant="subtitle2" height="fit-content">
        {series.title}
      </Typography>
    </div>
  );
};

export default SeriesCard;
