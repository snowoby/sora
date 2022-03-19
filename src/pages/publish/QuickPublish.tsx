import React from "react";
import { Episode, Profile, Series } from "@/types";
import { useNavigate } from "react-router-dom";
import MainFrame from "../frame/MainFrame";
import MenuFrame from "../frame/MenuFrame";
import ShortPublishCard from "./ShortPublishCard";

const QuickPublish = () => {
  const navigate = useNavigate();

  const handleDialogClose = (ep?: Episode, identity?: Profile | Series) => {
    if (ep) {
      if (identity) {
        if (identity.valueType === "profile") {
          ep.profile = identity as Profile;
        }
        if (identity.valueType === "series") {
          ep.series = identity as Series;
          ep.profile = (identity as Series).profile;
        }
      }
      // setEpisodes((episodes) => (episodes ? [ep, ...episodes] : [ep]));
    }
    navigate("/");
  };

  return (
    <MainFrame
      center={<ShortPublishCard onFinish={handleDialogClose} />}
      right={<MenuFrame title="publish" />}
    />
  );
};

export default QuickPublish;
