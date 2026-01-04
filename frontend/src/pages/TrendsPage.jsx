import { useEntriesStore } from '../../store/useEntriesStore'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { groupEntriesByDate } from '../utils/dataProcessing';
import DailySymptomEntriesScatterPlot from '../components/charts/DailySymptomEntriesScatterPlot';
import TotalEntriesKPICard from '../components/kpicards/TotalEntriesKPICard';
import TotalAverageSeverityKPICard from '../components/kpicards/TotalAverageSeverityKPICard';
import CorrelationInsightKPICard from '../components/kpicards/CorrelationInsightKPICard';
import { TrendingUpDown } from 'lucide-react';

function TrendsPage() {

  const { entries, loading, error, fetchEntries } = useEntriesStore();

  useEffect(() => {
    fetchEntries();
  }, []);

  const data = groupEntriesByDate(entries);

  return (
    <div className="page-container">

      <div className='flex-1 min-w-0'>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-primary">Trends</h1>
          <p className="mt-1 text-sm text-gray-600">Visualize your symptom patterns over time</p>
        </div>

        {error && <div className="alert alert-error mb-8">{error}</div>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg" />
          </div>

        ) : entries.length === 0 ? (
          <div className='flex flex-col items-center py-16'>
            <div className='bg-accent/25 p-4 rounded-full mb-4'>
              <TrendingUpDown className="size-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Welcome to your Trends Page</h3>
            <p className='text-base-content/60 text-center'>
              We'll visualize your symptom patterns here once you've logged some <Link to="/entries" className="link link-primary">entries</Link>
            </p>
          </div>

        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-base-100 rounded-3xl p-8 min-h-[280px] md:col-span-2">
                <TotalEntriesKPICard />
              </div>
              <div className="bg-base-100 rounded-3xl p-8 min-h-[280px] md:col-span-3">
                <TotalAverageSeverityKPICard />
              </div>
            </div>

            <div className="my-6">
              <CorrelationInsightKPICard />
            </div>

            <div className="mb-4">
              <h1 className="text-l font-bold text-secondary">
                Symptom Timeline
              </h1>
              <p className="mt-1 text-sm text-gray-600">Each chart displays how many times you logged this symptom per day</p>
            </div>
            <div>
              <DailySymptomEntriesScatterPlot data={data} entries={entries} />
              <p className="text-xs text-gray-500 text-center mt-6">
                Visual representation of symptom frequency and patterns.
              </p>
            </div>
          </>
        )}

      </div>

    </div>
  )
}

export default TrendsPage
