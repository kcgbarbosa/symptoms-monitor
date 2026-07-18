import { useEffect } from "react";
import { useEntriesStore } from "../../store/useEntriesStore";

export function useFetchEntriesOnMount() {
  const fetchEntries = useEntriesStore((state) => state.fetchEntries);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);
};