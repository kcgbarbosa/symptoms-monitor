import { calcWeeklyAverageSeverity, calcWeeklySeverityTrend } from '../../utils/dataProcessing';
import { useEntriesStore } from '../../../store/useEntriesStore';
import { Gauge, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import RadialProgress from '../ui/RadialProgress';
import { getSeverityLevel, SEVERITY_COLORS } from '../../utils/severityConstants';

function WeeklyAverageSeverityKPICard() {
  const { entries } = useEntriesStore();
  const weeklyAverageSeverity = calcWeeklyAverageSeverity(entries);
  const trend = calcWeeklySeverityTrend(entries);

  const level = getSeverityLevel(weeklyAverageSeverity);
  const colors = SEVERITY_COLORS[level];

  const trendMap = {
    improving: {
      icon: TrendingDown,
      label: `${trend.percentChange}% better vs last week`,
      badgeClass: colors.trendBadge,
      iconClass: colors.trendBadgeIcon
    },
    worsening: {
      icon: TrendingUp,
      label: `${trend.percentChange}% worse vs last week`,
      badgeClass: colors.trendBadge,
      iconClass: colors.trendBadgeIcon
    },
    stable: {
      icon: Minus,
      label: 'Stable',
      badgeClass: 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200',
      iconClass: 'bg-blue-500'
    },
    insufficient: {
      iconClass: '',
      label: trend.message,
      badgeClass: 'bg-gray-50 text-gray-400',
      icon: null,
    }
  };

  const currentTrend = trendMap[trend.direction];

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="size-4 text-primary" />
        <h3 className="text-md font-medium text-base uppercase tracking-wide">Recent Severity</h3>
      </div>

      <div className="flex-1 flex items-center justify-center mb-2">
        <RadialProgress
          value={weeklyAverageSeverity}
          max={10}
          sizeClass="size-40 sm:size-44"
          thickness="0.875rem"
          colorClass={colors.text}
        />
      </div>

      <div className="mt-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full ${currentTrend.badgeClass}`}>
          {currentTrend.icon && (
            <div className={`flex items-center justify-center size-7 ${currentTrend.iconClass} rounded-full`}>
              <currentTrend.icon className="size-5 text-white" strokeWidth={3} />
            </div>
          )}
          <span className="text-sm font-semibold">{currentTrend.label}</span>
        </div>
      </div>
    </div>
  );
}

export default WeeklyAverageSeverityKPICard;