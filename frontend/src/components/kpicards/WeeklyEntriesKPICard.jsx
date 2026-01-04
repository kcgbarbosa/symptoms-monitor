import { calcWeeklyEntries, getMostLoggedSymptomThisWeek } from '../../utils/dataProcessing';
import { useEntriesStore } from '../../../store/useEntriesStore';
import { CalendarFold, Star } from 'lucide-react';

function WeeklyEntriesKPICard() {
  const { entries } = useEntriesStore();
  const weeklyEntries = calcWeeklyEntries(entries);
  const peakSymptom = getMostLoggedSymptomThisWeek(entries);

  return (
    <div className="flex h-full flex-col relative overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <CalendarFold className="size-5 text-purple-600" strokeWidth={2.5} />
          <h3 className="text-md font-medium text-gray-600 uppercase tracking-wide">This Week</h3>
        </div> 

        <p className="text-base text-gray-500">Total Symptoms Logged</p>
        <p className="text-7xl font-bold text-gray-900 tracking-tighter">
          {weeklyEntries}
        </p>
      </div>

     {peakSymptom && (
        <div className="absolute bottom-0 right-0">
          <div className="inline-flex items-center gap-2 px-4 py-4 border-l border-t border-amber-200 rounded-tl-2xl">
            <div className="flex items-center justify-center size-8 bg-amber-500 rounded-full">
              <Star size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase leading-none text-amber-600">
                Most Tracked
              </span>
              <span className="text-sm font-semibold text-amber-900">
                {peakSymptom.name} ({peakSymptom.count}x)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyEntriesKPICard;