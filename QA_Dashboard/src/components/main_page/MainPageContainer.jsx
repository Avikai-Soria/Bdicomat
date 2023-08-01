import "../../style_files/mainPageStyle.css";

import { ColorModeContext, useMode } from "../../hooks/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./layout/Dashboard";
import Team from "./layout/Team";
import BugReports from "./layout/BugReports";
import TestReports from "./layout/TestReports";
import DomainChart from "./layout/bar";
import Form from "./layout/form";
import Line from "./layout/line";
import Pie from "./layout/pie";
import FAQ from "./layout/faq";
import Geography from "./layout/geography";
import Calendar from "./layout/calendar";
import NotFound from "./layout/NotFound";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import SignInSignUpComponent from "../signIn_signUp/SignInSignUpComponent";
import MobileMenu from "./layout/MobileMenu";
import apiFetch from "../../hooks/api";
import useWindowSize from "../../hooks/useWindowSize";
import Profile from "./layout/Profile";
import CreateTest from "./layout/CreateTest";

export const UserInfoContext = createContext();

function MainPageContainer() {
  const [theme, colorMode] = useMode();

  // USER INFO STATE
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem("UserInfo"))
  );
  const [userDataFetched, setUserDataFetched] = useState(false); // New state variable
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // NAVIGATION STATE

  const [selected, setSelected] = useState("/");

  const navigate = useNavigate();

  // SCREEN STATE
  const size = useWindowSize();
  const isMobile = size.width < 768;


  function handleLogin(newUserId, newApiKey) {
    const newUserInfo = {
      userId: newUserId,
      apiKey: newApiKey,
    };

    // Store the userInfoString in local storage
    localStorage.setItem("UserInfo", JSON.stringify(newUserInfo));
    setUserInfo(newUserInfo);
    setUserDataFetched(false); // Reset the user data fetched state
    navigate("/");
  }

  useEffect(() => {
    // Check if the user is logged in and the user data has not been fetched yet
    if (userInfo && !userDataFetched) {
      apiFetch(`users/${userInfo.userId}`, "GET", userInfo.apiKey)
        .then((response) => {
          setUser(response.data);
          setUserDataFetched(true);
        })
        .catch((err) => alert("Couldn't load user... Please refresh the page"));
    }
  }, [userInfo, userDataFetched]);

  useEffect(() => {
    if (user.userRole === "admin") setIsAdmin(true);
    else setIsAdmin(false);
  }, [user]);

  function handleLogout() {
    setUserInfo(null);
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {userInfo ? (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <UserInfoContext.Provider value={userInfo}>
                {!isMobile ? (
                  <Sidebar
                    userName={user && user.name ? user.name : "Loading name..."}
                    userRole={user && user.userRole ? user.userRole : "Loading role..."}
                    isAdmin={isAdmin}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ) : (<></>)}
                <main className="content">
                  <Topbar handleLogout={handleLogout} />
                  {isMobile ? (
                    <MobileMenu
                      isAdmin={isAdmin}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ) : (<></>)}
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile userData={user} />} />
                    <Route path="/bugReports" element={<BugReports isMobile={isMobile} />} />
                    <Route path="/test" element={<TestReports isMobile={isMobile} />} />
                    <Route path="/domain" element={<DomainChart />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/pie" element={<Pie isMobile={isMobile} />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/calendar" element={<Calendar />} />

                    {isAdmin ? (<Route path="/team" element={<Team />} />) : <></>}
                    {isAdmin ? (<Route path="/form" element={<Form />} />) : <></>}
                    {isAdmin ? (<Route path="/Create-Test" element={<CreateTest />} />) : <></>}

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </UserInfoContext.Provider>
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
