import { useEntriesStore } from '../../store/useEntriesStore.js'
import AddEntryModal from '../components/ui/AddEntryModal.jsx'
import { useEffect } from 'react';
import { Edit3Icon, HeartOff, Trash2Icon, ListCheck } from "lucide-react";
import { calcEntriesPerSymptomAllTime, symptomCountToArr, formatDateForDisplay, formatDateForInput } from '../utils/dataProcessing.js';
import EntriesPerSymptomAllTimeChart from '../components/charts/TotalEntriesPerSymptomBarChart.jsx';
import IconComponent from '../components/ui/IconComponent.jsx';
import SeverityBadge from '../components/ui/SeverityBadge.jsx';
import { DEMO_MODE } from '../config/demoConfig.js';

function EntriesPage() {

  const { entries, fetchEntries, deleteEntry, setFormData, resetForm, error, loading } = useEntriesStore();

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEdit = (entry) => {
    setFormData({
      ...entry,
      date_of_symptom: formatDateForInput(entry)
    });
    document.getElementById("add_entry_modal").showModal();
  };

  const entriesPerSymptomArr = symptomCountToArr(calcEntriesPerSymptomAllTime(entries), entries);

  return (
    <div className="page-container">

      <div className='flex-1 min-w-0'>

        <div className="mb-6">

          <div className="mb-6">
            <h1 className="text-xl font-bold text-primary m-0">Entries Page</h1>
            <p className="mt-1 text-sm text-gray-600">Track and manage your symptom entries</p>
            {DEMO_MODE && (
              <p className="text-xs text-gray-500 mt-3">
                Demo mode uses temporary local data. Changes reset on refresh.
              </p>
            )}
          </div>

          <AddEntryModal />

        </div>

        {error && <div className="alert alert-error mb-8">{error}</div>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg" />
          </div>

        ) : entries.length === 0 ? (
          <div className='flex flex-col items-center py-16'>
            <div className='bg-accent/25 p-4 rounded-full mb-4'>
              <HeartOff className="size-12 text-primary" />
            </div>
            <h3 className='text-xl font-semibold mb-2'>No entries (yet)</h3>
            <p className='text-base-content/60'>Log your first entry</p>

            <button
              className="btn btn-primary btn-lg mt-4 shrink-0 rounded-full"
              onClick={() => document.getElementById('add_entry_modal').showModal()}
            >
              <span className="text-white">Add New Entry</span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col xl:flex-row gap-8 relative">

              <div className="flex-1 relative min-w-0">

                <div className="lg:absolute -top-14 right-0 mb-4 flex justify-end">
                  <button
                    className="btn btn-primary btn-md shrink-0"
                    onClick={() => {
                      resetForm();
                      document.getElementById('add_entry_modal').showModal()
                    }}
                  >
                    <span className="text-white">Add New Entry</span>
                  </button>
                </div>

                <div className="
              bg-white rounded-xl shadow-sm border border-gray-100 max-h-[750px] overflow-hidden overflow-y-auto
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                  <table className="w-full">
                    <thead className="sticky top-0 z-10 bg-secondary-content text-xs text-secondary ">
                      <tr>
                        <th className="px-3 py-4 font-semibold text-left min-w-[140px]">
                          Symptom
                        </th>
                        <th className="px-3 py-4 font-semibold text-center hidden sm:table-cell w-24">
                          Severity
                        </th>
                        <th className="px-3 py-4 font-semibold text-left w-28 sm:w-32">
                          Date
                        </th>
                        <th className="px-3 py-4 font-semibold text-left hidden md:table-cell min-w-[200px] max-w-xs">
                          Notes
                        </th>
                        <th className="px-3 py-4 font-semibold text-right w-24 sm:w-28">
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {entries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-secondary/10 transition-all group">

                          <td className="px-3 py-5 font-medium text-gray-900 align-middle truncate">
                            <div className="flex items-center gap-2 sm:gap-4">
                              <IconComponent entry={entry} size={20} className="sm:size-6" />
                              <span
                                onClick={() => handleEdit(entry)}
                                className="text-sm hover:cursor-pointer hover:text-secondary max-w-[95px] sm:max-w-[120px] lg:max-w-[150px] truncate block"
                              >
                                {entry.symptom_name}
                              </span>
                              <Edit3Icon className="size-3 opacity-0 group-hover:opacity-60 transition text-primary" />
                            </div>
                          </td>

                          <td className="px-3 py-5 text-center align-middle hidden sm:table-cell">
                            <SeverityBadge severity={entry.severity} />
                          </td>

                          <td className="px-3 py-5 text-gray-700 align-middle text-s">
                            {formatDateForDisplay(entry)}
                          </td>

                          <td className="px-3 py-5 text-gray-700 max-w-xs align-middle hidden md:table-cell truncate">
                            {entry.notes}
                          </td>

                          <td className="px-3 py-5 align-middle">
                            <div className="flex justify-end gap-2 sm:gap-4 min-w-[50px]">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEntry(entry.id);
                                }}
                                className="btn btn-sm opacity-50 group-hover:opacity-50 group-hover:btn-error hover:!opacity-100 transition-all rounded-full"
                              >
                                <Trash2Icon className="size-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full xl:w-1/3 h-fit flex flex-col">
                <div className="bg-base-100 rounded-3xl p-4 sm:p-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-2">
                    <ListCheck className="size-4 text-secondary" />
                    <h2 className="text-lg font-semibold text-secondary uppercase tracking-wide">Entries Per Symptom</h2>
                  </div>
                  <EntriesPerSymptomAllTimeChart data={entriesPerSymptomArr} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

  )
}

export default EntriesPage;