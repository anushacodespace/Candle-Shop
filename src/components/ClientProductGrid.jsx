
"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "./ProductCard";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function ClientProductGrid({ products }) {
  function handleAdd(product) {
    const cart = loadCart();
    const idx = cart.findIndex((c) => c._id === product._id);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ ...product, qty: 1 });
    saveCart(cart);
    alert(`${product.name} added to cart (qty: ${cart.find(c => c._id === product._id).qty})`);
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {products && products.length ? (
          products.map((p) => (
            <Grid item key={p._id} xs={12} sm={6} md={4}>
              <ProductCard product={p} onAdd={handleAdd} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <div style={{ color: "#666" }}>No products found.</div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
