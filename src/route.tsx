import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignPage from "@/pages/sign";
import Login from "@/pages/sign/Login";

const Guide = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="account" element={<SignPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={"register!"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Guide;
