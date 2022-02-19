import React from "react";
import ProfileCard from "./profile";
import { Profile, ProfileSwitcherProps } from "@/types";
import FrameSwitcher from "@/components/FrameSwitcher";

const ProfileSwitcher = ({
  profiles,
  selected,
  onChange,
  disabled,
  children,
}: ProfileSwitcherProps) => {
  return (
    <FrameSwitcher<Profile>
      options={profiles}
      disabled={disabled}
      onChange={onChange}
      selected={selected}
      placeholder={children}
      renderButton={(profile) => <ProfileCard profile={profile} />}
      renderKey={(profile) => profile.id}
      renderSelected={(profile) => (
        <ProfileCard profile={profile} size="normal" />
      )}
      renderUnselected={(profile) => (
        <ProfileCard profile={profile} size="lite" />
      )}
    />
  );
};
export default ProfileSwitcher;
