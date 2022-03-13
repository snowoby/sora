import React from "react";
import { Avatar, Typography } from "@mui/material";
import { StorageUrl } from "@/api/Storage";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Series } from "@/types";

type Props = {
  series: Series;
};

const SeriesProfileCard = ({ series }: Props) => {
  const profile = series.profile;
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
        sx={{ height: "2.5rem", width: "2.5rem" }}
        src={
          profile &&
          profile.avatar &&
          StorageUrl("avatar", profile.avatar, "compressed")
        }
      />
      <ArrowRightIcon />
      <Typography variant="subtitle1" height="fit-content">
        {series.title}
      </Typography>
    </div>
  );
};
