import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import { tokens } from "../theme";
import type { TotalBalanceBoxProps } from "../types";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

function TotalBalanceBox({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: theme.shadows[5],
        overflow: "hidden",
        width: "100%",
        maxWidth: 400, // increased width

        border: `1px solid ${colors.grey[700]}`,
      }}
    >
      <CardContent
        sx={{
          backgroundColor: colors.primary[400],
          color: colors.grey[100],

          display: "flex",
          flexDirection: "column",
          // increased spacing
        }}
      >
        {/* Header */}
        <Typography variant="h4" fontWeight="bold">
          Total Balance Overview
        </Typography>
        <DoughnutChart accounts={accounts} />
        {/* Total Banks */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontSize="1.2rem">
            Total Banks
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.greenAccent[400], fontSize: "1.5rem" }}
          >
            {totalBanks}
          </Typography>
        </Box>

        {/* Total Balance */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontSize="1.2rem">
            Current Balance
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: colors.greenAccent[400],
              textShadow: "0px 1px 3px rgba(0,0,0,0.3)",
              fontSize: "1.8rem",
            }}
          >
            <AnimatedCounter amount={totalCurrentBalance} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TotalBalanceBox;
