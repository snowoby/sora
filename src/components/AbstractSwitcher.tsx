import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Button, ButtonProps, Menu, MenuProps } from "@mui/material";

type Props = {
  buttonProps?: ButtonProps;
  buttonContent?: ReactNode;
  menuProps?: MenuProps;
  children: ReactNode;
};

const AbstractSwitcher = (props: Props) => {
  const [menuWidth, setMenuWidth] = useState("auto");
  const [open, setOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMenuWidth(`300px`);
    if (anchor.current) setMenuWidth(`${anchor.current.clientWidth}px`);
  }, [anchor, window.innerWidth]);

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
        <Menu anchorEl={anchor.current} {...props.menuProps} open={open}>
          {props.children}
        </Menu>
      )}
    </div>
  );
};

export default AbstractSwitcher;
