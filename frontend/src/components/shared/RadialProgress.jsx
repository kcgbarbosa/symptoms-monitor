import { cn } from '@/lib/utils';

const VIEWBOX = 100;
const CENTER = VIEWBOX / 2;

function RadialProgress({
  value,
  max = 10,
  sizeClass = 'size-40 sm:size-44',
  strokeWidth = 9,
  colorClass = 'text-primary',
  trackClass = 'text-muted-foreground/15',
}) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const percentage = Math.max(0, Math.min(100, (safeValue / max) * 100));
  const radius = CENTER - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percentage / 100);

  const displayValue = Number.isInteger(safeValue)
    ? safeValue
    : safeValue.toFixed(1);

  return (
    <div className={cn('relative', sizeClass)}>
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="size-full -rotate-90"
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackClass}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={cn(
            'transition-[stroke-dashoffset] duration-500',
            colorClass
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tighter tabular-nums text-foreground">
          {displayValue}
        </span>
        <span className="text-xs text-muted-foreground">of {max}</span>
      </div>
    </div>
  );
}

export default RadialProgress;
