import React, { useEffect, useState } from "react";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";
import Guide from "@/route";
import log from "./log";
import { AccountInfo, StorageEndpoint } from "./types";
import { APISelf } from "./api/ProfileAPI";
import { APIStorageEndpoint } from "@/api/Site";
import endpoint from "@/const/endpoint";
import urlcat from "urlcat";
import { Box, createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const [accountInfo, setAccount] = useState<AccountInfo>();
  const [ep, setEp] = useState<StorageEndpoint>();

  const updateAccount = () =>
    APISelf()
      .then((response) => {
        setAccount(response.data);
      })
      .catch((e) => log.error(e));

  useEffect(() => {
    updateAccount().then(() => {});
    APIStorageEndpoint().then(({ data }) => {
      endpoint.url = urlcat(data.storageEndpoint, data.storageBucket);
      setEp(data);
    });
  }, []);

  // if (!ep) return <CircularProgress />;

  const theme = createTheme({
    components: {},
    palette: {
      text: {
        primary: "#252525",
        secondary: "#696969",
      },
    },
  });

  return (
    <>
      <Box minHeight="calc(100vh - 20rem)">
        <ThemeProvider theme={theme}>
          <UniversalContext.Provider
            value={{ ...UniversalContextDefaultValue, storage: ep }}
          >
            <AccountContext.Provider
              value={{
                account: accountInfo?.account,
                profiles: accountInfo?.profiles,
                updateAccount,
              }}
            >
              <Guide />
            </AccountContext.Provider>
          </UniversalContext.Provider>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default App;
