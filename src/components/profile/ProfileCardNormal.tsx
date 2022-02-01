import React from "react";
import { ProfileCardProps } from "@/types";
import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import ProfileCardStyle from "./ProfileCardStyle";

export const ProfileCardNormal = ({ profile }: ProfileCardProps) => {
  const styles = ProfileCardStyle();

  return (
    <div className={styles.layout}>
      <Avatar className={styles.avatar} />
      <div className={styles.name}>
        <Typography variant="h6" className={styles.truncate}>
          {profile.title}
        </Typography>
        <Typography variant="subtitle2" className="truncate pl-2">
          {profile.callSign}
        </Typography>
      </div>
    </div>
  );
};
