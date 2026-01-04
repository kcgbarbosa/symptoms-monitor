export const SEVERITY_THRESHOLDS = {
  SEVERE: 8,
  MODERATE: 5
};

export const getSeverityLevel = (severity) => {
  const numSev = Number(severity);

  if (numSev >= SEVERITY_THRESHOLDS.SEVERE)
    return 'severe';

  if (numSev >= SEVERITY_THRESHOLDS.MODERATE)
    return 'moderate';

  return 'mild';
};

export const SEVERITY_COLORS = {
  severe: {
    pill: 'bg-red-50 border-red-200 text-red-700',
    dot: 'bg-red-500',
    text: 'text-red-600',
    range: 'range-error',
    progress: 'progress-error',
    trendBadge: 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-900',
    trendBadgeIcon: 'bg-red-500'
  },
  moderate: {
    pill: 'bg-amber-50 border-amber-200 text-amber-700',
    dot: 'bg-amber-500',
    text: 'text-amber-600',
    range: 'range-warning',
    progress: 'progress-warning',
    trendBadge: 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 text-amber-900',
    trendBadgeIcon: 'bg-amber-500'
  },
  mild: {
    pill: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    dot: 'bg-emerald-500',
    text: 'text-emerald-600',
    progress: 'progress-success',
    range: 'range-success',
    trendBadge: 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 text-emerald-900',
    trendBadgeIcon: 'bg-emerald-500'
  }
};