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
      <Box display="flex" flexDirection="column">
        {props.children}
      </Box>
    </Stack>
  );
};

export default MenuFrame;
