import { Skeleton } from '@/components/ui/skeleton';
import { KPICard, KPICardHeader } from './KPICard';

function StatKPICardSkeleton() {
  return (
    <KPICard role="status" aria-label="Loading stat">
      <KPICardHeader label={<Skeleton className="h-3 w-20" />} />
      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-11 w-16" />
      </div>
      <Skeleton className="h-3 w-40" />
    </KPICard>
  );
}

export default StatKPICardSkeleton;
