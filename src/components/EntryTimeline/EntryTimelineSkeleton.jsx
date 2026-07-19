import { Skeleton } from '@/components/ui/skeleton';

const ROW_COUNT = 4;

function EntryTimelineSkeleton() {
  return (
    <div className="flex flex-col" role="status" aria-label="Loading entries">
      {Array.from({ length: ROW_COUNT }).map((_, index) => (
        <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
          {index !== ROW_COUNT - 1 && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1.25 top-4 w-0.5 -translate-x-1/2 bg-border"
            />
          )}
          <Skeleton className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EntryTimelineSkeleton;
