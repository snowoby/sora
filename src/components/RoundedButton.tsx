import React from "react";
import { Button, ButtonProps, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { boolean } from "yup";

const RoundedButton = ({
  sx,
  activated,
  ...props
}: ButtonProps & { activated?: boolean }) => {
  return (
    <Button
      sx={[
        !!activated &&
          (((theme) => {
            return {
              background: `linear-gradient(120deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
            };
          }) as ((theme: Theme) => SystemStyleObject<Theme>) | boolean),
        {
          borderRadius: "9999px",
          "&:hover": {
            backgroundColor: "action.hover",
          },
          padding: "0.75rem",
          color: "text.primary",
          textTransform: "none",
          justifyContent: "flex-start",
          ...sx,
        } as SystemStyleObject<Theme>,
      ]}
      {...props}
    />
  );
};

export default RoundedButton;
