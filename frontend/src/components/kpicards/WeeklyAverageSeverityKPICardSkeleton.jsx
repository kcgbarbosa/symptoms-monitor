import { Skeleton } from '@/components/ui/skeleton';
import { KPICard, KPICardHeader } from './KPICard';

function WeeklyAverageSeverityKPICardSkeleton() {
  return (
    <KPICard role="status" aria-label="Loading weekly average severity">
      <KPICardHeader
        label={<Skeleton className="h-3 w-24" />}
        className="lg:hidden"
      />

      <div className="flex flex-1 items-center justify-center py-2">
        <Skeleton className="size-32 rounded-full sm:size-36" />
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
    </KPICard>
  );
}

export default WeeklyAverageSeverityKPICardSkeleton;
