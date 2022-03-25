import { HomeTimelineContextType, Episode } from "@/types";
import React from "react";

const HomeTimelineContext = React.createContext<HomeTimelineContextType>({
  setTimeline: () => {},
});

export default HomeTimelineContext;
