import EntryCardContent from './EntryCardContent';

function EntryTimeline({ entries }) {
  return (
    <div className="relative space-y-6 border-l border-border pl-6">
      {entries.map((entry) => (
        <div key={entry.id} className="group relative">
          <span className="absolute top-1/2 left-[-1.65rem] size-3 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background transition-colors" />
          <div className="-mx-2 -my-2 rounded-lg p-2 transition-colors group-hover:bg-muted/40">
            <EntryCardContent entry={entry} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EntryTimeline;
