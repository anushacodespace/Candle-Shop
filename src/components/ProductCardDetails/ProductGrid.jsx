"use client";

import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, columns }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: columns,
        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Box>
  );
}
