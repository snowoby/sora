import React from "react";
import { ProfileCardProps } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";

const styleConfig = {
  normal: {
    avatarSize: { height: "4rem", width: "4rem" },
    titleSize: "h6",
  },
  lite: {
    avatarSize: { height: "3rem", width: "3rem" },
    titleSize: "subtitle1",
  },
};

const ProfileCard = ({ profile, size }: ProfileCardProps) => {
  if (!size) size = "normal";
  const config = styleConfig[size];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        textAlign: "left",
        gap: "0.75rem",
      }}
    >
      <Avatar sx={config.avatarSize} />
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
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {profile.callSign}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileCard;
