import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import AccountContext from "@/context/AccountContext";
import LinkMenu from "@/components/LinkMenu";
import MenuIcon from "@mui/icons-material/Menu";

const TitleBarFrame = ({
  title,
  menu,
  children,
}: {
  title?: React.ReactNode;
  menu?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const { account } = useContext(AccountContext);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  menu = menu ?? <LinkMenu />;
  const appBar = () => (
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
        <Box sx={{ flexGrow: 1 }}>{!!title && title}</Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 2 }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
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
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              sx={{
                width: "16rem",
                height: "100vh",
              }}
              display="grid"
              gridTemplateRows="1fr auto"
            >
              <Box />
              <Box>{menu}</Box>
            </Box>
          </Drawer>
          {appBar()}
        </Grid>
        {children}
      </Grid>
      <Box
        visibility="hidden"
        display={{ xs: "block", md: "none" }}
        position="relative"
        height={(theme) => theme.mixins.toolbar.minHeight}
      />
    </Container>
  );
};

export default TitleBarFrame;
