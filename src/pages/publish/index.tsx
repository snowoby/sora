import React, { useContext } from "react";
import { Button, Grid, Stack } from "@mui/material";
import AccountContext from "@/context/AccountContext";
import PublishCard from "@/components/publish/PublishCard";
import ProfileSwitcher from "@/components/ProfileSwitcher";

const PublishPage = () => {
  const { currentProfile } = useContext(AccountContext);
  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        {currentProfile && <PublishCard profileID={currentProfile.id} />}
      </Grid>
      <Grid item md={4}>
        <div>
          <ProfileSwitcher />
        </div>

        <Button fullWidth type="submit" variant="contained" size="large">
          publish
        </Button>
      </Grid>
    </Grid>
  );
};

export default PublishPage;
