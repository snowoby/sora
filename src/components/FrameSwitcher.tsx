import React, { useEffect, useRef, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

type FrameSwitcherProps<T> = {
  options: T[];
  selected?: T;
  onChange?: (option: T) => void;
  disabled?: boolean;
  placeholder?: React.ReactNode;
  itemEq?: (t1: T | undefined, t2: T | undefined) => boolean;
  renderKey?: (t1: T) => string;
  renderButton?: (option: T) => React.ReactNode;
  renderSelected?: (option: T) => React.ReactNode;
  renderUnselected?: (option: T) => React.ReactNode;
};

const FrameSwitcher = <T,>(props: FrameSwitcherProps<T>) => {
  const [menuWidth, setMenuWidth] = useState("auto");
  const [open, setOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMenuWidth(`300px`);
    if (anchor.current) setMenuWidth(`${anchor.current.clientWidth}px`);
  }, [anchor, window.innerWidth]);

  return (
    <>
      <div ref={anchor} />
      <Button
        sx={{
          borderRadius: "9999px",
          "&:hover": {
            backgroundColor: "#eeeeee",
          },
          padding: "0.75rem",
          color: "text.primary",
          textTransform: "none",
          justifyContent: "flex-start",
        }}
        disabled={props.disabled}
        type="button"
        onClick={() => setOpen(true)}
        fullWidth
      >
        {props.selected
          ? props.renderButton?.(props.selected)
          : props.placeholder}
      </Button>
      {anchor.current && (
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchor.current}
          PaperProps={{ style: { width: menuWidth } }}
        >
          {props.selected && (
            <MenuItem
              onClick={() => {
                props.selected && props.onChange?.(props.selected);
                setOpen(false);
              }}
            >
              {props.renderSelected?.(props.selected)}
            </MenuItem>
          )}
          {props.options
            .filter(
              (item) =>
                !(
                  props.itemEq?.(props.selected, item) ??
                  item === props.selected
                )
            )
            .map((item, index) => (
              <MenuItem
                key={props.renderKey?.(item) ?? index}
                onClick={() => {
                  props.onChange?.(item);
                  setOpen(false);
                }}
              >
                {props.renderUnselected?.(item)}
              </MenuItem>
            ))}
        </Menu>
      )}
    </>
  );
};

export default FrameSwitcher;
