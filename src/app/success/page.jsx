"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import AuthGuard from "@/components/AuthGuard";

export default function SuccessPage() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);
  const shippingAddress = useCartStore((s) => s.shippingAddress);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);

  const [orderItems] = useState(cart);
  const [orderTotal] = useState(
    cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  useEffect(() => {
    if (cart.length > 0) clearCart();
  }, []);

  return (
    <AuthGuard>
      <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
        <Typography variant="h4">🎉 Order Placed Successfully</Typography>

        <Typography sx={{ mb: 2 }}>
          Thank you{user ? `, ${user.name}` : ""}!
        </Typography>

        {orderItems.map((item) => (
          <Card key={item._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography fontWeight={600}>{item.name}</Typography>
              <Typography>₹{item.price} × {item.quantity}</Typography>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6">Total Paid: ₹{orderTotal}</Typography>

        <Button sx={{ mt: 4 }} onClick={() => router.push("/shop")}>
          Continue Shopping
        </Button>
      </Box>
    </AuthGuard>
  );
}
