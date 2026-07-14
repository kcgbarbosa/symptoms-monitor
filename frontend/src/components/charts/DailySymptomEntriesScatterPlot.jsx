import { Scatter } from "react-chartjs-2";
import { getIconColor } from "../IconPicker/IconOptions";
import { formatDateForDisplay } from "../../utils/dataProcessing";
import { getChartTheme } from "../../utils/chartTheme";

import "chartjs-adapter-date-fns";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Renders a grid of scatter plots showing symptom frequency over time.
const DailySymptomEntriesScatterPlot = ({ data, entries }) => {
  if (!data || data.length === 0) {
    return <div className="text-center p-4">No data available</div>;
  }

  const symptomIconMap = {};
  entries.forEach((entry) => {
    if (!symptomIconMap[entry.symptom_name]) {
      symptomIconMap[entry.symptom_name] = entry.icon_name;
    }
  });

  // Sort data by date to make sure the TimeScale renders properly
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Extract unique symptom names to generate individual charts
  const symptomNames = [
    ...new Set(
      sortedData.flatMap((day) =>
        Object.keys(day).filter((key) => key !== "date" && key !== "icon_name"),
      ),
    ),
  ];

  // Calculate a global Y-axis max so all charts use the same scale
  let allCounts = [];
  sortedData.forEach((day) => {
    symptomNames.forEach((symptom) => {
      allCounts.push(day[symptom] || 0);
    });
  });

  const globalYAxisMax = Math.max(0, ...allCounts) + 1;

  const theme = getChartTheme();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...theme.tooltip,
        callbacks: {
          title: (context) => {
            const dateValue = context[0].parsed.x;
            const isoDate = new Date(dateValue).toISOString().split("T")[0];

            return formatDateForDisplay({
              date_of_symptom: isoDate,
            });
          },
          label: (context) => {
            const value = context.parsed.y;
            return `${value} ${value === 1 ? "entry" : "entries"}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: { day: "MMM dd" },
        },
        ticks: { display: false },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: globalYAxisMax,
        ticks: {
          stepSize: 1,
          font: { size: 10 },
          color: theme.tick,
        },
        grid: {
          color: theme.grid,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {symptomNames.map((symptom) => {
        const iconName = symptomIconMap[symptom] || "DefaultIcon";
        const color = getIconColor(iconName, "hex");

        // define chart points, excluding 0 entry days
        const points = sortedData
          .filter((day) => day[symptom] > 0)
          .map((day) => ({
            x: day.date,
            y: day[symptom],
          }));

        const datesWithEntries = points.map((p) => p.x).sort();

        const dateRangeDisplay =
          datesWithEntries.length > 0
            ? `${formatDateForDisplay({
                date_of_symptom: datesWithEntries[0],
              })} – ${formatDateForDisplay({
                date_of_symptom: datesWithEntries[datesWithEntries.length - 1],
              })}`
            : "No entries";

        const totalEntries = points.reduce((sum, point) => sum + point.y, 0);

        const averagePerDay = (totalEntries / sortedData.length).toFixed(1);

        const chartData = {
          datasets: [
            {
              label: symptom,
              data: points,
              backgroundColor: color,
              borderColor: color,
              borderWidth: 1,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        };

        return (
          <div
            key={symptom}
            className="flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/30"
          >
            <div className="mb-3">
              <h3 className="mb-2 truncate text-sm font-semibold text-foreground">
                {symptom}
              </h3>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Total:{" "}
                  <span className="font-semibold text-foreground">
                    {totalEntries}
                  </span>
                </span>
                <span>
                  Avg:{" "}
                  <span className="font-semibold text-foreground">
                    {averagePerDay}/day
                  </span>
                </span>
              </div>
            </div>

            <div className="relative h-40">
              <Scatter data={chartData} options={chartOptions} />
            </div>

            <div className="mt-2 text-center text-xs text-muted-foreground">
              {dateRangeDisplay}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailySymptomEntriesScatterPlot;
