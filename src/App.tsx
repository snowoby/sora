import React, { useEffect, useState } from "react";
import UniversalContext, {
  UniversalContextDefaultValue,
} from "@/context/UniversalContext";
import AccountContext, {
  AccountContextDefaultValue,
} from "@/context/AccountContext";
import Guide from "@/route";
import { APISelf } from "./api/SignAPI";

type Account = {
  email: string | null;
};

const App = () => {
  const [account, setAccount] = useState<Account>({ email: null });

  useEffect(() => {
    APISelf().then((response) => setAccount(response.data));
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
