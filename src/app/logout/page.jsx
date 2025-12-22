"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function LogoutPage() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const clearCart = useCartStore.getState().clearCart;

    logout();        // clears auth store + localStorage
    clearCart();     // clears cart
    router.replace("/login");
  }, [logout, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">
        Logging you out…
      </Typography>
    </Box>
  );
}
