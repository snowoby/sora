import React, { useContext } from "react";
import { Button, Container, Divider, Grid, Stack } from "@mui/material";
import { MainFrameProps } from "@/types";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { Link } from "react-router-dom";
import AccountContext from "@/context/AccountContext";
import LinkMenu from "@/components/LinkMenu";

const MainFrame = ({ children }: MainFrameProps) => {
  const { account } = useContext(AccountContext);

  const loginButton = (
    <Link to="/account/login">
      <Button
        fullWidth
        color="primary"
        variant="contained"
        size="large"
        sx={{ borderRadius: "9999px", height: "4rem" }}
      >
        login
      </Button>
    </Link>
  );

  const menu = <LinkMenu />;

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={2}>
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={4}>
          {account ? menu : loginButton}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainFrame;
