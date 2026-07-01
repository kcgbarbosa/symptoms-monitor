import { supabase } from '../src/config/supabase'
import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  session: null,
  loading: true,

  initAuth: () => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      set({ session: session, loading: false });
    });
    return data.subscription;
  },

  signOut: async () => {
    set({ loading: true });
    const data = await supabase.auth.signOut();
    set({ session: null, loading: false });
  }
}));