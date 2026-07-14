import { formatDateForDisplay } from '../../utils/dataProcessing';
import IconComponent from './IconComponent';
import SeverityBadge from './SeverityBadge';

function EntryCardContent({ entry }) {
  const displayDate = formatDateForDisplay(entry);

  return (
    <div className="flex items-center gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted">
        <IconComponent entry={entry} size={26} strokeWidth={2.5} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <h3 className="truncate text-sm font-medium text-foreground">
            {entry?.symptom_name}
          </h3>
          {displayDate && (
            <span className="whitespace-nowrap text-xs text-muted-foreground">
              {displayDate}
            </span>
          )}
        </div>
        {entry?.notes && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {entry.notes}
          </p>
        )}
      </div>

      <SeverityBadge severity={entry?.severity} />
    </div>
  );
}

export default EntryCardContent;
