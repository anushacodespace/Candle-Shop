"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const loadCart = useCartStore((s) => s.loadCart);
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/shop");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || {};

    const foundUser = users[form.email];

    if (!foundUser || foundUser.password !== form.password) {
      alert("Invalid email or password");
      return;
    }

    login({
      email: foundUser.email,
      name: foundUser.name,
    });

    loadCart(foundUser.email);
    router.push("/shop");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={3} align="center">
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>

        <Typography align="center" mt={2}>
          Don’t have an account?{" "}
          <Button onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
