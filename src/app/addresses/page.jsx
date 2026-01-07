"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddressStore } from "@/store/addressStore";
import { useAuthStore } from "@/store/authStore";
import { Box, Paper, Button, TextField, Typography } from "@mui/material";

export default function AddressPage() {
  const router = useRouter();
  const user = useAuthStore(s => s.user);
  const { addresses, loadAddresses, addAddress } = useAddressStore();

  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: ""
  });

  useEffect(() => {
    if (user) loadAddresses(user.email);
  }, [user]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Select Delivery Address
      </Typography>

      {/* Show saved addresses */}
      {!showForm && addresses.map((addr, i) => (
        <Paper
          key={i}
          onClick={() => {
            localStorage.setItem(
              `selected_address_${user.email}`,
              JSON.stringify(addr)
            );
            router.push("/checkout");
          }}
          sx={{
            p: 2,
            my: 2,
            cursor: "pointer",
            border: "1px solid #ccc"
          }}
        >
          <Typography fontWeight={600}>{addr.name}</Typography>
          <Typography>{addr.address}</Typography>
          <Typography>{addr.city}, {addr.zip}</Typography>
          <Typography>{addr.phone}</Typography>
        </Paper>
      ))}

      {/* Add new address button */}
      {!showForm && (
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowForm(true)}>
          Add New Address
        </Button>
      )}

      {/* ADD ADDRESS FORM */}
      {showForm && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Address
          </Typography>

          <TextField fullWidth label="Full Name" sx={{ mb: 2 }}
            onChange={e => setForm({ ...form, name: e.target.value })} />

          <TextField fullWidth label="Phone" sx={{ mb: 2 }}
            onChange={e => setForm({ ...form, phone: e.target.value })} />

          <TextField fullWidth label="Address" sx={{ mb: 2 }}
            onChange={e => setForm({ ...form, address: e.target.value })} />

          <TextField fullWidth label="City" sx={{ mb: 2 }}
            onChange={e => setForm({ ...form, city: e.target.value })} />

          <TextField fullWidth label="Postal Code"
            onChange={e => setForm({ ...form, zip: e.target.value })} />

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => {
              addAddress(user.email, form);

              localStorage.setItem(
                `selected_address_${user.email}`,
                JSON.stringify(form)
              );

              setShowForm(false);
              router.push("/checkout");
            }}
          >
            Save Address
          </Button>
        </Box>
      )}
    </Box>
  );
}
