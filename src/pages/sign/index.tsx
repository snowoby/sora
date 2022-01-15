import React from "react";
import { Outlet } from "react-router-dom";

const SignPage = () => {
  return (
    <>
      <div>This is the sign in or sign up page!</div>
      <Outlet />
    </>
  );
};

export default SignPage;
