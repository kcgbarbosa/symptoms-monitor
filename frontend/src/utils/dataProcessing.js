// #region Date Formatting Helpers
// ---------------------------------------------------------

const toYMD = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

export function formatDateForInput(entry) {
  if (!entry?.date_of_symptom) return '';

  if (typeof entry.date_of_symptom === 'string' && entry.date_of_symptom.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return entry.date_of_symptom;
  }

  return toYMD(entry.date_of_symptom);
}

export function formatDateForDisplay(entry) {
  if (!entry?.date_of_symptom) return '';

  const [year, month, day] = entry.date_of_symptom.split('-');
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function groupEntriesByDate(entries) {
  const grouped = [];
  entries.forEach((entry) => {
    const date = toYMD(entry.date_of_symptom);
    const existingDay = grouped.find(day => day.date === date);

    if (existingDay) {
      existingDay[entry.symptom_name] = (existingDay[entry.symptom_name] || 0) + 1;
    } else {
      grouped.push({ 
        date: date, 
        [entry.symptom_name]: 1,
        icon_name: entry.icon_name 
      });
    }
  });
  return grouped;
}

function getLast7Days() {
  const last7days = [];
  const today = new Date(); 
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    last7days.push(toYMD(d));
  }

  return last7days;
}

export function dateFromDaysAgo(daysAgo) {
  const today = new Date();          
  today.setHours(0, 0, 0, 0);      
  today.setDate(today.getDate() - daysAgo); 
  return today.toISOString().split("T")[0]; 
}

export function applyRollingDates(entries) {
  return entries.map(entry => {
    const dateOfSymptom = entry._seedDaysAgo !== undefined
      ? dateFromDaysAgo(entry._seedDaysAgo)
      : entry.date_of_symptom || dateFromDaysAgo(0); 

    return {
      ...entry,                 
      date_of_symptom: dateOfSymptom
    };
  });
}
// #endregion


// #region Card Calculation Functions
// ---------------------------------------------------------

export function calcWeeklyEntries(entries) {
  const last7days = getLast7Days();
  return entries.filter(entry => {
    const entryDate = toYMD(entry.date_of_symptom);
    return last7days.includes(entryDate);
  }).length;
}

export function calcWeeklySeverityTrend(entries) {
  const last7days = getLast7Days();
  const previous7days = last7days.map(date => {
    const d = new Date(date);
    d.setDate(d.getDate() - 7);
    return toYMD(d);
  });

  const currentWeekEntries = entries.filter(entry => {
    const entryDate = toYMD(entry.date_of_symptom);
    return last7days.includes(entryDate);
  });

  const previousWeekEntries = entries.filter(entry => {
    const entryDate = toYMD(entry.date_of_symptom);
    return previous7days.includes(entryDate);
  });

  const currentAvg = currentWeekEntries.length > 0
    ? currentWeekEntries.reduce((sum, e) => sum + e.severity, 0) / currentWeekEntries.length
    : 0;

  const previousAvg = previousWeekEntries.length > 0
    ? previousWeekEntries.reduce((sum, e) => sum + e.severity, 0) / previousWeekEntries.length
    : 0;

  if (currentWeekEntries.length < 3 || previousWeekEntries.length < 3)
    return {
      direction: 'Insufficient',
      message: 'Insufficient Weekly Data',
      percentChange: null
    };

  const percentChange = ((currentAvg - previousAvg) / previousAvg * 100).toFixed(0);

  if (currentAvg > previousAvg) {
    return {
      direction: 'worsening',
      message: `${percentChange}% vs last week`,
      percentChange: percentChange
    };
  } else if (currentAvg < previousAvg) {
    return {
      direction: 'improving',
      message: `${percentChange}% vs last week`,
      percentChange: percentChange
    };
  } else {
    return {
      direction: 'stable',
      message: `No change vs last week`,
      percentChange: 0
    };
  }
}

