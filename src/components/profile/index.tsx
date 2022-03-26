import React from "react";
import { ProfileCardProps } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";
import { StorageUrl } from "@/api/Storage";

const styleConfig = {
  normal: {
    avatarSize: { height: "4rem", width: "4rem" },
    titleSize: "h6",
    call: true,
  },
  lite: {
    avatarSize: { height: "3rem", width: "3rem" },
    titleSize: "subtitle1",
    call: true,
  },
  display: {
    avatarSize: { height: "2rem", width: "2rem" },
    titleSize: "subtitle2",
    call: false,
  },
  avatar: {
    avatarSize: { height: "2rem", width: "2rem" },
    titleSize: "subtitle2",
    call: false,
  },
};

const ProfileCard = ({ profile, size }: ProfileCardProps) => {
  if (!size) size = "normal";
  const config = styleConfig[size];

  if (size === "avatar")
    return (
      <Avatar
        sx={{ width: "100%", height: "100%" }}
        src={StorageUrl("avatar", profile.avatar, "small")}
      />
    );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        textAlign: "left",
        gap: "0.75rem",
      }}
    >
      <Avatar
        sx={config.avatarSize}
        src={StorageUrl("avatar", profile.avatar, "small")}
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
          variant={config.titleSize as any}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {profile.title}
        </Typography>
        {config.call && (
          <Typography
            variant="subtitle2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {profile.call}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProfileCard;
