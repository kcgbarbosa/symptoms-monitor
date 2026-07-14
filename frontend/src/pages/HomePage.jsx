import { useEffect } from 'react';
import { useEntriesStore } from '../../store/useEntriesStore';
import EntryTimeline from '../components/ui/EntryTimeline';
import AddEntryModal from '../components/ui/AddEntryModal';
import EmptyState from '../components/ui/EmptyState';
import { HouseHeart, Plus } from 'lucide-react';
import StatKPICard from '../components/kpicards/StatKPICard';
import AverageSeverityKPICard from '../components/kpicards/WeeklyAverageSeverityKPICard';
import {
  calcWeeklyEntries,
  getMostLoggedSymptomThisWeek,
  getUniqueSymptomNames,
} from '../utils/dataProcessing';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function HomePage() {
  const { entries, loading, error, fetchEntries, resetForm, openModal } =
    useEntriesStore();

  useEffect(() => {
    fetchEntries();
  }, []);

  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date_of_symptom) - new Date(a.date_of_symptom))
    .slice(0, 6);

  const weeklyEntries = calcWeeklyEntries(entries);
  const peakSymptom = getMostLoggedSymptomThisWeek(entries);
  const uniqueSymptoms = getUniqueSymptomNames(entries).length;

  const weeklyCaption = peakSymptom ? (
    <>
      Most tracked{' '}
      <span className="font-medium text-foreground">{peakSymptom.name}</span> (
      {peakSymptom.count}×)
    </>
  ) : (
    'Nothing logged yet this week'
  );

  const handleAddNew = () => {
    resetForm();
    openModal();
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your recent symptom activity at a glance
          </p>
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
          icon={HouseHeart}
          title="Welcome to your dashboard"
          description="Your recent entries will show here. Get started by logging your first one."
          action={<Button onClick={handleAddNew}>Add first entry</Button>}
        />
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Recent Entries
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your 6 most recent entries.
                </p>
              </div>
              <Link
                to="/entries"
                className="shrink-0 text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            <EntryTimeline entries={recentEntries} />
          </div>

          <aside className="shrink-0 space-y-4 lg:w-80">
            <StatKPICard
              label="This Week"
              value={weeklyEntries}
              valueLabel="Symptoms logged"
              caption={weeklyCaption}
            />
            <AverageSeverityKPICard />
            <StatKPICard
              label="All Time"
              value={uniqueSymptoms}
              valueLabel="Distinct symptom types"
              caption="Across all of your entries"
            />
          </aside>
        </div>
      )}

      <AddEntryModal />
    </div>
  );
}

export default HomePage;
