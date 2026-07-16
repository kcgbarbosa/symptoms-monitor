import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getIconColor } from '../IconPicker/IconOptions';
import { formatDateForDisplay } from '../../utils/dataProcessing';
import { getChartTheme } from '../../utils/chartTheme';
import { useThemeStore } from '../../../store/useThemeStore';
import FilterPills from '../shared/FilterPills';

import 'chartjs-adapter-date-fns';

import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DEFAULT_VISIBLE_COUNT = 3;

function buildTimelineModel(data, entries) {
  const iconBySymptom = {};
  entries.forEach((entry) => {
    if (!iconBySymptom[entry.symptom_name]) {
      iconBySymptom[entry.symptom_name] = entry.icon_name;
    }
  });

  const sortedDays = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const totals = {};
  sortedDays.forEach((day) => {
    Object.keys(day).forEach((key) => {
      if (key === 'date' || key === 'icon_name') return;
      totals[key] = (totals[key] || 0) + day[key];
    });
  });

  const symptoms = Object.keys(totals)
    .sort((a, b) => totals[b] - totals[a])
    .map((name) => ({
      name,
      color: getIconColor(iconBySymptom[name] || 'DefaultIcon', 'hex'),
    }));

  return { sortedDays, symptoms };
}

function SymptomTimelineLineChart({ data, entries }) {
  const { sortedDays, symptoms } = useMemo(
    () => buildTimelineModel(data, entries),
    [data, entries]
  );

  const [visibleSymptoms, setVisibleSymptoms] = useState(() =>
    symptoms.slice(0, DEFAULT_VISIBLE_COUNT).map((symptom) => symptom.name)
  );

  const toggleSymptom = (name) => {
    setVisibleSymptoms((current) => {
      if (current.includes(name)) {
        return current.filter((visible) => visible !== name);
      }
      return [...current, name];
    });
  };

  const pills = symptoms.map((symptom) => ({
    id: symptom.name,
    label: symptom.name,
    active: visibleSymptoms.includes(symptom.name),
    color: symptom.color,
  }));

  const themeMode = useThemeStore((state) => state.theme);
  const theme = useMemo(() => getChartTheme(), [themeMode]);

  const datasets = symptoms
    .filter((symptom) => visibleSymptoms.includes(symptom.name))
    .map((symptom) => ({
      label: symptom.name,
      data: sortedDays.map((day) => ({
        x: day.date,
        y: day[symptom.name] || 0,
      })),
      borderColor: symptom.color,
      backgroundColor: symptom.color,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.3,
    }));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        ...theme.tooltip,
        callbacks: {
          title: (items) => {
            const isoDate = new Date(items[0].parsed.x)
              .toISOString()
              .split('T')[0];
            return formatDateForDisplay({ date_of_symptom: isoDate });
          },
          label: (item) => {
            const count = item.parsed.y;
            const unit = count === 1 ? 'entry' : 'entries';
            return `${item.dataset.label}: ${count} ${unit}`;
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
        ticks: {
          color: theme.tick,
          font: { size: 11 },
          maxRotation: 0,
          autoSkip: true,
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
          color: theme.tick,
          font: { size: 11 },
        },
        grid: { color: theme.grid },
      },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <FilterPills pills={pills} onSelect={toggleSymptom} />

      <div className="relative h-72 sm:h-80">
        {datasets.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Select a symptom above to plot its timeline
          </div>
        ) : (
          <Line data={{ datasets }} options={options} />
        )}
      </div>
    </div>
  );
}

export default SymptomTimelineLineChart;
