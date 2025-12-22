"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShopClient({ products }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ IMPORTANT FIX
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ✅ MUST BE FIRST RETURN
  if (status === "loading") {
    return null;
  }

  // ✅ AFTER loading check
  if (!session) {
    return null;
  }

  return (
    <div>
      {/* shop UI */}
    </div>
  );
}
