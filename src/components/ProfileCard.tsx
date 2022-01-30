import React from "react";
import { Avatar, Typography } from "@mui/material";
import { ProfileCardProps } from "@/types";

const ProfileCard = ({ profile, size }: ProfileCardProps) => {
  if (!size) size = "normal";

  switch (size) {
    case "lite":
      return <ProfileCardLite profile={profile} />;
    case "normal":
      return <ProfileCardNormal profile={profile} />;
  }
};

export default ProfileCard;

export const ProfileCardNormal = ({ profile }: ProfileCardProps) => {
  return (
    <div className="grid text-left" style={{ gridTemplateColumns: "auto 1fr" }}>
      <Avatar sx={{ height: "64px", width: "64px" }} />
      <div className="w-full overflow-hidden pr-3 flex flex-col justify-center">
        <Typography variant="h6" className="truncate pl-2">
          {profile.title}
        </Typography>
        <Typography variant="subtitle2" className="truncate pl-2">
          {profile.callSign}
        </Typography>
      </div>
    </div>
  );
};

export const ProfileCardLite = ({ profile }: ProfileCardProps) => {
  return (
    <div
      className="grid text-left w-full items-center"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <Avatar sx={{ height: "48px", width: "48px" }} />
      <div className="w-full overflow-hidden px-3">
        <Typography variant="subtitle1" className="truncate pl-2">
          {profile.title}
        </Typography>
        <Typography variant="subtitle2" className="truncate pl-2">
          {profile.callSign}
        </Typography>
      </div>
    </div>
  );
};
