import React from "react";
import {
  Avatar,
  Box,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { EpisodeCardProps, Profile, Series } from "@/types";
import { Link } from "react-router-dom";
import { StorageUrl } from "@/api/Storage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PublisherCard from "@/components/PublisherCard";

dayjs.extend(relativeTime);
const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Paper
      sx={{
        boxShadow: "0px 0px 0px",
        borderRadius: "0px",
        "&:hover": {
          backgroundColor: "action.selected",
          transition: "background-color 0.2s ease-in-out",
        },
      }}
    >
      <Stack>
        <Box mx="2rem" my="1rem">
          <Box
            display="grid"
            gridTemplateColumns="auto 1fr auto"
            alignItems="center"
          >
            <PublisherCard series={episode.series} profile={episode.profile} />
            <div />

            <Typography variant="body2" color="text.secondary">
              {dayjs(episode.create_time).fromNow()}
            </Typography>
          </Box>
        </Box>
        <Link
          to={`episode/${episode.id}`}
          style={{
            textDecoration: "none",
            marginBottom: "1rem",
          }}
        >
          {episode.cover && (
            <CardMedia
              component="img"
              sx={{ mb: "1rem", width: "100%", maxWidth: "100%" }}
              image={StorageUrl("file", episode.cover, "thumbnail")}
              alt="green iguana"
            />
          )}
          <Typography sx={{ mx: "2rem", color: "text.primary" }} variant="h6">
            {episode.title}
          </Typography>
        </Link>
      </Stack>
    </Paper>
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
      <Avatar src={StorageUrl("avatar", profile.avatar, "small")} />
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
          sx={{
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
