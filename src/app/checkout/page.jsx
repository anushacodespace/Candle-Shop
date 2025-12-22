"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import AuthGuard from "@/components/AuthGuard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";


export default function CheckoutPage() {
  const router = useRouter();
  const { cart, setShippingAddress, increaseQty, decreaseQty } = useCartStore();


  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all address fields");
      return;
    }

    // ✅ save shipping for success page
    setShippingAddress(form);

    // ✅ mock payment success
    setTimeout(() => {
      router.push("/success?payment_id=mock_payment_123");
    }, 500);
  };

  return (
    <AuthGuard>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Checkout
        </Typography>

        {/* 🛒 CART SUMMARY */}
        {cart.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (cart.map((item) => (
  <Card key={item._id} sx={{ mb: 2 }}>
    <CardContent>
      <Typography fontWeight={600}>
        {item.name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        ₹{item.price} × {item.quantity}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 1,
        }}
      >
        <IconButton
          size="small"
          onClick={() => decreaseQty(item._id)}
        >
          <RemoveIcon />
        </IconButton>

        <Typography>{item.quantity}</Typography>

        <IconButton
          size="small"
          onClick={() => increaseQty(item._id)}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Typography sx={{ mt: 1, fontWeight: 600 }}>
        ₹{item.price * item.quantity}
      </Typography>
    </CardContent>
  </Card>
)))
}

        <Divider sx={{ my: 3 }} />

        {/* 📦 SHIPPING ADDRESS */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shipping Address
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={3}
          value={form.address}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Pincode"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6">
          Subtotal: ₹{subtotal}
        </Typography>

        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handlePayment}
          disabled={cart.length === 0}
        >
          Pay ₹{subtotal}
        </Button>
      </Box>
    </AuthGuard>
  );
}
