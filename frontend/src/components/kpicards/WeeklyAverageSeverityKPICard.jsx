import {
  calcWeeklyAverageSeverity,
  calcWeeklySeverityTrend,
} from '../../utils/dataProcessing';
import { useEntriesStore } from '../../../store/useEntriesStore';
import RadialProgress from '../shared/RadialProgress';
import {
  getSeverityLevel,
  SEVERITY_COLORS,
} from '../../utils/severityConstants';
import { KPICard, KPICardHeader } from './KPICard';
import { cn } from '@/lib/utils';

function WeeklyAverageSeverityKPICard() {
  const { entries } = useEntriesStore();
  const weeklyAverageSeverity = calcWeeklyAverageSeverity(entries);
  const trend = calcWeeklySeverityTrend(entries);

  const level = getSeverityLevel(weeklyAverageSeverity);
  const colors = SEVERITY_COLORS[level];

  const trendMap = {
    improving: {
      className:
        'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      arrow: '↓',
      label: `${trend.percentChange}% vs last week`,
    },
    worsening: {
      className:
        'border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300',
      arrow: '↑',
      label: `${trend.percentChange}% vs last week`,
    },
    stable: {
      className: 'border-border bg-muted text-muted-foreground',
      arrow: '',
      label: 'Holding steady',
    },
    insufficient: {
      className: 'border-border bg-muted text-muted-foreground',
      arrow: '',
      label: trend.message,
    },
  };

  const currentTrend = trendMap[trend.direction] || trendMap.insufficient;

  return (
    <KPICard>
      <KPICardHeader label="Recent Severity" className="lg:hidden" />

      <div className="flex flex-1 items-center justify-center py-2">
        <RadialProgress
          value={weeklyAverageSeverity}
          max={10}
          sizeClass="size-32 sm:size-36"
          colorClass={colors.text}
          trackClass={colors.track}
        />
      </div>

      <div className="flex justify-center">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
            currentTrend.className
          )}
        >
          {currentTrend.arrow && (
            <span aria-hidden className="text-sm leading-none">
              {currentTrend.arrow}
            </span>
          )}
          {currentTrend.label}
        </span>
      </div>
    </KPICard>
  );
}

export default WeeklyAverageSeverityKPICard;