export function getMostLoggedSymptomThisWeek(entries) {
  const last7days = getLast7Days();

  const weeklyEntries = entries.filter(entry =>
    last7days.includes(toYMD(entry.date_of_symptom))
  );

  if (weeklyEntries.length === 0) return null;

  const counts = {};
  weeklyEntries.forEach(e => {
    counts[e.symptom_name] = (counts[e.symptom_name] || 0) + 1;
  });

  let topSymptom = null;
  let maxCount = 0;

  for (const symptom in counts) {
    if (counts[symptom] > maxCount) {
      maxCount = counts[symptom];
      topSymptom = symptom;
    }
  }
  return {
    name: topSymptom,
    count: maxCount
  };
}
export function calcTotalAverageSeverity(entries, symptomName = null) {
  if (entries.length === 0) return 0;

  const filteredEntries = symptomName
    ? entries.filter(e => e.symptom_name === symptomName)
    : entries;

  if (filteredEntries.length === 0) return 0;

  const totalSeverity = filteredEntries.reduce((sum, entry) => sum + entry.severity, 0);
  return Number((totalSeverity / filteredEntries.length).toFixed(0));
}

export function getUniqueSymptomNames(entries) {
  const symptoms = [...new Set(entries.map(e => e.symptom_name))];
  return symptoms.sort();
}

export function calcWeeklyAverageSeverity(entries) {
  if (entries.length === 0) return 0;

  const last7days = getLast7Days();
  const weeklyEntries = entries.filter(entry => {
    const entryDate = toYMD(entry.date_of_symptom);
    return last7days.includes(entryDate);
  });

  if (weeklyEntries.length === 0) return 0;

  const totalSeverity = weeklyEntries.reduce((sum, entry) => sum + entry.severity, 0);
  return Number((totalSeverity / weeklyEntries.length).toFixed(0));
}

export function calcEntriesPerSymptomAllTime(entries) {
  const symptomCount = {};
  entries.forEach((entry) => {
    const name = entry.symptom_name;
    symptomCount[name] = (symptomCount[name] || 0) + 1;
  });
  return symptomCount;
}

export function getCorrelationInsight(entries) {
  const totalEntries = entries.length;

  // Tier 3: Need more Data 
  if (totalEntries < 5) {
    return {
      tier: 3,
      message: "Keep tracking! Insights get more accurate as you log more entries.",
    };
  }

  const counts = calcEntriesPerSymptomAllTime(entries);

  const topSymptoms = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  if (topSymptoms.length < 2) {
    return {
      tier: 3,
      message: `You're mostly tracking ${topSymptoms[0]}. Add other symptoms to see connections.`,
    };
  }

  const symptom1 = topSymptoms[0];
  const symptom2 = topSymptoms[1];

  const entriesByDate = {};
  entries.forEach(e => {
    const date = toYMD(e.date_of_symptom);
    if (!entriesByDate[date]) entriesByDate[date] = [];
    entriesByDate[date].push(e.symptom_name);
  });

  let daysTogetherCount = 0;
  Object.values(entriesByDate).forEach(symptomsOnThisDay => {
    if (symptomsOnThisDay.includes(symptom1) && symptomsOnThisDay.includes(symptom2)) {
      daysTogetherCount++;
    }
  });

  // Tier 2: Frequency Insight 
  if (daysTogetherCount < 3) {
    return {
      tier: 2,
      message: `Your most frequent symptoms are ${symptom1} and ${symptom2}.`,
    };
  }

  // Tier 1: Co-occurrence Insight
  const daysWithEitherCount = Object.values(entriesByDate).filter(s =>
    s.includes(symptom1) || s.includes(symptom2)
  ).length;

  const rate = ((daysTogetherCount / daysWithEitherCount) * 100).toFixed(0);
  return {
    tier: 1,
    message: `${symptom1} and ${symptom2} occur together ${rate}% of the time when either is present.`,
    symptom1,
    symptom2
  };
}

// #endregion

export function symptomCountToArr(symptomCount, entries = []) {
  return Object.entries(symptomCount)
    .map(([symptom_name, count]) => {
      const entry = entries.find(e => e.symptom_name === symptom_name);
      return {
        symptom_name,
        count,
        icon_name: entry?.icon_name || 'DefaultIcon'
      };
    });
}