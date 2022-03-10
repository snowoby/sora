import React, { useContext } from "react";
import ProfileSeriesSwitcher from "@/components/ProfileSeriesSwitcher";
import AccountContext from "@/context/AccountContext";
import { Profile, Series } from "@/types";

type Props = {
  selected?: Series | Profile;
  onChange: (item: Series | Profile) => void;
  placeholder?: React.ReactNode;
};

const DefaultProfileSeriesSwitcher = (props: Props) => {
  const { profiles, series } = useContext(AccountContext);

  return (
    <ProfileSeriesSwitcher
      selected={props.selected ?? profiles?.[0]}
      profileOptions={profiles ?? []}
      seriesOptions={series ?? []}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};

export default DefaultProfileSeriesSwitcher;
