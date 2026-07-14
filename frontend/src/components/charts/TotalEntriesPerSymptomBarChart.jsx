import { Bar } from "react-chartjs-2";
import { getIconColor } from "../IconPicker/IconOptions";
import { getChartTheme } from "../../utils/chartTheme";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const TotalEntriesPerSymptomBarChart = ({ data }) => {
  const MAX_LABEL_LENGTH = 15;

  // Truncate symptom names to prevent labels going outside of chart boundaries
  const fullLabels = data.map((item) => item.symptom_name || "");
  const labels = fullLabels.map((name) =>
    name.length > MAX_LABEL_LENGTH
      ? `${name.slice(0, MAX_LABEL_LENGTH)}…`
      : name,
  );

  const counts = data.map((item) => item.count);

  // Map custom icon colors to the bars for visual consistency with the icons
  const colors = data.map((item) => {
    const name = item.icon_name || "DefaultIcon";
    return getIconColor(name, "hex");
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Entries",
        data: counts,
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };

  const theme = getChartTheme();

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        ...theme.tooltip,
        callbacks: {
          label: function (context) {
            return `${context.parsed.x} ${context.parsed.x === 1 ? "entry" : "entries"}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
          color: theme.tick,
        },
        grid: {
          color: theme.grid,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 13,
            weight: "500",
          },
          color: theme.tick,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-[420px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TotalEntriesPerSymptomBarChart;
