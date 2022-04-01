import React from "react";
import { Episode, Profile, Series } from "@/types";
import { useNavigate } from "react-router-dom";
import ShortPublishCard from "./ShortPublishCard";
import MiddleFrame from "../frame/MiddleFrame";
import BackTitleBar from "@/components/BackTitleBar";
import { Box } from "@mui/material";

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
    <MiddleFrame
      center={
        <Box mx={2}>
          <ShortPublishCard onFinish={handleDialogClose} />
        </Box>
      }
      title={<BackTitleBar>publish</BackTitleBar>}
    />
  );
};

export default QuickPublish;
