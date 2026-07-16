export const SEVERITY_THRESHOLDS = {
  SEVERE: 8,
  MODERATE: 5,
};

export const getSeverityLevel = (severity) => {
  const numSev = Number(severity);

  if (numSev >= SEVERITY_THRESHOLDS.SEVERE) return "severe";

  if (numSev >= SEVERITY_THRESHOLDS.MODERATE) return "moderate";

  return "mild";
};

export const SEVERITY_COLORS = {
  severe: {
    label: "Severe",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
    pill: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/25",
    track: "text-red-500/15",
  },
  moderate: {
    label: "Moderate",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
    pill: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
    track: "text-amber-500/15",
  },
  mild: {
    label: "Mild",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
    track: "text-emerald-500/15",
  },
};
