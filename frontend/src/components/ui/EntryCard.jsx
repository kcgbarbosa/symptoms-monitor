import EntryCardContent from './EntryCardContent';
import { Card } from '@/components/ui/card';

function EntryCard({ entry }) {
  return (
    <Card className="gap-0 px-4 py-4 transition-colors hover:bg-muted/40">
      <EntryCardContent entry={entry} />
    </Card>
  );
}

export default EntryCard;
