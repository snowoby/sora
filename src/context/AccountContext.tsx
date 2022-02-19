import React from "react";
import { AccountContextType } from "@/types";

const AccountContext = React.createContext<AccountContextType>({
  updateAccount(): void {},
});

export default AccountContext;
