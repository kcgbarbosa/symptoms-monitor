import { formatDateForDisplay } from '../../utils/dataProcessing';
import IconComponent from './IconComponent';
import SeverityBadge from './SeverityBadge';

function EntryCard({ entry }) {

  const displayDate = formatDateForDisplay(entry);

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
      <div className="card-body p-3 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4">

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-base-200 flex items-center justify-center shrink-0">
            <IconComponent entry={entry} size={32} strokeWidth={3} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="card-title m-0 text-sm sm:text-base text-primary truncate">
                {entry?.symptom_name}
              </h3>
              {displayDate && (
                <span className="text-xs text-accent/75 whitespace-nowrap">
                  {displayDate}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-base-content/60 truncate">
              {entry?.notes}
            </p>
          </div>

          <div className="scale-100 lg:scale-125">
            <SeverityBadge severity={entry?.severity} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryCard

