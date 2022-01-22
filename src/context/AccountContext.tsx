import React from "react";
import { AccountContextType } from "@/types";

const AccountContext = React.createContext<AccountContextType>({
  updateAccountInfo(): void {},
});

export default AccountContext;
