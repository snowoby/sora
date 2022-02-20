import React from "react";
import { Box, CardMedia, Paper, Typography } from "@mui/material";
import { EpisodeCardProps } from "@/types";
import ProfileCard from "@/components/profile";
import { Link } from "react-router-dom";
import { StorageUrl } from "@/api/Storage";

const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Link to={`episode/${episode.id}`} style={{ textDecoration: "none" }}>
      <Paper>
        {episode.series?.title}
        {episode.navPicture && (
          <CardMedia
            component="img"
            height="140"
            image={StorageUrl(episode.navPicture)}
            alt="green iguana"
          />
        )}
        <Box sx={{ padding: "0.5rem" }}>
          <ProfileCard profile={episode.profile} size="display" />
          <Typography variant="subtitle1">{episode.title}</Typography>
        </Box>
      </Paper>
    </Link>
  );
};

export default EpisodeCard;
