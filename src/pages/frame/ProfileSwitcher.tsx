import React, { useContext, useState, useRef, useEffect } from "react";
import { Divider, Menu, MenuItem, Stack } from "@mui/material";
import AccountContext from "@/context/AccountContext";
import ProfileCard from "@/components/ProfileCard";
import { Add, Settings } from "@mui/icons-material";

const ProfileSwitcher = () => {
  const { accountInfo, currentProfile, switchProfile } =
    useContext(AccountContext);
  const profiles = accountInfo?.profiles;
  const [menuWidth, setMenuWidth] = useState("auto");
  const [open, setOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuWidth(`300px`);
    if (anchor.current) setMenuWidth(`${anchor.current.clientWidth}px`);
  }, [anchor, window.innerWidth]);

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
          PaperProps={{ style: { width: menuWidth } }}
        >
          {profiles?.map((profile) => (
            <MenuItem
              key={profile.id}
              onClick={() => {
                switchProfile(profile.id);
                setOpen(false);
              }}
              selected={profile.id === currentProfile?.id}
            >
              <ProfileCard profile={profile} size="lite" />
            </MenuItem>
          ))}
          <Divider />
          <MenuItem>
            <Stack direction="row" spacing={3}>
              <Settings />
              <div>settings</div>
            </Stack>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};
export default ProfileSwitcher;
