import { useEntriesStore } from '../../store/useEntriesStore';
import EntryTimeline from '../components/EntryTimeline';
import AddEntryDialog from '../components/AddEntryDialog';
import EmptyState from '../components/shared/EmptyState';
import { HouseHeart, Plus } from 'lucide-react';
import StatKPICard from '../components/kpicards/StatKPICard';
import AverageSeverityKPICard from '../components/kpicards/WeeklyAverageSeverityKPICard';
import {
  calcWeeklyEntries,
  getMostLoggedSymptomThisWeek,
  getUniqueSymptomNames,
  sortEntriesByDate,
} from '../utils/dataProcessing';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ErrorState from '@/components/shared/ErrorState';
import LoadingState from '@/components/shared/LoadingState';
import { useFetchEntriesOnMount } from '@/hooks/useFetchEntriesOnMount';

function HomePage() {
  const { entries, loading, error, resetForm, openDialog } = useEntriesStore();

  useFetchEntriesOnMount();

  const recentEntries = sortEntriesByDate(entries).slice(0, 6);

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
    openDialog();
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

      {error && <ErrorState error={error} />}

      {loading ? (
        <LoadingState />
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

            <Card>
              <CardContent>
                <EntryTimeline entries={recentEntries} />
              </CardContent>
            </Card>
          </div>

          <aside className="shrink-0 space-y-4 lg:w-90">
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

      <AddEntryDialog />
    </div>
  );
}

export default HomePage;
