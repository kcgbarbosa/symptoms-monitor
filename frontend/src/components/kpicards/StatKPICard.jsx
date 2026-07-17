import { KPICard, KPICardHeader } from './KPICard';

function StatKPICard({ label, value, valueLabel, caption }) {
  return (
    <KPICard>
      <KPICardHeader label={label} />
      <div className="space-y-1">
        {valueLabel && <p className="text-sm text-muted-foreground">{valueLabel}</p>}
        <p className="text-5xl font-bold tracking-tighter tabular-nums text-foreground">
          {value}
        </p>
      </div>
      {caption != null && (
        <p className="text-xs text-muted-foreground">{caption}</p>
      )}
    </KPICard>
  );
}

export default StatKPICard;
