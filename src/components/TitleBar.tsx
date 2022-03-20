import { ArrowBack } from "@mui/icons-material";
import { Box, BoxProps, IconButton, Typography } from "@mui/material";
import React from "react";

const TitleBar = ({
  children,
  button,
  onClick,
  ...props
}: BoxProps & {
  children?: React.ReactNode;
  button?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="auto 1fr"
      alignItems="center"
      p="0.75rem"
      {...props}
    >
      <Box display="inline-block">
        {button ? (
          button
        ) : (
          <IconButton onClick={onClick}>
            <ArrowBack />
          </IconButton>
        )}
      </Box>
      <Typography variant="h6" sx={{ userSelect: "none" }}>
        {children}
      </Typography>
    </Box>
  );
};
export default TitleBar;
