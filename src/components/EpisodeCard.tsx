import React from "react";
import { Box, Card, CardActionArea, Skeleton, Stack, Typography } from "@mui/material";
import { EpisodeCardProps, EpisodeInfo } from "@/types";
import MarkdownViewer from "@/components/publish/MarkdownViewer";
import ProfileCard from "@/components/profile";
import { Link } from "react-router-dom";

const EpisodeCard = ({ episodeInfo }: EpisodeCardProps) => {
  return (
    <Link to={`episode/${episodeInfo.id}`} style={{textDecoration:"none"}}>
      <Card >
        <CardActionArea>
          <ProfileCard profile={episodeInfo.profile} size="lite" />
          <Typography variant="h6">{episodeInfo.title}</Typography>
        </CardActionArea>
      </Card>
    </Link>

  );
};

export default EpisodeCard;
