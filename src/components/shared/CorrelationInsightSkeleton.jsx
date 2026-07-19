import { Skeleton } from '@/components/ui/skeleton';

function CorrelationInsightSkeleton() {
  return (
    <section
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
      role="status"
      aria-label="Loading insight"
    >
      <Skeleton className="size-12 shrink-0 rounded-full" />

      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-6 w-full max-w-md" />
      </div>
    </section>
  );
}

export default CorrelationInsightSkeleton;
