"use client";

import { useEffect, useState } from "react";

export default function CartCount() {
  const [count, setCount] = useState(0);

  function updateCount() {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      setCount(totalQty);
    } catch {
      setCount(0);
    }
  }

  useEffect(() => {
    updateCount();

    // Listen for cart updates
    window.addEventListener("storage", updateCount);
    window.addEventListener("cart-updated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cart-updated", updateCount);
    };
  }, []);

  return <span>({count})</span>;
}
