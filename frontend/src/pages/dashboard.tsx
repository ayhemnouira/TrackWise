import { Box, Grid } from "@mui/material";

import HeaderBox from "../components/HeaderBox";

import TotalBalanceBox from "../components/TotalBalanceBox";
import RightSidebar from "../global/sidebar/myRightSidebar";
import type { Account } from "../types";

const Dashboard = () => {
  const loggedIn = { firstName: "John" };

  const banks: Account[] = [
    {
      id: "acc_1",
      availableBalance: 1200,
      currentBalance: 1500.75,
      officialName: "Checking Account",
      mask: "1234",
      institutionId: "inst_1",
      name: "Primary Checking",
      type: "depository",
      subtype: "checking",
      appwriteItemId: "item_1",
      shareableId: "share_1",
    },
    {
      id: "acc_2",
      availableBalance: 800,
      currentBalance: 980.2,
      officialName: "Savings Account",
      mask: "9876",
      institutionId: "inst_2",
      name: "High-Yield Savings",
      type: "depository",
      subtype: "savings",
      appwriteItemId: "item_2",
      shareableId: "share_2",
    },
  ];

  return (
    <Box ml="20px" height="100vh" display="flex" flexDirection="column">
      <Grid container rowSpacing={1} columnSpacing={0} sx={{ flexGrow: 1 }}>
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
        <Grid size={{ xs: 12, md: 3.6 }} p={0}>
          <RightSidebar banks={banks} userName={"John Doe"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
