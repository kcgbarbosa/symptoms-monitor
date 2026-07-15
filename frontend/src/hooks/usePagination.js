import { useMemo, useState } from 'react';

export function usePagination(items, pageSize) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);

  const pageItems = useMemo(() => {
    const start = currentPage * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const goToPrevious = () => {
    if (canGoPrevious) {
      setPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setPage(currentPage + 1);
    }
  };

  return {
    pageItems,
    currentPage,
    totalPages,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
  };
}
