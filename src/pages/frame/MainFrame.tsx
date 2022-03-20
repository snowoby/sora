import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";
import { MainFrameProps } from "@/types";

import AccountContext from "@/context/AccountContext";
import LinkMenu from "@/components/LinkMenu";
import MenuIcon from "@mui/icons-material/Menu";
import TitleBarFrame from "./TitleBarFrame";

const MainFrame = ({ left, center, right, title }: MainFrameProps) => {
  const { account } = useContext(AccountContext);

  const menu = <LinkMenu />;

  return (
    <TitleBarFrame title={title}>
      <Grid item xs={12} md={4}>
        {left}
      </Grid>
      <Grid item xs={12} md={6}>
        {center}
      </Grid>
      <Grid item xs={12} md={2}>
        {!!title && <Box>{title}</Box>}
        {right ?? menu}
      </Grid>
    </TitleBarFrame>
  );
};

export default MainFrame;
