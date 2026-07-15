import {
  calcTotalAverageSeverity,
  getUniqueSymptomNames,
} from '../../utils/dataProcessing';
import { useEntriesStore } from '../../../store/useEntriesStore';
import {
  getSeverityLevel,
  SEVERITY_COLORS,
} from '../../utils/severityConstants';
import RadialProgress from '../ui/RadialProgress';
import { KPICard, KPICardHeader, KPICardMeta } from './shared';
import FilterPills from '../ui/FilterPills';
import { useState } from 'react';

function TotalAverageSeverityKPICard() {
  const { entries } = useEntriesStore();
  const symptoms = getUniqueSymptomNames(entries);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const totalAverageSeverity = calcTotalAverageSeverity(
    entries,
    selectedSymptom
  );

  const level = getSeverityLevel(totalAverageSeverity);
  const colors = SEVERITY_COLORS[level];

  const pills = [
    { id: null, label: 'All', active: selectedSymptom === null },
    ...symptoms.map((symptom) => ({
      id: symptom,
      label: symptom,
      active: selectedSymptom === symptom,
    })),
  ];

  return (
    <KPICard className="sm:flex-row sm:items-stretch">
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div className="space-y-3">
          <KPICardHeader label="Baseline Severity" />

          <FilterPills pills={pills} onSelect={setSelectedSymptom} />
        </div>

        <KPICardMeta>
          {selectedSymptom
            ? `Showing ${selectedSymptom}`
            : 'Across all symptoms'}{' '}
          · all-time average
        </KPICardMeta>
      </div>

      <div className="flex shrink-0 items-center justify-center">
        <RadialProgress
          value={totalAverageSeverity}
          max={10}
          sizeClass="size-36 sm:size-40"
          colorClass={colors.text}
          trackClass={colors.track}
        />
      </div>
    </KPICard>
  );
}

export default TotalAverageSeverityKPICard;
