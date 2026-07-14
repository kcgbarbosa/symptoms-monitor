import { useEntriesStore } from '../../store/useEntriesStore.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import AddEntryModal from '../components/ui/AddEntryModal.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useEffect, useState } from 'react';
import { HeartOff, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  calcEntriesPerSymptomAllTime,
  symptomCountToArr,
  formatDateForDisplay,
  formatDateForInput,
} from '../utils/dataProcessing.js';
import EntriesPerSymptomAllTimeChart from '../components/charts/TotalEntriesPerSymptomBarChart.jsx';
import IconComponent from '../components/ui/IconComponent.jsx';
import SeverityBadge from '../components/ui/SeverityBadge.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

function EntriesPage() {
  const {
    entries,
    fetchEntries,
    deleteEntry,
    setFormData,
    resetForm,
    openModal,
    error,
    loading,
  } = useEntriesStore();
  const { isDemoMode } = useAuthStore();

  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEdit = (entry) => {
    setFormData({
      ...entry,
      date_of_symptom: formatDateForInput(entry),
    });
    openModal();
  };

  const handleAddNew = () => {
    resetForm();
    openModal();
  };

  const confirmDelete = async () => {
    await deleteEntry(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const entriesPerSymptomArr = symptomCountToArr(
    calcEntriesPerSymptomAllTime(entries),
    entries
  );

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

      {error && (
        <div className="mb-8 rounded-lg border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
        </div>
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
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="min-w-0 flex-1">
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="min-w-[140px] px-4 py-3 text-left font-medium uppercase tracking-wide">
                      Symptom
                    </th>
                    <th className="hidden w-24 px-4 py-3 text-center font-medium uppercase tracking-wide sm:table-cell">
                      Severity
                    </th>
                    <th className="w-28 px-4 py-3 text-left font-medium uppercase tracking-wide sm:w-32">
                      Date
                    </th>
                    <th className="hidden min-w-[200px] max-w-xs px-4 py-3 text-left font-medium uppercase tracking-wide md:table-cell">
                      Notes
                    </th>
                    <th className="w-16 px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="group border-b border-border transition-colors last:border-0 hover:bg-muted/40"
                    >
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center gap-3">
                          <IconComponent entry={entry} size={20} />
                          <button
                            type="button"
                            onClick={() => handleEdit(entry)}
                            className="flex items-center gap-1.5 truncate text-left font-medium text-foreground transition-colors hover:text-primary"
                          >
                            <span className="max-w-[110px] truncate sm:max-w-[150px]">
                              {entry.symptom_name}
                            </span>
                            <Pencil className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </button>
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

                      <td className="px-4 py-3 text-right align-middle">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Delete entry"
                          onClick={() => setPendingDeleteId(entry.id)}
                          className="cursor-pointer text-muted-foreground opacity-100 transition-all duration-150 hover:bg-destructive/10 hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <Trash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:w-1/3">
            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Entries Per Symptom
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EntriesPerSymptomAllTimeChart data={entriesPerSymptomArr} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <AddEntryModal />

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
              className="bg-destructive/10 text-destructive hover:bg-destructive/20"
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
