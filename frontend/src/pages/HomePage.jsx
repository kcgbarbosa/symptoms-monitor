import { useEffect } from 'react';
import { useEntriesStore } from '../../store/useEntriesStore';
import EntryCard from '../components/ui/EntryCard';
import { HouseHeart } from 'lucide-react';
import WeeklyTotalEntriesKPICard from '../components/kpicards/WeeklyEntriesKPICard';
import UniqueSymptomsKPICard from '../components/kpicards/UniqueSymptomsKPICard';
import AverageSeverityKPICard from '../components/kpicards/WeeklyAverageSeverityKPICard';
import { Link } from 'react-router-dom';

function HomePage() {
  const { entries, loading, error, fetchEntries } = useEntriesStore();

  useEffect(() => {
    fetchEntries();
  }, []);

  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date_of_symptom) - new Date(a.date_of_symptom))
    .slice(0, 6);

  return (
    <div className="page-container">

      <div className='flex-1 min-w-0'>

        <div className="bg-base-200 rounded-3xl sm:p-8 mb-6">

          <div className="flex justify-between items-center mb-4">

            <div>
              <h1 className="text-xl font-bold text-primary">Dashboard Page</h1>
              <p className="mt-1 text-sm text-gray-600">Overview of your symptom tracking</p>
            </div>
            
          </div>

          {error && <div className="alert alert-error mb-8">{error}</div>}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading loading-spinner loading-lg" />
            </div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <div className='bg-accent/25 p-4 rounded-full mb-4'>
                <HouseHeart className="size-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Welcome to your Dashboard</h3>
              <p className="text-base-content/60">
                Here you can view your recent entries. <br /> Get started by logging your first entry.
              </p>
              <Link to="/entries" className="mt-6 shrink-0">
                <button className="btn btn-accent btn-lg rounded-full">
                  <span className="text-white">Add First Entry</span>
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-6">
                <div className="bg-base-100 rounded-3xl p-4 sm:p-8 shadow-sm min-h-[280px]">
                  <WeeklyTotalEntriesKPICard />
                </div>
                <div className="bg-base-100 rounded-3xl p-4 sm:p-8 shadow-sm min-h-[280px]">
                  <AverageSeverityKPICard />
                </div>
                <div className="bg-base-100 rounded-3xl p-4 sm:p-8 shadow-sm min-h-[280px]">
                  <UniqueSymptomsKPICard />
                </div>
              </div>

              <div className="bg-base-300 rounded-3xl p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-secondary">Recent Entries</h2>
                <p className="mt-1 mb-4 text-sm text-gray-600">
                  Showing your 6 most recent entries. <Link to="/entries" className="link link-primary">View all entries</Link> to manage or edit.
                </p>

                <div className="space-y-3">
                  {recentEntries.map(entry => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default HomePage;