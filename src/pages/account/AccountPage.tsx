import React, { useContext, useState, ChangeEvent } from "react";
import AccountContext from "@/context/AccountContext";

const AccountPage = () => {
  const account = useContext(AccountContext);
  return <>{account.email}</>;
};
export default AccountPage;
