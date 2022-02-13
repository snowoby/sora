import React, { useContext } from "react";
import { Button, Container, Divider, Grid, Stack } from "@mui/material";
import { MainFrameProps } from "@/types";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { Link } from "react-router-dom";
import AccountContext from "@/context/AccountContext";

const MainFrame = ({ children }: MainFrameProps) => {
  const { accountInfo } = useContext(AccountContext);

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

  const menu = (
    <Stack className="sticky top-0" spacing={2}>
      <Link to="/account">account</Link>
      <Link to="/">home</Link>
      <Link to="/publish">publish</Link>
      {/*<Link to="/series">series</Link>*/}
    </Stack>
  );

  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={4}>
          {accountInfo ? menu : loginButton}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainFrame;
