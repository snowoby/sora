import React, { useContext } from "react";
import PublishCard from "@/components/PublishCard";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MainFrame from "../frame/MainFrame";
import AccountContext from "@/context/AccountContext";

const PublishPage = () => {
  const { currentProfile } = useContext(AccountContext);
  return (
    <MainFrame>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">publish</Typography>
        </Toolbar>
      </AppBar>
      {currentProfile && <PublishCard profileID={currentProfile.id} />}
    </MainFrame>
  );
};

export default PublishPage;
