import "../../style_files/mainPageStyle.css";

import { ColorModeContext, useMode } from "../../hooks/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./layout/dashboard";
import Team from "./layout/team";
import Invoices from "./layout/invoices";
import Contacts from "./layout/contacts";
import Bar from "./layout/bar";
import Form from "./layout/form";
import Line from "./layout/line";
import Pie from "./layout/pie";
import FAQ from "./layout/faq";
import Geography from "./layout/geography";
import Calendar from "./layout/calendar";

import { Routes, Route } from "react-router-dom";

function MainPageContainer() {
  const [theme, colorMode] = useMode();

  return (
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
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/form" element={<Form />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MainPageContainer;
