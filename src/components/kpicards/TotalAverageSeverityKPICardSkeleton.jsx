import { Skeleton } from '@/components/ui/skeleton';
import { KPICard, KPICardHeader } from './KPICard';

function TotalAverageSeverityKPICardSkeleton() {
  return (
    <KPICard
      className="sm:flex-row sm:items-stretch"
      role="status"
      aria-label="Loading baseline severity"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div className="space-y-3">
          <KPICardHeader label={<Skeleton className="h-3 w-28" />} />

          <div className="flex gap-2">
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-3 w-44" />
      </div>

      <div className="flex shrink-0 items-center justify-center">
        <Skeleton className="size-36 rounded-full sm:size-40" />
      </div>
    </KPICard>
  );
}

export default TotalAverageSeverityKPICardSkeleton;
