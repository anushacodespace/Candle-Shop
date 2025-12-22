import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  initAuth: () => {
    const session = localStorage.getItem("sessionUser");
    if (session) {
      set({ user: JSON.parse(session) });
    }
  },

  login: (userData) => {
    localStorage.setItem(
      "sessionUser",
      JSON.stringify(userData)
    );
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("sessionUser");
    set({ user: null });
  },
}));
