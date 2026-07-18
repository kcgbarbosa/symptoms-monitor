import { useEntriesStore } from '../../store/useEntriesStore';
import { getCorrelationInsight } from '../utils/dataProcessing';
import { cn } from '@/lib/utils';
import { Activity, Lightbulb, Sparkles } from 'lucide-react';

const TIER_CONFIG = {
  1: {
    title: 'Pattern Detected',
    icon: Sparkles,
    surface: 'border-primary/25 bg-primary/5',
    iconSurface: 'bg-primary/10 text-primary',
  },
  2: {
    title: 'Symptom Frequency',
    icon: Activity,
    surface: 'border-border bg-muted/50',
    iconSurface: 'bg-muted text-muted-foreground',
  },
  3: {
    title: 'Getting Started',
    icon: Lightbulb,
    surface: 'border-border bg-muted/30',
    iconSurface: 'bg-muted text-muted-foreground',
  },
};

function SymptomHighlight({ name }) {
  return <span className="font-semibold text-primary">{name}</span>;
}

function InsightMessage({ insight }) {
  if (insight.tier === 1) {
    return (
      <>
        <SymptomHighlight name={insight.symptom1} /> and{' '}
        <SymptomHighlight name={insight.symptom2} /> occur together{' '}
        <span className="font-semibold">{insight.rate}%</span> of the time when
        either is present.
      </>
    );
  }

  if (insight.tier === 2) {
    return (
      <>
        Your most frequent symptoms are{' '}
        <SymptomHighlight name={insight.symptom1} /> and{' '}
        <SymptomHighlight name={insight.symptom2} />.
      </>
    );
  }

  return insight.message;
}

function CorrelationInsight() {
  const { entries } = useEntriesStore();
  const insight = getCorrelationInsight(entries);
  const config = TIER_CONFIG[insight.tier];
  const Icon = config.icon;

  return (
    <section
      className={cn(
        'flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8',
        config.surface
      )}
    >
      <div
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-full',
          config.iconSurface
        )}
      >
        <Icon className="size-6" />
      </div>

      <div className="min-w-0">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {config.title}
        </h2>
        <p className="mt-2 text-lg font-medium leading-snug text-foreground sm:text-2xl">
          <InsightMessage insight={insight} />
        </p>
      </div>
    </section>
  );
}

export default CorrelationInsight;
