import React from "react";
import { Box, CardMedia, Paper, Stack, Typography } from "@mui/material";
import { EpisodeCardProps, Profile } from "@/types";
import { Link } from "react-router-dom";
import { StorageUrl } from "@/api/Storage";
import SeriesCard from "@/components/series";
import AvatarWrap from "@/components/AvatarWrap";

const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Link to={`episode/${episode.id}`} style={{ textDecoration: "none" }}>
      <Paper
        sx={{
          boxShadow: "0px 0px 0px",
          borderTopLeftRadius: "1rem",
          p: "1rem",
        }}
      >
        <Stack spacing={2}>
          <Box>
            {episode.series ? (
              <SeriesCard series={episode.series} size="display" />
            ) : (
              <ProfileCard profile={episode.profile} />
            )}
          </Box>
          {episode.cover && (
            <CardMedia
              component="img"
              sx={{ maxHeight: "1000px" }}
              image={StorageUrl(episode.cover)}
              alt="green iguana"
            />
          )}
          <Typography variant="h6">{episode.title}</Typography>
        </Stack>
      </Paper>
    </Link>
  );
};

const ProfileCard = ({ profile }: { profile: Profile }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        textAlign: "left",
        gap: "0.75rem",
      }}
    >
      <AvatarWrap
        sx={{ width: "3rem", height: "3rem" }}
        source={profile.avatar}
      />
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            fontWeight: "400",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {profile.title}
        </Typography>
      </Box>
    </Box>
  );
};
export default EpisodeCard;
