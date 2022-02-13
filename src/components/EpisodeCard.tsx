import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { EpisodeCardProps } from "@/types";
import ProfileCard from "@/components/profile";
import { Link } from "react-router-dom";
import { StorageUrl } from "@/api/Storage";

const EpisodeCard = ({ episodeInfo }: EpisodeCardProps) => {
  return (
    <Link to={`episode/${episodeInfo.id}`} style={{ textDecoration: "none" }}>
      <Paper>
        {episodeInfo.navPicture && (
          <CardMedia
            component="img"
            height="140"
            image={StorageUrl(episodeInfo.navPicture)}
            alt="green iguana"
          />
        )}
        <Box sx={{ padding: "0.5rem" }}>
          <ProfileCard profile={episodeInfo.profile} size="display" />
          <Typography variant="subtitle1">{episodeInfo.title}</Typography>
        </Box>
      </Paper>
    </Link>
  );
};

export default EpisodeCard;
