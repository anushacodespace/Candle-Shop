"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated) return null;
  if (!user) return null;

  return children;
}
