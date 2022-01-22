import React, { useEffect, useState } from "react";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";
import Guide from "@/route";
import { APISelf } from "./api/SignAPI";
import log from "./log";

type Account = {
  email: string | null;
};

const App = () => {
  const [account, setAccount] = useState<Account>({ email: null });

  useEffect(() => {
    APISelf()
      .then((response) => setAccount(response.data))
      .catch((e) => log.error(e));
  }, []);

  return (
    <UniversalContext.Provider value={UniversalContextDefaultValue}>
      <AccountContext.Provider value={account}>
        <Guide />
      </AccountContext.Provider>
    </UniversalContext.Provider>
  );
};

export default App;
