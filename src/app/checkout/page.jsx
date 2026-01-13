"use client";

import {
  Box,
  TextField,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useAddressStore } from "@/store/addressStore";
import { useRouter } from "next/navigation";


export default function CheckoutPage() {
const router = useRouter();

  const user = useAuthStore(s => s.user);
  const { addresses, loadAddresses, addAddress } = useAddressStore();

  const cart = useCartStore(s => s.cart);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(null);
const [processing, setProcessing] = useState(false);


  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  
 useEffect(() => {
  if (!user) return;

  const saved = localStorage.getItem(
    `selected_address_${user.email}`
  );

  if (saved) setSelectedAddress(JSON.parse(saved));
}, [user]);


  useEffect(() => {
    if (user) {
      loadAddresses(user.email);
    }
  }, [user]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
        gap: { md: 4 },
        bgcolor: "#f6f7fb",
        px: { xs: 2, md: 6 },
        py: { xs: 3, md: 6 },
      }}
    >

      {/* LEFT PANEL */}
      <Box>
        <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 2 }}>

          {/* DELIVERY ADDRESS */}
         <Typography variant="h6" sx={{ mt: 2 }}>
  Delivery Address
</Typography>

{selectedAddress ? (
  <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
    <Typography fontWeight={600}>{selectedAddress.name}</Typography>
    <Typography>{selectedAddress.address}</Typography>
    <Typography>{selectedAddress.city}, {selectedAddress.zip}</Typography>
    <Typography>{selectedAddress.phone}</Typography>

    <Button
      sx={{ mt: 1 }}
      onClick={() => router.push("/addresses")}
    >
      Change delivery address
    </Button>
  </Box>
) : (
  <Button sx={{ mt: 2 }} onClick={() => router.push("/addresses")}>
    Choose delivery address
  </Button>
)}


          {(addresses.length === 0 || showForm) && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                sx={{ mb: 2 }}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <TextField
                fullWidth
                label="Phone"
                sx={{ mb: 2 }}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <TextField
                fullWidth
                label="Address"
                sx={{ mb: 2 }}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="City"
                sx={{ mb: 2 }}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <TextField
                fullWidth
                label="Postal Code"
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
              />

              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() => {
                  addAddress(user.email, form);

localStorage.setItem(
  `selected_address_${user.email}`,
  JSON.stringify(form)
);

                  setSelectedAddress(form);
                  setShowForm(false);
                }}
              >
                Save Address
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 4 }} />

          {/* PAYMENT */}
          <Typography variant="h6">Payment</Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            All transactions are secure and encrypted.
          </Typography>

          {[
            { id: "razorpay", label: "Razorpay (Cards / UPI / Wallets)" },
            { id: "paytm", label: "Paytm Gateway" },
            { id: "cod", label: "Cash on Delivery" },
          ].map((p) => (
            <Box
              key={p.id}
              onClick={() => setPaymentMethod(p.id)}
              sx={{
                border:
                  paymentMethod === p.id
                    ? "2px solid #8f7cf0"
                    : "1px solid #ccc",
                borderRadius: 2,
                p: 2,
                mb: 2,
                cursor: "pointer",
              }}
            >
              <input type="radio" checked={paymentMethod === p.id} readOnly />
              &nbsp; {p.label}
            </Box>
          ))}

          <Button
  variant="contained"
  fullWidth
  disabled={!selectedAddress || !paymentMethod || processing}
  sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
  onClick={() => {
    setProcessing(true);

    // simulate 2-second payment processing
    setTimeout(() => {
      setProcessing(false);
      router.push("/success");
    }, 2000);
  }}
>
  {processing ? "Processing..." : "Pay now"}
</Button>

        </Paper>
      </Box>

{/* RIGHT PANEL — ORDER SUMMARY */}
<Box
  sx={{
    position: { md: "sticky" },
    top: 24,
    alignSelf: "flex-start",
  }}
>
  <Paper
    sx={{
      p: { xs: 3, md: 4 },
      width: "100%",
      maxWidth: 420,
      borderRadius: 3,
      background: "linear-gradient(145deg, #ffffff, #faf7ff)",
      boxShadow:
        "0 18px 28px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04)",
      border: "1px solid rgba(160,140,255,0.18)",
    }}
  >
    <Typography
      variant="h6"
      sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.3 }}
    >
      Order Summary
    </Typography>

    {cart.map((item) => (
      <Box
        key={item.id}
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          gap: 2,
        }}
      >
        <img
          src={item.image}
          width={60}
          height={60}
          style={{ borderRadius: 10 }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography fontWeight={600}>{item.name}</Typography>
          <Typography color="text.secondary">
            Qty: {item.quantity}
          </Typography>
        </Box>

        <Typography fontWeight={600}>
          ₹{item.price * item.quantity}
        </Typography>
      </Box>
    ))}

    <Divider sx={{ my: 2 }} />

    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography>Subtotal</Typography>
      <Typography>₹{subtotal}</Typography>
    </Box>

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 1,
        color: "text.secondary",
      }}
    >
      <Typography>Shipping</Typography>
      <Typography>Calculated at next step</Typography>
    </Box>

    <Divider sx={{ my: 2 }} />

    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography fontWeight={700}>Total</Typography>
      <Typography fontWeight={800} fontSize={20}>
        ₹{subtotal}
      </Typography>
    </Box>

    <Box
      sx={{
        mt: 3,
        p: 1.5,
        borderRadius: 2,
        background: "#f6f3ff",
        border: "1px dashed rgba(130,110,240,0.5)",
        textAlign: "center",
        fontSize: "0.85rem",
      }}
    >
      🎁 Free gift on orders above ₹999
    </Box>
  </Paper>
</Box>

    </Box>
  );
}