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
import AvatarWrap from "@/components/AvatarWrap";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
            {episode.series ? (
              <SeriesCard series={episode.series} />
            ) : (
              <ProfileCard profile={episode.profile} />
            )}
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
              sx={{ maxHeight: "1000px", mb: "1rem" }}
              image={StorageUrl(episode.cover, "compressed")}
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
      <AvatarWrap
        sx={{ width: "2.5rem", height: "2.5rem" }}
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

type SeriesCardProps = {
  series: Series;
};

const SeriesCard = ({ series }: SeriesCardProps) => {
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
          profile && profile.avatar && StorageUrl(profile.avatar, "compressed")
        }
      />
      <ArrowRightIcon />
      <Typography variant="subtitle1" height="fit-content">
        {series.title}
      </Typography>
    </div>
  );
};
export default EpisodeCard;
