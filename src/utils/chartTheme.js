export function getChartTheme() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name) => styles.getPropertyValue(name).trim();

  const grid = token("--border");
  const tick = token("--muted-foreground");

  return {
    grid,
    tick,
    tooltip: {
      backgroundColor: token("--popover"),
      titleColor: token("--foreground"),
      bodyColor: token("--muted-foreground"),
      borderColor: token("--border"),
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    },
  };
}
