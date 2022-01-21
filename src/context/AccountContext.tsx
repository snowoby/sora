import React from "react";

export type AccountContextValueType = {
  email: string | null;
};

export const AccountContextDefaultValue = {
  email: null,
};

const AccountContext = React.createContext<AccountContextValueType>(
  AccountContextDefaultValue
);

export default AccountContext;
