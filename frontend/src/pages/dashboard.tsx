import { Box, Grid, useTheme } from "@mui/material";
// ✅ MUI v5.13+ Grid v2
import HeaderBox from "../components/HeaderBox";
import { tokens } from "../theme";
import TotalBalanceBox from "../components/TotalBalanceBox";
import RightSidebar from "../global/sidebar/myRightSidebar";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const loggedIn = { firstName: "John" };

  return (
    <Box ml="20px" height="100vh" display="flex" flexDirection="column">
      <Grid container rowSpacing={1} columnSpacing={1} sx={{ flexGrow: 1 }}>
        {/* Left - 70% */}
        <Grid size={{ xs: 12, md: 8.4 }} p={2}>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Here is your dashboard overview"
          />
          <Box mt={2}>
            <TotalBalanceBox
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35}
            />
          </Box>
        </Grid>

        {/* Right - 30% */}
        <Grid size={{ xs: 12, md: 3.6 }} p={2}>
          <RightSidebar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
