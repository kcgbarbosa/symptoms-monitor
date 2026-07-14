import { useEntriesStore } from "../../../store/useEntriesStore";
import { getCorrelationInsight } from "../../utils/dataProcessing";
import { cn } from "@/lib/utils";

function CorrelationInsightKPICard() {
  const { entries } = useEntriesStore();
  const insight = getCorrelationInsight(entries);

  const tierSurface = {
    1: "border-primary/20 bg-primary/5",
    2: "border-border bg-muted/50",
    3: "border-border bg-muted/30",
  };

  const tierTitles = {
    1: "Pattern Detected",
    2: "Symptom Frequency",
    3: "Getting Started",
  };

  return (
    <div className={cn("rounded-xl border p-6", tierSurface[insight.tier])}>
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {tierTitles[insight.tier]}
      </h3>
      <p className="mt-2 text-sm font-medium text-foreground">
        {insight.message}
      </p>
    </div>
  );
}

export default CorrelationInsightKPICard;
