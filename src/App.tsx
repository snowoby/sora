import React, { useEffect, useState } from "react";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";
import Guide from "@/route";
import log from "./log";
import { AccountInfo, Episode, Series, StorageEndpoint } from "./types";
import { APISelf } from "./api/ProfileAPI";
import { APIStorageEndpoint } from "@/api/Site";
import endpoint from "@/const/endpoint";
import urlcat from "urlcat";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { APIAllMySeries } from "@/api/Series";
import { AxiosError } from "axios";
import { GetAccessToken, GetRefreshToken } from "./utils/utils";
import HomeTimelineContext from "./context/HomeTimelineContext";

const App = () => {
  const [accountInfo, setAccount] = useState<AccountInfo>();
  const [loginStatus, setLoginStatus] = useState<boolean>();
  const [seriesInfo, setSeries] = useState<Series[]>();
  const [homeTimeline, setHomeTimeline] = useState<Episode[]>();
  const [ep, setEp] = useState<StorageEndpoint>();

  const updateAccount = async () => {
    if (!GetAccessToken() && !GetRefreshToken()) {
      setLoginStatus(false);
      return;
    }
    try {
      const self = APISelf();
      const series = APIAllMySeries();
      const results = await Promise.all([self, series]);
      setAccount(results[0].data);
      setSeries(results[1].data);
      setLoginStatus(true);
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        setLoginStatus(false);
      }
      log.error(e);
    }
  };

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
                series: seriesInfo,
                loginStatus,
                updateAccount,
              }}
            >
              <HomeTimelineContext.Provider
                value={{ timeline: homeTimeline, setTimeline: setHomeTimeline }}
              >
                {ep && <Guide />}
              </HomeTimelineContext.Provider>
            </AccountContext.Provider>
          </UniversalContext.Provider>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default App;
