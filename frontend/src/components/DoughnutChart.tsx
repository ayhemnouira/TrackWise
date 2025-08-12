import { ResponsivePie } from "@nivo/pie";
import type { DoughnutChartProps } from "../types";

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  // This is your old Chart.js data
  const labels = ["Bank 1", "Bank 2", "Bank 3"];
  const values = [1250, 2500, 3750];
  const colors = ["#0747b6", "#2265d8", "#2f91fa"];

  // Convert Chart.js format → Nivo format
  const data = labels.map((label, index) => ({
    id: label,
    label: label,
    value: values[index],
    color: colors[index],
  }));

  return (
    <div style={{ height: 200 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5} // donut shape
        padAngle={2}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: "data.color" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </div>
  );
};

export default DoughnutChart;
