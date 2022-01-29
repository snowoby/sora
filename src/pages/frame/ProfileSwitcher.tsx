import React, {useState} from "react";
import {Avatar, Menu, MenuItem} from "@mui/material";
import {ProfileSwitcherProps} from "@/types";

const ProfileSwitcher = ({profiles}:ProfileSwitcherProps) => {

  const [open, setOpen] = useState<boolean>(false)

  return <div>
    <Menu open={open} onClose={_=>setOpen(false)}>
      {profiles?.map(profile=><MenuItem key={profile.id}>
        <Avatar /> {profile.title}
      </MenuItem>)}
    </Menu>
  </div>
}
export default ProfileSwitcher