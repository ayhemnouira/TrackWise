import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./pages/global/Topbar";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>{/* Add Route components here */}</Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
