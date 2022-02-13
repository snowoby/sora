import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackTitleBar = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <Box position="sticky" top="0" bgcolor="background.paper">
      <Typography variant="h6">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        {children}
      </Typography>
    </Box>
  );
};

export default BackTitleBar;
