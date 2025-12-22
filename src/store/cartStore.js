import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  userKey: null,

  // 📦 SHIPPING ADDRESS (✅ ADD)
  shippingAddress: null,

  // 🔐 Load cart for logged-in user
  loadCart: (email) => {
    const saved = localStorage.getItem(`cart_${email}`);
    set({
      cart: saved ? JSON.parse(saved) : [],
      userKey: email,
    });
  },

  // 💾 Save cart for current user
  saveCart: () => {
    const { cart, userKey } = get();
    if (userKey) {
      localStorage.setItem(
        `cart_${userKey}`,
        JSON.stringify(cart)
      );
    }
  },

  // ➕ Add item
  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find(
        (i) => i._id === product._id
      );

      const updatedCart = existing
        ? state.cart.map((i) =>
            i._id === product._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.cart, { ...product, quantity: 1 }];

      return { cart: updatedCart };
    });

    get().saveCart();
  },

  // 🗑 Remove item
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((i) => i._id !== id),
    }));
    get().saveCart();
  },

  // 🧹 Clear cart
  clearCart: () => {
    set({ cart: [] });
    get().saveCart();
  },

  // ✅ SET SHIPPING ADDRESS (ADD THIS)
  setShippingAddress: (address) => {
    set({ shippingAddress: address });
  },
  increaseQty: (id) => {
  set((state) => ({
    cart: state.cart.map((i) =>
      i._id === id ? { ...i, quantity: i.quantity + 1 } : i
    ),
  }));
  get().saveCart();
},

decreaseQty: (id) => {
  set((state) => ({
    cart: state.cart
      .map((i) =>
        i._id === id
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter((i) => i.quantity > 0),
  }));
  get().saveCart();
},

}));
