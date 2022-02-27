import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackTitleBar = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <Box
      bgcolor="background.paper"
      display="grid"
      gridTemplateColumns="auto 1fr"
      alignItems="center"
      gap={2}
      py={1}
    >
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h5">{children}</Typography>
    </Box>
  );
};

export default BackTitleBar;
