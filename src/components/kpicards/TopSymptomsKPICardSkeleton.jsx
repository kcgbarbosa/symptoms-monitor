import { Skeleton } from '@/components/ui/skeleton';
import { KPICard, KPICardHeader } from './KPICard';

const ROW_COUNT = 3;

function TopSymptomRowSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-8 shrink-0 rounded-lg" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 w-8" />
    </div>
  );
}

function TopSymptomsKPICardSkeleton() {
  return (
    <KPICard role="status" aria-label="Loading top symptoms">
      <KPICardHeader label={<Skeleton className="h-3 w-24" />} />
      <div className="space-y-4">
        {Array.from({ length: ROW_COUNT }).map((_, index) => (
          <TopSymptomRowSkeleton key={index} />
        ))}
      </div>
    </KPICard>
  );
}

export default TopSymptomsKPICardSkeleton;
