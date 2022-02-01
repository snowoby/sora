import React from "react";
import { ProfileCardProps } from "@/types";
import { Avatar, Typography } from "@mui/material";
import ProfileCardStyle from "./ProfileCardStyle";

export const ProfileCardLite = ({ profile }: ProfileCardProps) => {
  const styles = ProfileCardStyle();

  return (
    <div className={styles.layout}>
      <Avatar className={styles.avatarSmall} />
      <div className={styles.name}>
        <Typography variant="subtitle1" className={styles.truncate}>
          {profile.title}
        </Typography>
        <Typography variant="subtitle2" className={styles.truncate}>
          {profile.callSign}
        </Typography>
      </div>
    </div>
  );
};
