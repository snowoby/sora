import React from "react";
import { Button, ButtonProps } from "@mui/material";

const MenuSwitchButton = (props: ButtonProps) => {
  return (
    <Button
      sx={{
        borderRadius: "9999px",
        "&:hover": {
          backgroundColor: "action.hover",
        },
        padding: "0.75rem",
        color: "text.primary",
        textTransform: "none",
        justifyContent: "flex-start",
      }}
      type="button"
      {...props}
    />
  );
};
