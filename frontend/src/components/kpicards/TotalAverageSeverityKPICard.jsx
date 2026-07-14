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
import { cn } from '@/lib/utils';
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

  const pillClass = (active) =>
    cn(
      'shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors',
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
    );

  return (
    <KPICard className="sm:flex-row sm:items-stretch">
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div className="space-y-3">
          <KPICardHeader label="Baseline Severity" />

          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setSelectedSymptom(null)}
              className={pillClass(selectedSymptom === null)}
            >
              All
            </button>
            {symptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => setSelectedSymptom(symptom)}
                className={pillClass(selectedSymptom === symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
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
