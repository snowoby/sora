import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignPage from "@/pages/account/SignPage";
import AccountPage from "./pages/account/AccountPage";
import PublishPage from "@/pages/publish";
import MainPage from "@/pages/home";
import { Container } from "@mui/material";
import EpisodePage from "@/pages/episode/EpisodePage";
import CreateSeriesPage from "./pages/series/Create";
import QuickPublish from "./pages/publish/QuickPublish";

const Guide = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="account">
          <Route path="login" element={<SignPage pageType="login" />} />
          <Route path="register" element={<SignPage pageType="register" />} />
          <Route path="" element={<AccountPage />} />
        </Route>
        <Route path="episode">
          <Route path=":id" element={<EpisodePage />} />
        </Route>
        <Route path="series" element={<CreateSeriesPage />}>
          <Route path=":id" element={<EpisodePage />} />
        </Route>
        <Route path="publish" element={<PublishPage />} />
        <Route path="quick" element={<QuickPublish />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Guide;
