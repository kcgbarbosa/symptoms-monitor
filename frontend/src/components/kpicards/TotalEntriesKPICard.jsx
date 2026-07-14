import { useEntriesStore } from "../../../store/useEntriesStore";
import { Calendar, Clock } from "lucide-react";

function TotalEntriesKPICard() {
  const { entries } = useEntriesStore();

  const totalEntries = entries.length;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Calendar className="size-4 text-purple-600" />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          All time
        </h3>
      </div>

      <p className="text-sm text-foreground">Symptoms Monitored</p>

      <p className="text-5xl font-bold tracking-tighter text-foreground my-2">
        {totalEntries}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
        <Clock className="size-3.5" />
        <span>Since you started tracking</span>
      </div>
    </div>
  );
}

export default TotalEntriesKPICard;
