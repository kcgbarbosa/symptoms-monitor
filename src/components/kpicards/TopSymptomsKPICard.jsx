import { useEntriesStore } from '../../../store/useEntriesStore';
import { getTopSymptoms } from '../../utils/dataProcessing';
import IconBadge from '../shared/IconBadge';
import { KPICard, KPICardHeader } from './KPICard';

function TopSymptomRow({ symptom }) {
  return (
    <div className="flex items-center gap-3">
      <IconBadge entry={{ icon_name: symptom.icon_name }} />

      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {symptom.name}
      </span>

      <span className="text-sm text-muted-foreground">{symptom.count}×</span>
    </div>
  );
}

function TopSymptomsKPICard() {
  const { entries } = useEntriesStore();
  const topSymptoms = getTopSymptoms(entries, 3);

  if (topSymptoms.length === 0) return null;

  return (
    <KPICard>
      <KPICardHeader label="Most Tracked" />
      <div className="space-y-4">
        {topSymptoms.map((symptom) => (
          <TopSymptomRow key={symptom.name} symptom={symptom} />
        ))}
      </div>
    </KPICard>
  );
}

export default TopSymptomsKPICard;
