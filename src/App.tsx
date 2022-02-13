import React, { useEffect, useState } from "react";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";
import Guide from "@/route";
import log from "./log";
import { AccountInfo, Profile, StorageEndpoint } from "./types";
import { APISelf } from "./api/ProfileAPI";
import { APIStorageEndpoint } from "@/api/Site";
import endpoint from "@/const/endpoint";
import urlcat from "urlcat";
import { AppBar, Box, Toolbar } from "@mui/material";
import universalContext from "@/context/UniversalContext";

const App = () => {
  const [accountInfo, setAccount] = useState<AccountInfo>();
  const [currentProfile, setCurrentProfile] = useState<Profile>();
  const [ep, setEp] = useState<StorageEndpoint>();
  const switchProfile = (profileID?: string) =>
    setCurrentProfile(
      accountInfo?.profiles.find((profile) => profile.id === profileID) ??
        accountInfo?.profiles[0]
    );

  const updateAccountInfo = () =>
    APISelf()
      .then((response) => {
        setAccount(response.data);
      })
      .catch((e) => log.error(e));

  useEffect(() => {
    updateAccountInfo().then(() => {});
    APIStorageEndpoint().then(({ data }) => {
      endpoint.url = urlcat(data.storageEndpoint, data.storageBucket);
      setEp(data);
    });
  }, []);

  useEffect(() => {
    switchProfile(currentProfile?.id);
  }, [accountInfo?.profiles]);

  // if (!ep) return <CircularProgress />;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          mb: "2rem",
        }}
      >
        <Toolbar>{UniversalContextDefaultValue.siteName}</Toolbar>
      </AppBar>

      <Box minHeight="calc(100vh - 20rem)">
        <UniversalContext.Provider
          value={{ ...UniversalContextDefaultValue, storage: ep }}
        >
          <AccountContext.Provider
            value={{
              accountInfo,
              updateAccountInfo,
              currentProfile,
              switchProfile,
            }}
          >
            <Guide />
          </AccountContext.Provider>
        </UniversalContext.Provider>
      </Box>
      <Box sx={{ minHeight: "20rem", backgroundColor: "#8fb2bd" }}>
        页面底部
      </Box>
    </>
  );
};

export default App;
