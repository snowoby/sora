import React, { useContext, useState, useRef, useEffect } from "react";
import { Button, Divider, Menu, MenuItem, Stack } from "@mui/material";
import AccountContext from "@/context/AccountContext";
import { Settings } from "@mui/icons-material";
import ProfileCard from "./profile";

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

  const orderedProfiles = currentProfile
    ? [
        currentProfile,
        ...(profiles?.filter((profile) => profile.id !== currentProfile?.id) ??
          []),
      ]
    : profiles;

  return (
    <>
      <div ref={anchor} />
      <Button
        sx={{
          borderRadius: "9999px",
          "&:hover": {
            backgroundColor: "#eeeeee",
          },
          padding: "0.75rem",
          color: "text.primary",
          textTransform: "none",
          justifyContent: "flex-start",
        }}
        type="button"
        onClick={() => setOpen(true)}
        fullWidth
      >
        {currentProfile && <ProfileCard profile={currentProfile} />}
      </Button>
      {anchor.current && (
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchor.current}
          PaperProps={{ style: { width: menuWidth } }}
        >
          {orderedProfiles?.map((profile) => (
            <MenuItem
              key={profile.id}
              onClick={() => {
                switchProfile(profile.id);
                setOpen(false);
              }}
            >
              <ProfileCard
                profile={profile}
                size={currentProfile?.id === profile.id ? "normal" : "lite"}
              />
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
    </>
  );
};
export default ProfileSwitcher;
