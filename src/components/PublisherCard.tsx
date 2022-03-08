import React from "react";
import SeriesCard from "@/components/series";
import { Profile, Series } from "@/types";
import ProfileCard from "./profile";

type Props = {
  series?: Series;
  profile: Profile;
};

const PublisherCard = ({ series, profile }: Props) => {
  return (
    <>
      {series ? (
        <SeriesCard series={series} />
      ) : (
        <ProfileCard profile={profile} size="lite" />
      )}
    </>
  );
};

export default PublisherCard;
