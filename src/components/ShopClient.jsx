"use client";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

export default function ShopClient({ products }) {
  return (
   <Container maxWidth="lg" sx={{ py: 4 }}>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr 1fr",
        sm: "1fr 1fr",
        md: "repeat(4, 1fr)",
      },
      gap: 3,
    }}
  >
    {products?.map((p) => (
      <ProductCard key={p._id} product={p} />
    ))}
  </Box>
</Container>

  );
}
