import PublishCard from "@/components/PublishCard";
import React from "react";
import MainFrame from "../frame/MainFrame";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const PublishPage = () => {
  return (
    <MainFrame>
      <div className="w-full">
        <Box>
          sdasddas
          <AppBar className="w-full">
            <Toolbar>
              <Typography variant="h3">Publish</Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <PublishCard />
    </MainFrame>
  );
};

export default PublishPage;
