import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";

type ExpenseSlice = {
  id: string;
  label: string;
  value: number;
  color: string;
};

interface MonthlyExpensesChartProps {
  title?: string;
  data?: ExpenseSlice[];
}

const defaultData: ExpenseSlice[] = [
  { id: "Rent", label: "Rent", value: 1200, color: "#EF4444" },
  { id: "Groceries", label: "Groceries", value: 450, color: "#F59E0B" },
  { id: "Transportation", label: "Transport", value: 180, color: "#10B981" },
  { id: "Entertainment", label: "Entertainment", value: 220, color: "#3B82F6" },
  { id: "Utilities", label: "Utilities", value: 140, color: "#8B5CF6" },
];

function MonthlyExpensesChart({
  title = "Monthly Expenses",
  data = defaultData,
}: MonthlyExpensesChartProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: theme.shadows[5],
        overflow: "hidden",
        width: "100%",
        maxWidth: 530,
        border: `1px solid ${colors.grey[700]}`,
      }}
    >
      <CardContent
        sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Box height={200}>
          <ResponsivePie
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            innerRadius={0.6}
            padAngle={1.5}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ datum: "data.color" }}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          />
        </Box>

        {/* Legend */}
        <Box mt={2} display="flex" flexWrap="wrap" gap={1.5}>
          {data.map((slice) => (
            <Box key={slice.id} display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: slice.color,
                }}
              />
              <Typography variant="h4" color={colors.grey[200]}>
                {slice.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default MonthlyExpensesChart;
