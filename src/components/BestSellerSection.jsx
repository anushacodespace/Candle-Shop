"use client";

import { Typography, Grid , Box} from "@mui/material";
import ProductCard from "./ProductCardDetails/ProductCard";
import { useEffect, useState } from "react";

export default function BestSellerSection({ title}) {
  const[products, setProducts] = useState([]);

   useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.filter(p => p.category === "fesival candles"));
    }
    load();
  }, []);
console.log("Got products:", products);

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mt: 4, mb: 2 }}
      >
        {title}
      </Typography>

      <Grid container spacing={2}>
        {products.slice(0, 4).map((p) => (
          <Grid item xs={12} sm={6} md={3} key={p._id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
