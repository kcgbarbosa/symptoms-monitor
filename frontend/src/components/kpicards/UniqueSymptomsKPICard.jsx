import { useEntriesStore } from '../../../store/useEntriesStore'
import { HeartPlus, BarChart } from 'lucide-react';

function UniqueSymptomsKPICard() {
  const { entries } = useEntriesStore();

  const uniqueSymptoms = new Set(
    entries.map(entry => entry.symptom_name)
  ).size;

  return (
    <div className="flex h-full flex-col gap-3">

      <div className="flex items-center gap-2 mb-2">
        <HeartPlus className="size-4 text-emerald-600" />
        <h3 className="text-md font-medium text-base uppercase tracking-wide">All Time</h3>
      </div>

      <p className="text-base text-gray-500">Distinct Symptom Types</p>

      <p className="text-7xl font-bold text-gray-900 my-2 tracking-tighter">{uniqueSymptoms}</p>

      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
        <BarChart className="size-3.5 text-accent" />
        <span>Across all entries</span>
      </div>
    </div>
  );
}

export default UniqueSymptomsKPICard;