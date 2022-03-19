import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode[] | React.ReactNode;
  hideBack?: boolean;
};

const MenuFrame = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Stack className="sticky top-0" spacing={0}>
      <Box display="grid" gridTemplateColumns="auto 1fr" alignItems="center">
        <Box display="inline-block">
          {!props.hideBack && (
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
          )}
        </Box>
        <Typography variant="h6" sx={{ m: "0.75rem", userSelect: "none" }}>
          {props.title}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column">
        {props.children}
      </Box>
    </Stack>
  );
};

export default MenuFrame;
