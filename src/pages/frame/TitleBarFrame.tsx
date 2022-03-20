import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";

import AccountContext from "@/context/AccountContext";
import LinkMenu from "@/components/LinkMenu";
import MenuIcon from "@mui/icons-material/Menu";

const TitleBarFrame = ({
  title,
  children,
}: {
  title?: React.ReactNode;
  children?: React.ReactNode;
}) => {
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
          <AppBar
            position="fixed"
            sx={{
              top: "auto",
              bottom: 0,
              bgcolor: "background.paper",
              color: "text.primary",
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              {!!title && <Box>{title}</Box>}
            </Toolbar>
          </AppBar>
        </Grid>
        {children}
      </Grid>
    </Container>
  );
};

export default TitleBarFrame;
