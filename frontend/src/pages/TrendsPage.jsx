import { useEntriesStore } from '../../store/useEntriesStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { groupEntriesByDate } from '../utils/dataProcessing';
import SymptomTimelineLineChart from '../components/charts/SymptomTimelineLineChart';
import { Card, CardContent } from '@/components/ui/card';
import StatKPICard from '../components/kpicards/StatKPICard';
import TotalAverageSeverityKPICard from '../components/kpicards/TotalAverageSeverityKPICard';
import CorrelationInsightKPICard from '../components/kpicards/CorrelationInsightKPICard';
import EmptyState from '../components/ui/EmptyState';
import { TrendingUpDown } from 'lucide-react';

function TrendsPage() {
  const { entries, loading, error, fetchEntries } = useEntriesStore();

  useEffect(() => {
    fetchEntries();
  }, []);

  const data = groupEntriesByDate(entries);
  const totalEntries = entries.length;

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Trends
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visualize your symptom patterns over time
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
        <EmptyState
          icon={TrendingUpDown}
          title="Nothing to visualize yet"
          description={
            <>
              We'll chart your symptom patterns here once you've logged some{' '}
              <Link
                to="/entries"
                className="font-medium text-primary hover:underline"
              >
                entries
              </Link>
              .
            </>
          }
        />
      ) : (
        <>
          <div className="mb-6">
            <CorrelationInsightKPICard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <StatKPICard
                label="All Time"
                value={totalEntries}
                valueLabel="Symptoms monitored"
                caption="Since you started tracking"
              />
            </div>
            <div className="md:col-span-3">
              <TotalAverageSeverityKPICard />
            </div>
          </div>

          <div className="mt-6 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Symptom Timeline
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Daily entry counts for your most logged symptoms. Toggle a symptom
              to show or hide its line.
            </p>
          </div>
          <Card>
            <CardContent>
              <SymptomTimelineLineChart data={data} entries={entries} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default TrendsPage;
