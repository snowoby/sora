import React, { useContext } from "react";
import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";
import ProfileSwitcher from "@/pages/frame/ProfileSwitcher";
import AccountContext from "@/context/AccountContext";
import { Link } from "react-router-dom";

const MainFrame = () => {
  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={8}>
          <Stack spacing={2}>
            {Array(30)
              .fill(undefined)
              .map((value, index) => (
                <div key={index} className="bg-blue-200">
                  <Stack spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" height={118} />
                  </Stack>
                </div>
              ))}
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Link to="/account">account</Link>

          <ProfileSwitcher />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainFrame;
