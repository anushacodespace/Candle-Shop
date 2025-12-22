// src/components/ProductCard.jsx
"use client";

import Image from "next/image";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const cart = useCartStore((s) => s.cart);
console.log(cart);
  return (
    <Card
      sx={{
        height: "100%",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Image wrapper */}
      <Box sx={{ position: "relative", width: "100%", height: 200 }}>
        <Image
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>

        <Typography sx={{ mt: 1, fontWeight: "bold" }}>
          ₹{product.price}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => addToCart({...product, id: product._id,})}
        >
          Add to Cart 
        </Button>
      </CardContent>
    </Card>
  );
}
