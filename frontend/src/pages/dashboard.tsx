import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import HeaderBox from "../components/HeaderBox";
import { getLoggedInUser } from "../lib/actions/user.actions";
import TotalBalanceBox from "../components/TotalBalanceBox";
import RightSidebar from "../global/sidebar/myRightSidebar";
import type { Account } from "../types";
import type { UserProfile } from "../types";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";

const Dashboard = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

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
    };
    fetchUser();
  }, []);

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
            user={user?.firstName || "Guest"}
            subtext="Here is your dashboard overview"
          />
          <Box mt={2} display="flex" gap={3} flexWrap="wrap">
            <TotalBalanceBox
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35}
            />
            <MonthlyExpensesChart />
          </Box>
        </Grid>

        {/* Right - 30% */}
        <Grid size={{ xs: 12, md: 3.6 }} p={0}>
          <RightSidebar
            banks={banks}
            userName={user ? `${user.firstName} ${user.lastName}` : "Guest"}
            userEmail={user?.email}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
