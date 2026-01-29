"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ProductCard from "./ProductCard";
import MobileScrollableCards from "./MobileScrollableCards";

export default function ThemedProductSection({ title, category }) {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.filter((p) => p.category === category));
    }
    load();
  }, [category]);

  const visibleProducts = showAll ? products : products.slice(0, 3);

  return (
    <Box sx={{ mt: 6 }}>
     <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 3,
  }}
>
  <Typography variant="h5" fontWeight={700}>
    {title}
  </Typography>

  {/* VIEW MORE / LESS BUTTON */}
  {products.length > 3 && (
    <Button
      onClick={() => setShowAll((v) => !v)}
      endIcon={<KeyboardArrowRightIcon />}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        color: "#6B5FA7",
        "&:hover": {
          background: "rgba(107,95,167,0.08)",
        },
      }}
    >
      {showAll ? "View Less" : "View More"}
    </Button>
  )}
</Box>


      {/* 📱 MOBILE → HORIZONTAL SCROLL */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileScrollableCards products={visibleProducts} />
      </Box>

      {/* 🖥️ DESKTOP → GRID */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Grid container spacing={3}>
          {visibleProducts.map((p) => (
            <Grid key={p._id} item md={3}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
