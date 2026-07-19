import { cn } from '@/lib/utils';

function FilterPills({ pills, onSelect }) {
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {pills.map((pill) => (
          <button
            key={pill.label}
            type="button"
            onClick={() => onSelect(pill.id)}
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              pill.active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {pill.color && (
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: pill.color }}
              />
            )}
            {pill.label}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-card to-transparent" />
    </div>
  );
}

export default FilterPills;
