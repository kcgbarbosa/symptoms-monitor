import { Skeleton } from '@/components/ui/skeleton';

function SymptomTimelineLineChartSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      role="status"
      aria-label="Loading symptom timeline"
    >
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <Skeleton className="h-72 w-full sm:h-80" />
    </div>
  );
}

export default SymptomTimelineLineChartSkeleton;
