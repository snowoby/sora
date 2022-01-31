import React from "react";
import { Container, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import EpisodeCard from "@/components/EpisodeCard";

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
                  <EpisodeCard />
                </div>
              ))}
          </Stack>
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
