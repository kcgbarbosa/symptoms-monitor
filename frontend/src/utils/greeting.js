const TIME_OF_DAY_GREETINGS = {
  morning: { greeting: "Good morning", prompt: "Ready for the day?" },
  afternoon: { greeting: "Good afternoon", prompt: "How have you been feeling?" },
  evening: { greeting: "Good evening", prompt: "Hope you had a good day." },
};

function getTimeOfDay(hour) {
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

export function getTimeBasedGreeting(date = new Date()) {
  return TIME_OF_DAY_GREETINGS[getTimeOfDay(date.getHours())];
}

export function formatTodayLabel(date = new Date()) {
  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
  const monthDay = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return `${weekday} · ${monthDay}`;
}
