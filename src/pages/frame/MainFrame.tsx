import React from "react";
import { Container, Divider, Grid, Stack } from "@mui/material";
import { MainFrameProps } from "@/types";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { Link } from "react-router-dom";

const MainFrame = ({ children }: MainFrameProps) => {
  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={4}>
          <Stack className="sticky top-0" spacing={2}>
            <div />
            <div>
              <ProfileSwitcher />
            </div>
            <Divider />
            <Link to="/account">account</Link>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainFrame;
