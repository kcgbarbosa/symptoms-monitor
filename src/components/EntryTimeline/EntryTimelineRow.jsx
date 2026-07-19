import { formatDateForDisplay } from '../../utils/dataProcessing';
import {
  getSeverityLevel,
  SEVERITY_COLORS,
} from '../../utils/severityConstants';
import { cn } from '@/lib/utils';

function EntryTimelineRow({ entry }) {
  const displayDate = formatDateForDisplay(entry);
  const hasSeverity = Boolean(entry?.severity);
  const colors = SEVERITY_COLORS[getSeverityLevel(entry?.severity)];

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <h3 className="text-sm font-medium text-foreground">
          {entry?.symptom_name}
        </h3>
        <span className="text-xs text-muted-foreground">
          {displayDate}
          {hasSeverity && (
            <>
              {' · '}
              <span className={cn('font-medium', colors.text)}>
                Severity {entry.severity}
              </span>
            </>
          )}
        </span>
      </div>
      {entry?.notes && (
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {entry.notes}
        </p>
      )}
    </div>
  );
}

export default EntryTimelineRow;
