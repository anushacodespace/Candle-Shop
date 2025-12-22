"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box
} from "@mui/material";

export default function AdminProducts() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    category: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Product added!");
      setForm({
        name: "",
        slug: "",
        price: "",
        description: "",
        image: "",
        stock: "",
        category: ""
      });
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin – Add Product
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Slug" name="slug" value={form.slug} onChange={handleChange} />
        <TextField label="Price" name="price" value={form.price} onChange={handleChange} />
        <TextField label="Stock" name="stock" value={form.stock} onChange={handleChange} />
        <TextField label="Image (/images/x.jpg)" name="image" value={form.image} onChange={handleChange} />
        <TextField label="Category" name="category" value={form.category} onChange={handleChange} />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Add Product
        </Button>
      </Box>
    </Container>
  );
}
