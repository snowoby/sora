import React, { useContext, useState, useRef } from "react";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { ProfileSwitcherProps } from "@/types";
import AccountContext from "@/context/AccountContext";
import log from "@/log";
import ProfileCard from "@/components/ProfileCard";

const ProfileSwitcher = () => {
  const { accountInfo, currentProfile, switchProfile } =
    useContext(AccountContext);
  const profiles = accountInfo?.profiles;

  const [open, setOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div ref={anchor} />
      <button
        className="rounded-full hover:bg-gray-100 w-full p-3"
        type="button"
        onClick={() => setOpen(true)}
      >
        {currentProfile && <ProfileCard profile={currentProfile} />}
      </button>
      {anchor.current && (
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchor.current}
          PaperProps={{ className: "w-96" }}
        >
          {profiles?.map((profile) => (
            <div key={profile.id}>
              <MenuItem
                onClick={() => {
                  switchProfile(profile.id);
                  setOpen(false);
                }}
                selected={profile.id === currentProfile?.id}
              >
                <ProfileCard profile={profile} size="lite" />
              </MenuItem>
            </div>
          ))}
        </Menu>
      )}
    </div>
  );
};
export default ProfileSwitcher;
