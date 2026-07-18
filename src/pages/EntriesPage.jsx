import { useEntriesStore } from '../../store/useEntriesStore.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import AddEntryDialog from '../components/AddEntryDialog.jsx';
import EmptyState from '../components/shared/EmptyState.jsx';
import { useState } from 'react';
import { HeartOff, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  formatDateForDisplay,
  formatDateForInput,
} from '../utils/dataProcessing.js';
import IconBadge from '../components/shared/IconBadge.jsx';
import SeverityBadge from '../components/shared/SeverityBadge.jsx';
import PaginationControls from '../components/shared/PaginationControls.jsx';
import { usePagination } from '../hooks/usePagination.js';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import ErrorState from '@/components/shared/ErrorState.jsx';
import EntriesTableSkeleton from '@/components/shared/EntriesTableSkeleton.jsx';
import { useFetchEntriesOnMount } from '@/hooks/useFetchEntriesOnMount.js';

const ENTRIES_PAGE_SIZE = 10;

function EntriesPage() {
  const { isDemoMode } = useAuthStore();

  const {
    entries,
    deleteEntry,
    setFormData,
    resetForm,
    openDialog,
    error,
    loading,
  } = useEntriesStore();

  useFetchEntriesOnMount();

  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const {
    pageItems,
    currentPage,
    totalPages,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
  } = usePagination(entries, ENTRIES_PAGE_SIZE);

  const handleEdit = (entry) => {
    setFormData({
      ...entry,
      date_of_symptom: formatDateForInput(entry),
    });
    openDialog();
  };

  const handleAddNew = () => {
    resetForm();
    openDialog();
  };

  const confirmDelete = async () => {
    await deleteEntry(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Entries
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage your symptom entries
          </p>
          {isDemoMode && (
            <p className="mt-3 text-xs text-muted-foreground">
              Demo mode uses temporary local data. Changes reset on refresh.
            </p>
          )}
        </div>

        {entries.length > 0 && (
          <Button onClick={handleAddNew}>
            <Plus />
            Add Entry
          </Button>
        )}
      </div>

      {error && <ErrorState error={error} />}

      {loading ? (
        <EntriesTableSkeleton />
      ) : entries.length === 0 ? (
        <EmptyState
          icon={HeartOff}
          title="No entries yet"
          description="Log your first symptom to get started."
          action={
            <Button onClick={handleAddNew}>
              <Plus />
              Add Entry
            </Button>
          }
        />
      ) : (
        <div>
          <Card className="p-0 gap-0">
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
                  {pageItems.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-border transition-colors last:border-0 hover:bg-muted/40"
                    >
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center gap-3">
                          <IconBadge entry={entry} />
                          <span className="max-w-27.5 truncate font-medium text-foreground sm:max-w-37.5">
                            {entry.symptom_name}
                          </span>
                        </div>
                      </td>

                      <td className="hidden px-4 py-3 text-center align-middle sm:table-cell">
                        <SeverityBadge severity={entry.severity} />
                      </td>

                      <td className="px-4 py-3 align-middle text-muted-foreground">
                        {formatDateForDisplay(entry)}
                      </td>

                      <td className="hidden max-w-xs truncate px-4 py-3 align-middle text-muted-foreground md:table-cell">
                        {entry.notes}
                      </td>

                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Edit entry"
                            onClick={() => handleEdit(entry)}
                            className="cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <Pencil />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Delete entry"
                            onClick={() => setPendingDeleteId(entry.id)}
                            className="cursor-pointer text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />
        </div>
      )}

      <AddEntryDialog />

      <AlertDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the symptom entry. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className={buttonVariants({ variant: 'destructive' })}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default EntriesPage;
