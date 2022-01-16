import React from "react";
import { Outlet } from "react-router-dom";
import loginBackground from "@/assets/login_background.webp";
import Panel from "@/pages/sign/Panel";
const SignPage = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${loginBackground})` }}
        className="h-screen w-screen bg-cover bg-bottom flex items-center justify-center"
      >
        <Panel>
          <Outlet />
        </Panel>
      </div>
    </>
  );
};

export default SignPage;
