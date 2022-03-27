import React from "react";
import { Box } from "@mui/material";
import { MiddleFrameProps } from "@/types";
import PageFrame from "./PageFrame";

const MiddleFrame = ({
  left,
  center,
  right,
  title,
  hideMdTitle,
}: MiddleFrameProps) => {
  const mdTitle = () => (
    <>
      {!hideMdTitle && (
        <Box
          display={{ xs: "none", md: "block" }}
          position="sticky"
          zIndex={(theme) => theme.zIndex.appBar}
          top={0}
        >
          {title}
        </Box>
      )}
    </>
  );

  return (
    <PageFrame
      title={title}
      left={left}
      leftGridProps={{ md: 2 }}
      center={
        <>
          {mdTitle()}
          {center}
        </>
      }
      centerGridProps={{ md: 8 }}
      right={right}
      rightGridProps={{ md: 2 }}
    />
  );
};

export default MiddleFrame;
