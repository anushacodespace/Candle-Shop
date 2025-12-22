"use client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

export default function ShopClient({ products }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {products.map(p => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
