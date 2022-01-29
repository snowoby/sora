import React, { useEffect, useState } from "react";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";
import Guide from "@/route";
import log from "./log";
import { AccountInfo, Profile } from "./types";
import { APISelf } from "./api/ProfileAPI";

const App = () => {
  const [accountInfo, setAccount] = useState<AccountInfo>();
  const [currentProfile, setCurrentProfile] = useState<Profile>();
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
  }, []);

  useEffect(() => {
    switchProfile(currentProfile?.id);
  }, [accountInfo?.profiles]);

  return (
    <UniversalContext.Provider value={UniversalContextDefaultValue}>
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
