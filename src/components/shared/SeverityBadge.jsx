import { Badge } from '@/components/ui/badge';
import {
  getSeverityLevel,
  SEVERITY_COLORS,
} from '../../utils/severityConstants';

function SeverityBadge({ severity }) {
  if (!severity) return null;

  const level = getSeverityLevel(severity);
  const colors = SEVERITY_COLORS[level];

  return (
    <Badge variant="outline" className={`gap-1.5 border ${colors.pill}`}>
      <span className={`size-1.5 rounded-full ${colors.dot}`} />
      <span className="font-semibold tabular-nums">{severity}</span>
    </Badge>
  );
}

export default SeverityBadge;
