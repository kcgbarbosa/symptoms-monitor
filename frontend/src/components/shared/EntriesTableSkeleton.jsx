import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const ROW_COUNT = 5;

function EntriesTableSkeleton() {
  return (
    <Card
      className="gap-0 p-0"
      role="status"
      aria-label="Loading entries"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b border-border">
              <th className="min-w-35 px-4 py-3 text-left font-medium uppercase tracking-wide">
                Symptom
              </th>
              <th className="hidden w-24 px-4 py-3 text-center font-medium uppercase tracking-wide sm:table-cell">
                Severity
              </th>
              <th className="w-28 px-4 py-3 text-left font-medium uppercase tracking-wide sm:w-32">
                Date
              </th>
              <th className="hidden min-w-50 max-w-xs px-4 py-3 text-left font-medium uppercase tracking-wide md:table-cell">
                Notes
              </th>
              <th className="w-28 px-4 py-3 text-right font-medium uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROW_COUNT }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8 shrink-0 rounded-lg" />
                    <Skeleton className="h-4 w-24 sm:w-32" />
                  </div>
                </td>

                <td className="hidden px-4 py-3 text-center align-middle sm:table-cell">
                  <Skeleton className="mx-auto h-5 w-12 rounded-full" />
                </td>

                <td className="px-4 py-3 align-middle">
                  <Skeleton className="h-4 w-20" />
                </td>

                <td className="hidden max-w-xs px-4 py-3 align-middle md:table-cell">
                  <Skeleton className="h-4 w-40" />
                </td>

                <td className="px-4 py-3 align-middle">
                  <div className="flex items-center justify-end gap-1">
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default EntriesTableSkeleton;
