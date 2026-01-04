import { create } from 'zustand';
import axios from 'axios';
import toast from "react-hot-toast";
import { demoSeedData } from '../src/demo-seed-data/demoSeedData.js';
import { DEMO_MODE } from '../src/config/demoConfig.js';
import { applyRollingDates } from '../src/utils/dataProcessing.js';

const BASE_URL = "http://localhost:8000";

// function to get the next available ID for new entries in demo mode
const nextId = (allEntries) => {
  if (allEntries.length === 0) return 1;

  const maxId = Math.max(...allEntries.map(entry => entry.id));
  return maxId + 1;
};

export const useEntriesStore = create((set, get) => ({

  //entries state
  entries: [],
  loading: false,
  error: null,
  currentEntry: null,

  //forms state 
  formData: {
    symptom_name: "",
    icon_name: "DefaultIcon",
    severity: "5",
    notes: "",
    date_of_symptom: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({
    formData: {
      symptom_name: "",
      icon_name: "DefaultIcon",
      severity: "5",
      notes: "",
      date_of_symptom: "",
    }
  }),

  sortEntriesByDate: (entries) => {
    return [...entries].sort((a, b) => new Date(b.date_of_symptom) - new Date(a.date_of_symptom));
  },

  addEntry: async (e) => {
    e.preventDefault();
    set({ loading: true });

    if (DEMO_MODE) {
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
      document.getElementById("add_entry_modal").close();

      return;
    }

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/entries`, formData);
      await get().fetchEntries();
      get().resetForm();
      toast.success("Entry added successfully");
      document.getElementById("add_entry_modal").close();
    } catch (error) {
      console.log("Error in addEntry function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchEntries: async () => {
    set({ loading: true });

    if (DEMO_MODE) {
      const currentEntries = get().entries;
      if (currentEntries.length === 0) {
        const demoDataWithRollingDates = applyRollingDates(demoSeedData);

        const entriesWithIds = demoDataWithRollingDates.map((seedEntry, index) => ({
          id: index + 1,
          ...seedEntry,
          created_at: new Date().toISOString(),
        }));

        const sortedEntries = get().sortEntriesByDate(entriesWithIds);
        set({ entries: sortedEntries, loading: false, error: null });
      } else {
        set({ loading: false, error: null });
      }

      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/entries`)
      const sortedEntries = get().sortEntriesByDate(response.data.data);
      set({ entries: sortedEntries, error: null });
    } catch (err) {
      set({ error: "Something went wrong", entries: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateEntry: async (id) => {
    set({ loading: true });

    if (DEMO_MODE) {
      const { formData, entries } = get();
      const targetId = Number(id);
      const updatedEntries = entries.map(entry =>
        Number(entry.id) === targetId
          ? { ...entry, ...formData, severity: Number(formData.severity) }
          : entry
      );
      const sortedEntries = get().sortEntriesByDate(updatedEntries);
      const updatedEntry = updatedEntries.find(entry => Number(entry.id) === targetId);
      set({ entries: sortedEntries, currentEntry: updatedEntry, loading: false });
      get().resetForm();
      toast.success("Entry updated successfully!");
      return;
    }

    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/entries/${id}`, formData);
      set({ currentEntry: response.data.data });
      toast.success("Entry updated successfully!");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateEntry function", error);
    } finally {
      set({ loading: false });
    }
  },

  deleteEntry: async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    set({ loading: true });

    if (DEMO_MODE) {
      const targetId = Number(id);
      const updatedEntries = get().entries.filter(entry => Number(entry.id) !== targetId);
      set({ entries: updatedEntries, loading: false });
      toast.success("Entry deleted successfully!");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/entries/${id}`);
      set(prev => ({
        entries: prev.entries.filter(entry => Number(entry.id) !== Number(id)) 
      }));
      toast.success("Entry deleted successfully!")
    } catch (error) {
      console.log("Error in deleteEntry function", error)
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchEntry: async (id) => {
    set({ loading: true });

    if (DEMO_MODE) {
      const targetId = Number(id);
      const entry = get().entries.find(entry => Number(entry.id) === targetId);
      if (entry) {
        set({ currentEntry: entry, error: null, loading: false });
      } else {
        set({ error: "Entry not found", currentEntry: null, loading: false });
      }
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/entries/${id}`);
      set({
        currentEntry: response.data.data,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchEntry function", error);
      set({ error: "Something went wrong", currentEntry: null });
    } finally {
      set({ loading: false });
    }
  },

}));