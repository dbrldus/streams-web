import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Intro from "./intro";
import LeaderBoard from "./Leaderboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/game" element={<App />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);
