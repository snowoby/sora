import React from "react";
import { Profile, Series } from "@/types";
import FrameSwitcher from "@/components/FrameSwitcher";
import { Divider, ListSubheader, MenuItem } from "@mui/material";
import ProfileCard from "@/components/profile";
import SeriesCard from "@/components/series";

type GroupLabel = { valueType: "group"; children: React.ReactNode };

type ProfileSeriesSwitcherProps = {
  profileOptions: Profile[];
  seriesOptions: Series[];
  selected?: Profile | Series;
  onChange: (selected: Profile | Series) => void;
  placeholder?: React.ReactNode;
};

const ProfileSeriesSwitcher = ({
  profileOptions,
  seriesOptions,
  selected,
  onChange,
  placeholder,
}: ProfileSeriesSwitcherProps) => {
  return (
    <FrameSwitcher<Series | Profile | GroupLabel>
      selected={selected}
      options={[
        {
          valueType: "group",
          children: <Divider />,
        },
        ...profileOptions,
        {
          valueType: "group",
          children: <Divider />,
        },
        ...seriesOptions,
      ]}
      placeholder={placeholder}
      renderButton={(item) => {
        return (
          <>
            {item.valueType === "profile" ? (
              <ProfileCard profile={item as Profile} size="normal" />
            ) : (
              <SeriesCard
                series={item as Series}
                profile={(item as Series).profile}
              />
            )}
          </>
        );
      }}
      renderSelected={(selected) => {
        switch (selected.valueType) {
          case "profile":
            return <ProfileCard profile={selected as Profile} size="normal" />;
          case "series":
            return (
              <SeriesCard
                series={selected as Series}
                profile={(selected as Series).profile}
              />
            );
          default:
            return null;
        }
      }}
      renderUnselectedMenuItem={(unselected, callAfterClick) => {
        if (unselected.valueType === "group")
          return (
            <ListSubheader sx={{ backgroundColor: "text.disabled" }}>
              {(unselected as GroupLabel).children}
            </ListSubheader>
          );
        let inner;
        switch (unselected.valueType) {
          case "profile":
            inner = <ProfileCard profile={unselected as Profile} size="lite" />;
            break;
          case "series":
            inner = (
              <SeriesCard
                series={unselected as Series}
                profile={(unselected as Series).profile}
              />
            );
            break;
          default:
            inner = null;
        }
        return (
          <MenuItem
            onClick={() => {
              callAfterClick();
              onChange(unselected as Profile | Series);
            }}
          >
            {inner}
          </MenuItem>
        );
      }}
    />
  );
};

export default ProfileSeriesSwitcher;
