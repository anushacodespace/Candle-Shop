"use client";

import ClientCart from "@/components/ClientCart";
import AuthGuard from "@/components/AuthGuard";

export default function CartPage() {
  return (
    <AuthGuard>
      <main style={{ paddingTop: 28 }}>
        <h1 style={{ paddingLeft: 24 }}>Cart</h1>
        <ClientCart />
      </main>
    </AuthGuard>
  );
}
