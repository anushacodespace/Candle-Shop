"use client";

import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


export default function CollectionsPage() {
    const params = useSearchParams();
    const [products, setProducts] = useState([]);

useEffect(() => {
  async function load() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  load();
}, []);

const category = params.get("category");
const theme = params.get("theme");
const min = params.get("min");
const max = params.get("max");

let filtered = products;


// CATEGORY
if (category) {
  filtered = filtered.filter(p => p.category === category);
}

// COLLECTION
if (theme) {
  filtered = filtered.filter(p => p.collection === theme);
}

// PRICE
if (min || max) {
  filtered = filtered.filter(
    p =>
      p.price >= Number(min || 0) &&
      p.price <= Number(max || 999999)
  );
}

  return (
    
   <Box sx={{ p: 4 }}>

  {/* Breadcrumb */}
  <Box sx={{ mb: 3, display: "flex", gap: 1.5 }}>
    <Typography
      sx={{ color: "#777", cursor: "pointer" }}
      onClick={() => window.location.href = "/"}
    >
      Home
    </Typography>

    <Typography sx={{ color: "#aaa" }}>•</Typography>

  </Box>

  <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
    Shop All
  </Typography>


      {/* GRID */}
      <Box
  sx={{
    display: "grid",
    gridTemplateColumns: "260px 260px 260px",
    columnGap: 6,
  }}
>

        {/* BY CATEGORY */}
<Box>
  <Typography sx={{ fontWeight: 700, mb: 2 }}>
    By Category
  </Typography>

  {[
    { label: "Jar Candles", q: "jar" },
    { label: "Pillar Candles", q: "pillar" },
    { label: "Tealight Candles", q: "tealight" },
    { label: "Votive Candles", q: "votive" },
    { label: "Floating Candles", q: "floating" },
    { label: "Decorative / Designer", q: "decor" },
  ].map((c) => (
    <Typography
      key={c.label}
      sx={{ mb: 1.2, cursor: "pointer", "&:hover": { color: "#7b6cf6" } }}
      onClick={() =>
        window.location.href = `/collections?category=${c.q}`
      }
    >
      {c.label}
    </Typography>
  ))}
</Box>

        {/* BY COLLECTION */}
<Box>
  <Typography sx={{ fontWeight: 700, mb: 2 }}>
    By Collection
  </Typography>

  {[
    { label: "Festive Collection", q: "festive" },
    { label: "Calm Collection", q: "calm" },
    { label: "Decor Collection", q: "decor" },
  ].map((c) => (
    <Typography
      key={c.label}
      sx={{ mb: 1.2, cursor: "pointer", "&:hover": { color: "#7b6cf6" } }}
      onClick={() =>
        window.location.href = `/collections?theme=${c.q}`
      }
    >
      {c.label}
    </Typography>
  ))}
</Box>

        {/* BY PRICE */}
<Box>
  <Typography sx={{ fontWeight: 700, mb: 2 }}>
    By Price
  </Typography>

  {[
    { label: "Under ₹499", min: 0, max: 499 },
    { label: "₹500 – ₹999", min: 500, max: 999 },
    { label: "₹1000 – ₹1999", min: 1000, max: 1999 },
    { label: "Above ₹2000", min: 2000, max: 999999 },
  ].map((p) => (
    <Typography
      key={p.label}
      sx={{ mb: 1.2, cursor: "pointer", "&:hover": { color: "#7b6cf6" } }}
      onClick={() =>
        window.location.href =
          `/collections?min=${p.min}&max=${p.max}`
      }
    >
      {p.label}
    </Typography>
  ))}
</Box>

        {/* PRODUCTS LIST */}
<Box sx={{ mt: 6 }}>
  <Typography sx={{ mb: 2, fontWeight: 700 }}>
    {filtered.length} Products
  </Typography>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 3,
    }}
  >
    {filtered.map(product => (
      <Box
        key={product._id}
        sx={{
          p: 2,
          border: "1px solid #eee",
          borderRadius: 3
        }}
      >
        <img
          src={product.images?.[0]}
          style={{ width: "100%", borderRadius: 12 }}
        />
        <Typography sx={{ mt: 1, fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Typography sx={{ color: "#666" }}>
          ₹{product.price}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>

      </Box>
    </Box>
  );
}
