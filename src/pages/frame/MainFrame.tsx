import React, { useContext } from "react";
import { Box } from "@mui/material";
import AccountContext from "@/context/AccountContext";
import LinkMenu from "@/components/LinkMenu";
import PageFrame from "./PageFrame";
import { FrameProps } from "@/types";

const MainFrame = ({ left, center, right, title }: FrameProps) => {
  const { account } = useContext(AccountContext);

  const menu = <LinkMenu />;

  return (
    <PageFrame
      title={title}
      left={left}
      leftGridProps={{ md: 4 }}
      center={center}
      centerGridProps={{ md: 6 }}
      right={
        <>
          {!!title && <Box>{title}</Box>}
          {right ?? menu}
        </>
      }
      rightGridProps={{ display: { xs: "none", md: "block" }, md: 2 }}
    />
  );
};

export default MainFrame;
