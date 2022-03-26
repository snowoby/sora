import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import RoundedButton from "./RoundedButton";

export type FrameSwitcherProps<T> = {
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
  renderUnselectedMenuItem?: (
    option: T,
    callAfterClick: () => void
  ) => React.ReactNode;
  freeWidth?: boolean;
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
    <div>
      <div ref={anchor} style={{ marginBottom: "0.5rem" }} />
      <RoundedButton
        disabled={props.disabled}
        type="button"
        onClick={() => setOpen(true)}
        fullWidth
      >
        {props.selected
          ? props.renderButton?.(props.selected)
          : props.placeholder}
      </RoundedButton>

      {anchor.current && (
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchor.current}
          PaperProps={{
            style: { width: props.freeWidth ? "auto" : menuWidth },
          }}
        >
          {props.selected && (
            <MenuItem
              sx={{ padding: "0.75rem" }}
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
              <Box key={props.renderKey?.(item) ?? index}>
                {props.renderUnselectedMenuItem?.(item, () =>
                  setOpen(false)
                ) ?? (
                  <MenuItem
                    onClick={() => {
                      props.onChange?.(item);
                      setOpen(false);
                    }}
                  >
                    {props.renderUnselected?.(item)}
                  </MenuItem>
                )}
              </Box>
            ))}
        </Menu>
      )}
    </div>
  );
};

export default FrameSwitcher;
