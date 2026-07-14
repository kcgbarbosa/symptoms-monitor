import { useEntriesStore } from "../../../store/useEntriesStore";
import { HeartPlus, BarChart } from "lucide-react";

function UniqueSymptomsKPICard() {
  const { entries } = useEntriesStore();

  const uniqueSymptoms = new Set(entries.map((entry) => entry.symptom_name))
    .size;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 mb-2">
        <HeartPlus className="size-4 text-emerald-600" />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          All Time
        </h3>
      </div>

      <p className="text-sm text-foreground">Distinct Symptom Types</p>

      <p className="text-5xl font-bold tracking-tighter text-foreground my-2">
        {uniqueSymptoms}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
        <BarChart className="size-3.5 text-accent" />
        <span>Across all entries</span>
      </div>
    </div>
  );
}

export default UniqueSymptomsKPICard;
