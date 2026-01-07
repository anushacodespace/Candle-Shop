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
addToCart: (item) => {
  const exists = get().cart.find(p => p.id === item.id);

  if (exists) {
    exists.quantity++;
    set({ cart: [...get().cart] });
  } else {
    set({ cart: [...get().cart, { ...item, quantity: 1 }] });
  }

  set({ isOpen: true });      // 👈 auto-open cart
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
isOpen: false,

openCart: () => set({ isOpen: true }),
closeCart: () => set({ isOpen: false }),

}));
