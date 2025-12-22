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

  // ✅ SNAPSHOT ORDER DATA ON FIRST RENDER
  const [orderItems] = useState(cart);
  const [orderTotal] = useState(
    cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  );

  // ✅ Clear cart AFTER snapshot
  useEffect(() => {
    if (cart.length > 0) {
      clearCart();
    }
  }, []); // run once

  return (
    <AuthGuard>
      <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          🎉 Order Placed Successfully
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Thank you{user ? `, ${user.name}` : ""}! Your order has been placed.
        </Typography>

        {/* 🧾 ORDER SUMMARY */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Order Summary
        </Typography>

        {orderItems.map((item) => (
          <Card key={item._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography fontWeight={600}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{item.price} × {item.quantity}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                ₹{item.price * item.quantity}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* 📦 SHIPPING ADDRESS */}
        {shippingAddress && (
          <>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Shipping Address
            </Typography>

            <Typography>{shippingAddress.name}</Typography>
            <Typography>{shippingAddress.address}</Typography>
            <Typography>
              {shippingAddress.city}, {shippingAddress.state} –{" "}
              {shippingAddress.pincode}
            </Typography>
            <Typography>
              Phone: {shippingAddress.phone}
            </Typography>

            <Divider sx={{ my: 3 }} />
          </>
        )}

        {/* 💰 TOTAL */}
        <Typography variant="h6">
          Total Paid: ₹{orderTotal}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => router.push("/shop")}
        >
          Continue Shopping
        </Button>
      </Box>
    </AuthGuard>
  );
}
