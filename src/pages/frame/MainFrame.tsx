import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { MainFrameProps } from "@/types";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { Link } from "react-router-dom";
import AccountContext from "@/context/AccountContext";
import LinkMenu from "@/components/LinkMenu";

const MainFrame = ({ left, center, right, title }: MainFrameProps) => {
  const { account } = useContext(AccountContext);

  const menu = <LinkMenu />;

  return (
    <Container disableGutters>
      <Grid container columnSpacing={{ sx: 0, md: 2 }}>
        <Grid
          item
          xs={12}
          sx={{
            display: { md: "none" },
            top: 0,
            position: "sticky",
            zIndex: 100,
          }}
        >
          <Paper>{!!title && <Box>{title}</Box>}</Paper>
        </Grid>
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
      </Grid>
    </Container>
  );
};

export default MainFrame;
