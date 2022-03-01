import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import EpisodeCard from "@/components/EpisodeCard";
import MainFrame from "@/pages/frame/MainFrame";
import { APIGetAllEpisode } from "@/api/Episode";
import { Episode } from "@/types";
import log from "@/log";
import { Masonry } from "@mui/lab";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import UniversalContext from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";

const WrappedButton = (props: ButtonProps) => {
  return (
    <Button
      fullWidth
      sx={{
        borderRadius: "9999px",
        "&:hover": {
          backgroundColor: "action.hover",
        },
        padding: "0.75rem",
        color: "text.primary",
        textTransform: "none",
        justifyContent: "flex-start",
      }}
      size="large"
      {...props}
    />
  );
};

const MainPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const { profiles } = useContext(AccountContext);
  useEffect(() => {
    APIGetAllEpisode()
      .then(({ data }) => {
        setEpisodes(data);
      })
      .catch((e) => log.error(e));
  }, []);

  const { siteName } = useContext(UniversalContext);

  const router = [
    { name: "home", icon: <HomeOutlinedIcon />, link: "/" },
    { name: "account", icon: <AccountCircleOutlinedIcon />, link: "/account" },
    {
      name: "series",
      icon: <LibraryBooksOutlinedIcon />,
      link: "/series",
      disabled: !profiles?.length,
    },
    {
      name: "publish",
      icon: <DriveFileRenameOutlineOutlinedIcon />,
      link: "/publish",
      disabled: !profiles?.length,
    },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <Stack
            spacing={2}
            sx={{
              borderLeftColor: "divider",
              borderLeftStyle: "solid",
              borderLeftWidth: "1px",
              borderRightColor: "divider",
              borderRightStyle: "solid",
              borderRightWidth: "1px",
            }}
          >
            {episodes && (
              <Stack>
                {episodes.map((episode) => (
                  <Box key={episode.id}>
                    <EpisodeCard episode={episode} />
                    <Divider />
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack className="sticky top-0" spacing={0}>
            <Typography variant="h6" sx={{ m: "0.75rem", userSelect: "none" }}>
              {siteName}
            </Typography>
            {router.map((route, index) => (
              <Link to={route.link} key={index} hidden={route.disabled}>
                <WrappedButton>
                  <Box display="flex" gap="0.75rem">
                    {route.icon} {route.name}
                  </Box>
                </WrappedButton>
              </Link>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
