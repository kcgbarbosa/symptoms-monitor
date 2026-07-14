import { Info, Sparkles, BarChart } from "lucide-react";
import { useEntriesStore } from "../../../store/useEntriesStore";
import { getCorrelationInsight } from "../../utils/dataProcessing";

function CorrelationInsightKPICard() {
  const { entries } = useEntriesStore();
  const insight = getCorrelationInsight(entries);

  const tierStyles = {
    1: "bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200",
    2: "bg-blue-50 border-blue-200",
    3: "bg-muted border-border",
  };

  const tierIcons = {
    1: <Sparkles className="size-5 text-purple-600" />,
    2: <BarChart className="size-5 text-blue-600" />,
    3: <Info className="size-5 text-muted-foreground" />,
  };

  const tierTitles = {
    1: "Pattern Detected",
    2: "Symptom Frequency",
    3: "Getting Started",
  };

  return (
    <div className={`rounded-lg border p-6 ${tierStyles[insight.tier]}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{tierIcons[insight.tier]}</div>
        <div className="flex-1">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            {tierTitles[insight.tier]}
          </h3>
          <p className="text-sm text-foreground font-medium">
            {insight.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CorrelationInsightKPICard;
