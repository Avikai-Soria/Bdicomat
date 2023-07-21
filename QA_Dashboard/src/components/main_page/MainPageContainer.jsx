import "../../style_files/mainPageStyle.css";

import { ColorModeContext, useMode } from "../../hooks/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./layout/dashboard";
import Team from "./layout/team";
import Invoices from "./layout/invoices";
import TestReports from "./layout/testReports";
import Bar from "./layout/bar";
import Form from "./layout/form";
import Line from "./layout/line";
import Pie from "./layout/pie";
import FAQ from "./layout/faq";
import Geography from "./layout/geography";
import Calendar from "./layout/calendar";
import NotFound from "./layout/NotFound";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import SignInSignUpComponent from "../signIn_signUp/SignInSignUpComponent";

function MainPageContainer() {
  const [theme, colorMode] = useMode();

  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem("UserInfo"))
  );
  const navigate = useNavigate();

  function handleLogin(newUserId, newApiKey) {
    const newUserInfo = {
      userId: newUserId,
      apiKey: newApiKey,
    };

    // Store the userInfoString in local storage
    localStorage.setItem("UserInfo", JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
    navigate("/");
  }

  function handleLogout() {
    setUserInfo(null);
    localStorage.clear();
    navigate("/Login");
  }

  return (
    <>
      {userInfo ? (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/testReports" element={<TestReports />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<SignInSignUpComponent onLogin={handleLogin} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
export default MainPageContainer;
