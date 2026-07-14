import { useEffect } from 'react';
import { useEntriesStore } from '../../store/useEntriesStore';
import EntryCard from '../components/ui/EntryCard';
import { HouseHeart } from 'lucide-react';
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
  const { entries, loading, error, fetchEntries } = useEntriesStore();

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

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your recent symptom activity at a glance
        </p>
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
        <div className="flex flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <HouseHeart className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium text-foreground">
            Welcome to your dashboard
          </h3>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            Your recent entries will show here. Get started by logging your
            first one.
          </p>
          <Button asChild className="mt-6">
            <Link to="/entries">Add first entry</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
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
          </div>

          <section>
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

            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default HomePage;
