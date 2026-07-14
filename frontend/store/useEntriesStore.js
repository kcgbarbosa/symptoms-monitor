import { create } from "zustand";
import toast from "react-hot-toast";
import { demoSeedData } from "../src/demo-seed-data/demoSeedData.js";
import { applyRollingDates } from "../src/utils/dataProcessing.js";
import { supabase } from "../src/config/supabase.js";
import { useAuthStore } from "./useAuthStore.js";

const nextId = (allEntries) => {
  if (allEntries.length === 0) return 1;

  const maxId = Math.max(...allEntries.map((entry) => entry.id));
  return maxId + 1;
};

export const useEntriesStore = create((set, get) => ({
  entries: [],
  loading: false,
  error: null,
  currentEntry: null,
  isModalOpen: false,

  formData: {
    // TODO: Add time 
    symptom_name: "",
    icon_name: "DefaultIcon",
    severity: "5",
    notes: "",
    date_of_symptom: "",
  },

  clearEntries: () => set({ entries: [] }),

  openModal: () => set({ isModalOpen: true }),

  closeModal: () => {
    get().resetForm();
    set({ isModalOpen: false });
  },

  setFormData: (formData) => set({ formData }),

  resetForm: () =>
    set({
      formData: {
        symptom_name: "",
        icon_name: "DefaultIcon",
        severity: "5",
        notes: "",
        date_of_symptom: "",
      },
    }),

  sortEntriesByDate: (entries) => {
    return [...entries].sort(
      (a, b) => new Date(b.date_of_symptom) - new Date(a.date_of_symptom),
    );
  },

  addEntry: async (e) => {
    e.preventDefault();
    set({ loading: true });
    const isDemoMode = useAuthStore.getState().isDemoMode;

    if (isDemoMode) {
      const { formData } = get();

      const newEntry = {
        id: nextId(get().entries),
        ...formData,
        severity: Number(formData.severity),
        created_at: new Date().toISOString(),
      };

      const currentEntries = get().entries;
      const updatedEntries = [newEntry, ...currentEntries];
      const sortedEntries = get().sortEntriesByDate(updatedEntries);

      set({ entries: sortedEntries, loading: false });
      get().resetForm();
      toast.success("Entry added successfully");

      return;
    }

    try {
      const { formData } = get();
      const { session } = useAuthStore.getState();
      if (!session) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from('entries')
        .insert({ ...formData, user_id: session.user.id });
      if (error) throw error;
      await get().fetchEntries();
      get().resetForm();
      toast.success("Entry added successfully");
    } catch (err) {
      console.log("Error in addEntry function", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchEntries: async () => {
    set({ loading: true });
    const isDemoMode = useAuthStore.getState().isDemoMode;

    if (isDemoMode) {
      const currentEntries = get().entries;
      if (currentEntries.length === 0) {
        const demoDataWithRollingDates = applyRollingDates(demoSeedData);

        const entriesWithIds = demoDataWithRollingDates.map(
          (seedEntry, index) => ({
            id: index + 1,
            ...seedEntry,
            created_at: new Date().toISOString(),
          }),
        );

        const sortedEntries = get().sortEntriesByDate(entriesWithIds);
        set({ entries: sortedEntries, loading: false, error: null });
      } else {
        set({ loading: false, error: null });
      }

      return;
    }

    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*');
      if (error) throw error;
      const sortedEntries = get().sortEntriesByDate(data);
      set({ entries: sortedEntries, error: null });
    } catch (err) {
      set({ error: "Something went wrong", entries: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateEntry: async (id) => {
    set({ loading: true });
    const isDemoMode = useAuthStore.getState().isDemoMode;

    if (isDemoMode) {
      const { formData, entries } = get();
      const targetId = Number(id);
      const updatedEntries = entries.map((entry) =>
        Number(entry.id) === targetId
          ? { ...entry, ...formData, severity: Number(formData.severity) }
          : entry,
      );
      const sortedEntries = get().sortEntriesByDate(updatedEntries);
      const updatedEntry = updatedEntries.find(
        (entry) => Number(entry.id) === targetId,
      );
      set({
        entries: sortedEntries,
        currentEntry: updatedEntry,
        loading: false,
      });
      get().resetForm();
      toast.success("Entry updated successfully!");
      return;
    }

    try {
      const { formData } = get();
      const { data, error } = await supabase
        .from('entries')
        .update(formData)
        .eq('id', id);
      if (error) throw error;
      set({ currentEntry: data });
      toast.success("Entry updated successfully!");
    } catch (err) {
      toast.error("Something went wrong");
      console.log("Error in updateEntry function", err);
    } finally {
      set({ loading: false });
    }
  },

  deleteEntry: async (id) => {
    set({ loading: true });
    const isDemoMode = useAuthStore.getState().isDemoMode;

    if (isDemoMode) {
      const targetId = Number(id);
      const updatedEntries = get().entries.filter(
        (entry) => Number(entry.id) !== targetId,
      );
      set({ entries: updatedEntries, loading: false });
      toast.success("Entry deleted successfully!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('entries')
        .delete()
        .eq('id', id);
      if (error) throw error;
      set((prev) => ({
        entries: prev.entries.filter(
          (entry) => Number(entry.id) !== Number(id),
        ),
      }));
      toast.success("Entry deleted successfully!");
    } catch (err) {
      console.log("Error in deleteEntry function", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchEntry: async (id) => {
    set({ loading: true });
    const isDemoMode = useAuthStore.getState().isDemoMode;

    if (isDemoMode) {
      const targetId = Number(id);
      const entry = get().entries.find(
        (entry) => Number(entry.id) === targetId,
      );
      if (entry) {
        set({ currentEntry: entry, error: null, loading: false });
      } else {
        set({ error: "Entry not found", currentEntry: null, loading: false });
      }
      return;
    }

    try {
      const { data, error } = await supabase.from('entries').select('*').eq('id', id);
      if (error) throw error;
      set({
        currentEntry: data[0],
        error: null,
      });
    } catch (err) {
      console.log("Error in fetchEntry function", err);
      set({ error: "Something went wrong", currentEntry: null });
    } finally {
      set({ loading: false });
    }
  },
}));
