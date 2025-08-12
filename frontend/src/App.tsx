import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { MyProSidebarProvider } from "./global/sidebar/sidebarContext.tsx";
import { Routes, Route } from "react-router-dom";
import Topbar from "./global/Topbar.tsx";
import Dashboard from "./pages/dashboard.tsx";

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
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
