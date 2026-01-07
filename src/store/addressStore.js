import { create } from "zustand";

export const useAddressStore = create((set, get) => ({
  addresses: [],

  loadAddresses: (email) => {
    const saved = localStorage.getItem(`addr_${email}`);
    set({ addresses: saved ? JSON.parse(saved) : [] });
  },

  addAddress: (email, address) => {
    const updated = [...get().addresses, address];
    set({ addresses: updated });
    localStorage.setItem(`addr_${email}`, JSON.stringify(updated));
  }
}));
