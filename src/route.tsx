import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignPage from "@/pages/account/SignPage";
import AccountPage from "./pages/account/AccountPage";
import PublishPage from "@/pages/publish";
import MainPage from "@/pages/home";
import { Container } from "@mui/material";

const Guide = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="account">
            <Route path="login" element={<SignPage pageType="login" />} />
            <Route path="register" element={<SignPage pageType="register" />} />
            <Route path="" element={<AccountPage />} />
          </Route>
          <Route path="publish" element={<PublishPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default Guide;
