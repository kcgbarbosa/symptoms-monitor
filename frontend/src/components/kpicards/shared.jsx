import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function KPICard({ className, children, ...props }) {
  return (
    <Card className={cn('gap-4 px-6', className)} {...props}>
      {children}
    </Card>
  );
}

export function KPICardHeader({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </h3>
      {children}
    </div>
  );
}

export function KPICardStat({ value, label }) {
  return (
    <div className="space-y-1">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <p className="text-5xl font-bold tracking-tighter tabular-nums text-foreground">
        {value}
      </p>
    </div>
  );
}

export function KPICardMeta({ children }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}
