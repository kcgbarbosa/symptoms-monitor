import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function KPICard({ className, children, ...props }) {
  return (
    <Card className={cn('gap-4 px-6', className)} {...props}>
      {children}
    </Card>
  );
}

export function KPICardHeader({ label, children, className }) {
  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </h3>
      {children}
    </div>
  );
}
