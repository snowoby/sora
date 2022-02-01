import React from "react";
import PublishCard from "@/components/PublishCard";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MainFrame from "../frame/MainFrame";

const PublishPage = () => {
  return (
    <MainFrame>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">publish</Typography>
        </Toolbar>
      </AppBar>
      <PublishCard />
    </MainFrame>
  );
};

export default PublishPage;
