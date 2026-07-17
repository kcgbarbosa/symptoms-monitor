import { useEntriesStore } from '../../store/useEntriesStore';
import EntryTimeline from '../components/EntryTimeline/EntryTimeline';
import AddEntryDialog from '../components/AddEntryDialog';
import EmptyState from '../components/shared/EmptyState';
import { HouseHeart, Plus } from 'lucide-react';
import StatKPICard from '../components/kpicards/StatKPICard';
import WeeklyAverageSeverityKPICard from '../components/kpicards/WeeklyAverageSeverityKPICard';
import TopSymptomsKPICard from '../components/kpicards/TopSymptomsKPICard';
import {
  calcWeeklyEntries,
  getMostLoggedSymptomThisWeek,
  getUniqueSymptomNames,
  sortEntriesByDate,
} from '../utils/dataProcessing';
import { formatTodayLabel, getTimeBasedGreeting } from '../utils/greeting';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ErrorState from '@/components/shared/ErrorState';
import { useFetchEntriesOnMount } from '@/hooks/useFetchEntriesOnMount';
import EntryTimelineSkeleton from '../components/EntryTimeline/EntryTimelineSkeleton';
import StatKPICardSkeleton from '../components/kpicards/StatKPICardSkeleton';
import WeeklyAverageSeverityKPICardSkeleton from '../components/kpicards/WeeklyAverageSeverityKPICardSkeleton';
import TopSymptomsKPICardSkeleton from '../components/kpicards/TopSymptomsKPICardSkeleton';

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

  const { greeting, prompt } = getTimeBasedGreeting();

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {formatTodayLabel()}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
            {greeting}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{prompt}</p>
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
        <>
          <div className="mb-4 flex flex-col gap-6 lg:flex-row lg:items-end">
            <div className="flex flex-1 items-end justify-between gap-4">
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

            <div className="hidden shrink-0 lg:block lg:w-90">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Recent Severity
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your weekly average and most tracked.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="min-w-0 flex-1 space-y-6">
              <Card>
                <CardContent>
                  <EntryTimelineSkeleton />
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <StatKPICardSkeleton />
                <StatKPICardSkeleton />
              </div>
            </div>

            <aside className="shrink-0 space-y-4 lg:w-90">
              <WeeklyAverageSeverityKPICardSkeleton />
              <TopSymptomsKPICardSkeleton />
            </aside>
          </div>
        </>
      ) : entries.length === 0 ? (
        <EmptyState
          icon={HouseHeart}
          title="Welcome to your dashboard"
          description="Your recent entries will show here. Get started by logging your first one."
          action={<Button onClick={handleAddNew}>Add first entry</Button>}
        />
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-6 lg:flex-row lg:items-end">
            <div className="flex flex-1 items-end justify-between gap-4">
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

            <div className="hidden shrink-0 lg:block lg:w-90">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Recent Severity
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your weekly average and most tracked.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="min-w-0 flex-1 space-y-6">
              <Card>
                <CardContent>
                  <EntryTimeline entries={recentEntries} />
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <StatKPICard
                  label="This Week"
                  value={weeklyEntries}
                  valueLabel="Symptoms logged"
                  caption={weeklyCaption}
                />
                <StatKPICard
                  label="All Time"
                  value={uniqueSymptoms}
                  valueLabel="Distinct symptom types"
                  caption="Across all of your entries"
                />
              </div>
            </div>

            <aside className="shrink-0 space-y-4 lg:w-90">
              <WeeklyAverageSeverityKPICard />
              <TopSymptomsKPICard />
            </aside>
          </div>
        </>
      )}

      <AddEntryDialog />
    </div>
  );
}

export default HomePage;
