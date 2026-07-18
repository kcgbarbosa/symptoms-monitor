import EntryTimelineRow from './EntryTimelineRow';
import { cn } from '@/lib/utils';
import {
  getSeverityLevel,
  SEVERITY_COLORS,
} from '../../utils/severityConstants';

function EntryTimeline({ entries }) {
  return (
    <div className="flex flex-col">
      {entries.map((entry, index) => {
        const isLast = index === entries.length - 1;
        const colors = SEVERITY_COLORS[getSeverityLevel(entry.severity)];

        return (
          <div key={entry.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-1.25 top-4 w-0.5 -translate-x-1/2 bg-border"
              />
            )}
            <span
              className={cn(
                'relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full ring-4 ring-card',
                colors.dot
              )}
            />
            <div className="min-w-0 flex-1">
              <EntryTimelineRow entry={entry} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EntryTimeline;
