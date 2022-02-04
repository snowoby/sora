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
import CircularProgress from "@mui/material/CircularProgress";
import urlcat from "urlcat";

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

  if (!ep) return <CircularProgress />;

  return (
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
  );
};

export default App;
