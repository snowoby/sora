import React, { useContext } from "react";
import ProfileSeriesSwitcher from "@/components/ProfileSeriesSwitcher";
import AccountContext from "@/context/AccountContext";
import { Profile, Series } from "@/types";

type Props = {
  selected?: Series | Profile;
  onChange: (item: Series | Profile) => void;
};

const DefaultProfileSeriesSwitcher = (props: Props) => {
  const { profiles, series } = useContext(AccountContext);

  return (
    <ProfileSeriesSwitcher
      selected={props.selected}
      profileOptions={profiles ?? []}
      seriesOptions={series ?? []}
      onChange={props.onChange}
    />
  );
};

export default DefaultProfileSeriesSwitcher;
