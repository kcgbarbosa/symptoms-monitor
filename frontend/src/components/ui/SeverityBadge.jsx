import { getSeverityLevel, SEVERITY_COLORS } from "../../utils/severityConstants";

function SeverityBadge({ severity }) {
  if (!severity) return null;
  
  const level = getSeverityLevel(severity);
  const colors = SEVERITY_COLORS[level];

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border shadow-sm ${colors.pill}`}>
      <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
      <span className="text-sm font-semibold leading-none">{severity}</span>
    </div>
  );
}

export default SeverityBadge;