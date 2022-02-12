import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { EpisodeCardProps } from "@/types";
import ProfileCard from "@/components/profile";
import { Link } from "react-router-dom";
import { StorageUrl } from "@/api/Storage";

const EpisodeCard = ({ episodeInfo }: EpisodeCardProps) => {
  return (
    <Link to={`episode/${episodeInfo.id}`} style={{textDecoration:"none"}}>
      <Card>
        <CardActionArea >

          {episodeInfo.navPicture&&<CardMedia
            component="img"
            height="140"
            image={StorageUrl(episodeInfo.navPicture)}
            alt="green iguana"
          />}
          <CardContent  sx={{padding:"1rem"}}>
            <ProfileCard profile={episodeInfo.profile} size="lite" />
            <Typography variant="h6">{episodeInfo.title}</Typography>
          </CardContent>

        </CardActionArea>
      </Card>
    </Link>

  );
};

export default EpisodeCard;
