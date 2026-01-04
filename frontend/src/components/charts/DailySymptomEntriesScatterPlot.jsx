import { Scatter } from 'react-chartjs-2';
import { getIconColor } from '../IconPicker/IconOptions';
import { formatDateForDisplay } from '../../utils/dataProcessing';

import 'chartjs-adapter-date-fns';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Renders a grid of scatter plots showing symptom frequency over time.
const DailySymptomEntriesScatterPlot = ({ data, entries }) => {

  if (!data || data.length === 0) {
    return <div className="text-center p-4">No data available</div>;
  }

  const symptomIconMap = {};
  entries.forEach(entry => {
    if (!symptomIconMap[entry.symptom_name]) {
      symptomIconMap[entry.symptom_name] = entry.icon_name;
    }
  });

  // Sort data by date to make sure the TimeScale renders properly
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Extract unique symptom names to generate individual charts
  const symptomNames = [
    ...new Set(
      sortedData.flatMap(day =>
        Object.keys(day).filter(key =>
          key !== 'date' &&
          key !== 'icon_name'))
    )
  ];

  // Calculate a global Y-axis max so all charts use the same scale
  let allCounts = [];
  sortedData.forEach(day => {
    symptomNames.forEach(symptom => {
      allCounts.push(day[symptom] || 0);
    });
  });

  const globalYAxisMax = Math.max(0, ...allCounts) + 1;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        titleColor: '#1f2937',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (context) => {
            const dateValue = context[0].parsed.x;
            const isoDate = new Date(dateValue).toISOString().split('T')[0];

            return formatDateForDisplay({
              date_of_symptom: isoDate,
            });
          },
          label: (context) => {
            const value = context.parsed.y;
            return `${value} ${value === 1 ? 'entry' : 'entries'}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: { day: 'MMM dd' },
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
          color: '#9ca3af',
        },
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {symptomNames.map((symptom) => {

        const iconName = symptomIconMap[symptom] || 'DefaultIcon';
        const color = getIconColor(iconName, 'hex');

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
              date_of_symptom:
                datesWithEntries[datesWithEntries.length - 1],
            })}`
            : 'No entries';

        const totalEntries = points.reduce(
          (sum, point) => sum + point.y,
          0
        );

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
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="mb-3">
              <h3 className="text-sm font-semibold truncate mb-2">
                {symptom}
              </h3>
              <div className="flex justify-between text-xs text-base-content/70">
                <span className='text-secondary/50'>
                  Total:{' '}
                  <span className="font-semibold text-secondary/70">
                    {totalEntries}
                  </span>
                </span>
                <span className='text-accent/50'>
                  Avg:{' '}
                  <span className="font-semibold text-accent/70 ">
                    {averagePerDay}/day
                  </span>
                </span>
              </div>
            </div>

            <div className="relative h-40">
              <Scatter data={chartData} options={chartOptions} />
            </div>

            <div className="mt-2 text-center text-xs text-base-content/70">
              {dateRangeDisplay}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailySymptomEntriesScatterPlot;