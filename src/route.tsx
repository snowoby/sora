import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignPage from "@/pages/sign";

const Guide = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="account">
            <Route path="login" element={<SignPage pageType="login" />} />
            <Route path="register" element={<SignPage pageType="register" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Guide;
