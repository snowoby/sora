import React, { ReactNode, useRef } from "react";
import { Button, ButtonProps, Menu, MenuProps } from "@mui/material";

type Props = {
  open: boolean;
  buttonProps?: ButtonProps;
  buttonContent?: ReactNode;
  menuProps?: MenuProps;
  children: ReactNode;
};

const NewFrameSwitcher = (props: Props) => {
  const anchor = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div ref={anchor} />
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
        {...props.buttonProps}
      >
        {props.buttonContent}
      </Button>
      {anchor.current && (
        <Menu anchorEl={anchor.current} {...props.menuProps} open={props.open}>
          {props.children}
        </Menu>
      )}
    </div>
  );
};

export default NewFrameSwitcher;
