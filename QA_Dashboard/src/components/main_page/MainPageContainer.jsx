import "../../style_files/mainPageStyle.css";

import { ColorModeContext, useMode } from "../../hooks/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "../../layout/Topbar";

// import { BrowserRouter } from "react-router-dom";

function MainPageContainer() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MainPageContainer;
