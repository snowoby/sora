import React from "react";
import { AccountContextType } from "@/types";

const AccountContext = React.createContext<AccountContextType>({
  currentProfile: undefined,
  switchProfile(): void {},
  updateAccountInfo(): void {},
});

export default AccountContext;
