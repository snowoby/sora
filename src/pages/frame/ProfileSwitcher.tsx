import React, { useContext, useState } from "react";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { ProfileSwitcherProps } from "@/types";
import AccountContext from "@/context/AccountContext";

const ProfileSwitcher = () => {
  const { accountInfo, switchProfile, currentProfile } =
    useContext(AccountContext);
  const profiles = accountInfo?.profiles;

  const [open, setOpen] = useState<boolean>(true);

  return (
    <div>
      <div className="rounded-full border-2 flex items-center">
        <Avatar />
        <Typography variant="h6" className="truncate pl-2">
          {currentProfile?.title}
        </Typography>
      </div>
      <Menu open={open} onClose={(_) => setOpen(false)}>
        {profiles?.map((profile) => (
          <MenuItem key={profile.id}>
            <Avatar /> {profile.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default ProfileSwitcher;
