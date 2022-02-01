import React from "react";
import { ProfileCardProps } from "@/types";
import { ProfileCardLite } from "./ProfileCardLite";
import { ProfileCardNormal } from "./ProfileCardNormal";

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
