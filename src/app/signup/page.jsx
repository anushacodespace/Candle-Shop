"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";


export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
const loadCart = useCartStore((s) => s.loadCart);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const users =
    JSON.parse(localStorage.getItem("users")) || {};

  if (users[form.email]) {
    alert("User already exists. Please login.");
    return;
  }

  // save user
  users[form.email] = form;
  localStorage.setItem("users", JSON.stringify(users));

  // create session
  localStorage.setItem(
    "sessionUser",
    JSON.stringify({
      email: form.email,
      name: form.name,
    })
  );

  loadCart(form.email);
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
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />

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
            Sign Up
          </Button>
        </form>

        <Typography align="center" mt={2}>
          Already have an account?{" "}
          <Button
            variant="text"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
