import { Bar } from "react-chartjs-2";
import { getIconColor } from "../IconPicker/IconOptions";

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
  Legend);

const TotalEntriesPerSymptomBarChart = ({ data }) => {

  const MAX_LABEL_LENGTH = 15;

  // Truncate symptom names to prevent labels going outside of chart boundaries
  const fullLabels = data.map(item => item.symptom_name || '');
  const labels = fullLabels.map(name =>
    name.length > MAX_LABEL_LENGTH ? `${name.slice(0, MAX_LABEL_LENGTH)}…` : name
  );

  const counts = data.map(item => item.count);

  // Map custom icon colors to the bars for visual consistency with the icons
  const colors = data.map(item => {
    const name = item.icon_name || 'DefaultIcon';
    return getIconColor(name, 'hex');
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

  const options = {
    indexAxis: 'y',
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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.x} ${context.parsed.x === 1 ? 'entry' : 'entries'}`;
          }
        }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12
          },
          color: '#6b7280',
        },
        grid: {
          color: '#f9fafb',
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 13,
            weight: '500'
          },
          color: '#374151',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[500px] bg-white rounded-xl p-6">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TotalEntriesPerSymptomBarChart;