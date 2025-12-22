"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartHydrator() {
  const hydrate = useCartStore(state => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
