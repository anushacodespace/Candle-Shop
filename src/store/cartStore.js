import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  userKey: null,
  isOpen: false,

  // 🔐 Load cart (called on app start + login)
  loadCart: (email) => {
  if (!email) return;

  // 🧺 guest cart (before login)
  const guestCart = JSON.parse(
    localStorage.getItem("cart_guest") || "[]"
  );

  // 👤 user cart
  const userCart = JSON.parse(
    localStorage.getItem(`cart_${email}`) || "[]"
  );

  // 🔀 merge logic
  const mergedCart = [...userCart];

  guestCart.forEach((guestItem) => {
    const found = mergedCart.find(
      (i) => i._id === guestItem._id
    );

    if (found) {
      found.quantity += guestItem.quantity;
    } else {
      mergedCart.push(guestItem);
    }
  });

  // 🧹 clear guest cart after merge
  localStorage.removeItem("cart_guest");

  // 💾 save merged cart
  localStorage.setItem(
    `cart_${email}`,
    JSON.stringify(mergedCart)
  );

  set({
    cart: mergedCart,
    userKey: email,
  });
},

  // 💾 Persist cart
 saveCart: () => {
  const { cart, userKey } = get();

  if (userKey) {
    localStorage.setItem(
      `cart_${userKey}`,
      JSON.stringify(cart)
    );
  } else {
    // 👈 guest user
    localStorage.setItem(
      "cart_guest",
      JSON.stringify(cart)
    );
  }
},


  // ➕ Add item
  addToCart: (item) => {
    const cart = get().cart;
    const exists = cart.find((p) => p._id === item._id);

    let updatedCart;
    if (exists) {
      updatedCart = cart.map((p) =>
        p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    set({ cart: updatedCart, isOpen: true });
    get().saveCart();
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((i) => i._id !== id),
    }));
    get().saveCart();
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
          i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),
    }));
    get().saveCart();
  },

  clearCart: () => {
    set({ cart: [] });
    get().saveCart();
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}));
