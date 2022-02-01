import React from "react";
import { Stack } from "@mui/material";
import EpisodeCard from "@/components/EpisodeCard";
import MainFrame from "@/pages/frame/MainFrame";

const MainPage = () => {
  return (
    <MainFrame>
      <Stack spacing={2}>
        {Array(30)
          .fill(undefined)
          .map((value, index) => (
            <div key={index} className="bg-blue-200">
              <EpisodeCard />
            </div>
          ))}
      </Stack>
    </MainFrame>
  );
};

export default MainPage;
