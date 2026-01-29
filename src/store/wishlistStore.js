import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
  wishlist: [],

  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.find(
        (p) => p._id === product._id
      );

      return {
        wishlist: exists
          ? state.wishlist.filter((p) => p._id !== product._id)
          : [...state.wishlist, product],
      };
    }),

  isWishlisted: (id) =>
    get().wishlist.some((p) => p._id === id),
}))
  
);
