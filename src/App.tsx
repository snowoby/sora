import React, { useEffect, useState } from "react";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";
import Guide from "@/route";
import log from "./log";
import { AccountInfo } from "./types";
import { APISelf } from "./api/ProfileAPI";

const App = () => {
  const [accountInfo, setAccount] = useState<AccountInfo>();
  const updateAccountInfo = () =>
    APISelf()
      .then((response) => setAccount(response.data))
      .catch((e) => log.error(e));

  useEffect(() => {
    updateAccountInfo();
  }, []);

  return (
    <UniversalContext.Provider value={UniversalContextDefaultValue}>
      <AccountContext.Provider value={{ accountInfo, updateAccountInfo }}>
        <Guide />
      </AccountContext.Provider>
    </UniversalContext.Provider>
  );
};

export default App;
