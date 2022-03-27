import React from "react";
import { Grid } from "@mui/material";
import { FrameProps } from "@/types";
import TitleBarFrame from "./TitleBarFrame";

const PageFrame = ({
  left,
  center,
  right,
  title,
  leftGridProps,
  centerGridProps,
  rightGridProps,
}: FrameProps) => {
  return (
    <TitleBarFrame title={title}>
      <Grid item xs={12} {...leftGridProps}>
        {left}
      </Grid>
      <Grid item xs={12} {...centerGridProps}>
        {center}
      </Grid>
      <Grid item xs={12} {...rightGridProps}>
        {right}
      </Grid>
    </TitleBarFrame>
  );
};

export default PageFrame;
