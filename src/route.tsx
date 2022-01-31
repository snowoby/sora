import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignPage from "@/pages/account/SignPage";
import AccountPage from "./pages/account/AccountPage";
import MainFrame from "@/pages/home/MainFrame";
import PublishPage from "@/pages/publish";

const Guide = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainFrame />} />
          <Route path="account">
            <Route path="login" element={<SignPage pageType="login" />} />
            <Route path="register" element={<SignPage pageType="register" />} />
            <Route path="" element={<AccountPage />} />
          </Route>
          <Route path="publish" element={<PublishPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Guide;
