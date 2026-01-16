import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  hydrated: false,

  initAuth: () => {
    if (typeof window === "undefined") return;

    const saved = JSON.parse(localStorage.getItem("auth_user"));
    set({ user: saved, hydrated: true });
  },

  login: (user) => {
    localStorage.setItem("auth_user", JSON.stringify(user));

    // 🔑 set cookie for middleware
    document.cookie = `auth_user=true; path=/`;

    set({ user });
  },

  logout: () => {
    localStorage.removeItem("auth_user");

    // 🔑 remove cookie
    document.cookie = `auth_user=; path=/; max-age=0`;

    set({ user: null });
  },
}));
