import React, { useContext } from "react";
import { Button, Container, Divider, Grid, Stack } from "@mui/material";
import { MainFrameProps } from "@/types";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { Link } from "react-router-dom";
import AccountContext from "@/context/AccountContext";
import LinkMenu from "@/components/LinkMenu";

const MainFrame = ({ left, center, right }: MainFrameProps) => {
  const { account } = useContext(AccountContext);

  const menu = <LinkMenu />;

  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={4}>
          {left}
        </Grid>
        <Grid item xs={12} md={6}>
          {center}
        </Grid>
        <Grid item xs={12} md={2}>
          {right ?? menu}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainFrame;
