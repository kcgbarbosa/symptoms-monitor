import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PaginationControls({
  currentPage,
  totalPages,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        <ChevronLeft />
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage + 1} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!canGoNext}
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  );
}

export default PaginationControls;
