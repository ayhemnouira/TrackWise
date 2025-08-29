import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { MyProSidebarProvider } from "./global/sidebar/sidebarContext";
import Topbar from "./global/Topbar";
import Dashboard from "./pages/dashboard";
import MyProSidebar from "./global/sidebar/mySidebar";
import AuthForm from "./components/AuthForm";
import { useTheme } from "@mui/material/styles";
import { useProSidebar } from "react-pro-sidebar";
import { getLoggedInUser } from "./lib/actions/user.actions";
import type { UserProfile } from "./types";
import TransactionTable from "./components/transactionTable";

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser();
      if (loggedInUser) {
        setUser({
          firstName: loggedInUser.firstName || "",
          lastName: loggedInUser.lastName || "",
          email: loggedInUser.email,
          id: loggedInUser.id,
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const [theme, colorMode] = useMode();

  if (loading) return null; // or a spinner

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Public routes */}
          <Route path="/sign-in" element={<AuthPage type="sign-in" />} />
          <Route path="/sign-up" element={<AuthPage type="sign-up" />} />

          {/* Private route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <MyProSidebarProvider>
                  <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
                    <DynamicMainContent>
                      <Dashboard />
                    </DynamicMainContent>
                  </Box>
                </MyProSidebarProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute user={user}>
                <MyProSidebarProvider>
                  <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
                    <DynamicMainContent>
                      <TransactionTable
                        transactions={[
                          {
                            id: "t1",
                            date: new Date().toISOString(),
                            amount: 2500,
                            category: "salary",
                            description: "Monthly salary",
                            type: "INCOME",
                            isRecurring: true,
                            recurringInterval: "MONTHLY",
                            nextRecurringDate: new Date(
                              new Date().setMonth(new Date().getMonth() + 1)
                            ).toISOString(),
                          },
                          {
                            id: "t2",
                            date: new Date().toISOString(),
                            amount: 85.45,
                            category: "groceries",
                            description: "Grocery run",
                            type: "EXPENSE",
                            isRecurring: false,
                          },
                          {
                            id: "t3",
                            date: new Date().toISOString(),
                            amount: 1200,
                            category: "housing",
                            description: "Monthly rent",
                            type: "EXPENSE",
                            isRecurring: true,
                            recurringInterval: "MONTHLY",
                            nextRecurringDate: new Date(
                              new Date().setMonth(new Date().getMonth() + 1)
                            ).toISOString(),
                          },
                        ]}
                      />
                    </DynamicMainContent>
                  </Box>
                </MyProSidebarProvider>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <MyProSidebarProvider>
                  <Box
                    sx={{ display: "flex", height: "100vh", width: "100%" }}
                  ></Box>
                </MyProSidebarProvider>
              </PrivateRoute>
            }
          />
          {/* Redirect root to dashboard or login */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Reusable Auth page
const AuthPage = ({ type }: { type: "sign-in" | "sign-up" }) => (
  <Box
    sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}
  >
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <AuthForm type={type} />
    </Box>
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <img
        src="/dashboard-screenshot.jpg"
        alt="Dashboard Preview"
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
    </Box>
  </Box>
);

// Protects private routes
const PrivateRoute = ({
  user,
  children,
}: {
  user: UserProfile | null;
  children: React.ReactNode;
}) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{children}</>;
};

const DynamicMainContent: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  const { collapsed } = useProSidebar();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pl: 3,
        marginLeft: collapsed ? theme.spacing(9) : theme.spacing(30),
        transition: theme.transitions.create("margin-left", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        width: "100%",
      }}
    >
      <Topbar />
      {children}
    </Box>
  );
};

export default App;
