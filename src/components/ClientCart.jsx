"use client";

import { useCartStore } from "@/store/cartStore";
import { Box, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";

export default function ClientCart() {
  const cart = useCartStore((state) => state.cart);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5">Your cart is empty.</Typography>
        <Button
          component={Link}
          href="/shop"
          variant="contained"
          sx={{ mt: 2 }}
        >
          GO TO SHOP
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3, maxWidth: 800 }}>
      {cart.map((item) => (
        <Box
          key={item._id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            mb: 2,
            border: "1px solid #ddd",
            borderRadius: 1,
          }}
        >
          <Typography>
            {item.name} × {item.quantity}
          </Typography>
          <Typography>
            ₹{item.price * item.quantity}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />

      {/* ✅ TOTAL */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h6">Subtotal</Typography>
        <Typography variant="h6">₹{subtotal}</Typography>
      </Box>

      {/* ✅ PAY BUTTON */}
      <Button
        component={Link}
        href="/checkout"
        variant="contained"
        size="large"
        fullWidth
      >
        PROCEED TO CHECKOUT
      </Button>
    </Box>
  );
}
