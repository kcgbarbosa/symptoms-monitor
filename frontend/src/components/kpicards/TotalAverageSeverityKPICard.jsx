import { calcTotalAverageSeverity, getUniqueSymptomNames } from '../../utils/dataProcessing';
import { useEntriesStore } from '../../../store/useEntriesStore';
import { getSeverityLevel, SEVERITY_COLORS } from '../../utils/severityConstants';
import { Clock, Gauge } from 'lucide-react';
import RadialProgress from '../ui/RadialProgress';
import { useState } from 'react';

function TotalAverageSeverityKPICard() {
  const { entries } = useEntriesStore();
  const symptoms = getUniqueSymptomNames(entries);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const totalAverageSeverity = calcTotalAverageSeverity(entries, selectedSymptom);

  const level = getSeverityLevel(totalAverageSeverity);
  const colors = SEVERITY_COLORS[level];
  return (
    <div className="flex flex-col sm:flex-row h-full gap-6">

      <div className="flex sm:flex-[2] flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-3 mb-2">

          <div className="flex items-center gap-2">
            <Gauge className="size-4 text-primary" />
            <h3 className="text-md font-medium text-base uppercase tracking-wide">
              Baseline Severity
            </h3>
          </div>

          <div className="flex gap-2 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
            <button
              onClick={() => setSelectedSymptom(null)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm border ${selectedSymptom === null
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                }`}
            >
              All
            </button>
            {symptoms.map(symptom => (
              <button
                key={symptom}
                onClick={() => setSelectedSymptom(symptom)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm border ${selectedSymptom === symptom
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                  }`}
              >
                {symptom}
              </button>
            ))}
          </div>

        </div>

        <p className="text-sm text-gray-500 mb-6 italic">
          {selectedSymptom
            ? `Focusing on ${selectedSymptom}`
            : 'Across all of your Symptoms'}
        </p>

        <div className="hidden sm:block mb-auto">
          <p className="text-xs font-medium text-gray-600 mb-2">Severity Scale</p>
          <progress
            className={`progress ${colors.progress} w-3/4 h-2.5 bg-gray-100`}
            max="10"
            value={totalAverageSeverity}
          >
          </progress>
          <div className="flex justify-between w-3/4 text-xs text-gray-400 mt-1 font-mono">
            <span>0</span>
            <span>10</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 sm:mt-6">
          <Clock className="size-3.5" />
          <span>All time average</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <RadialProgress
          value={totalAverageSeverity}
          max={10}
          sizeClass="size-40 sm:size-48"
          thickness="0.75rem"
          colorClass={colors.text}
        />
      </div>

    </div>
  );
}

export default TotalAverageSeverityKPICard;