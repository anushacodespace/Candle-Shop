"use client";

import Image from "next/image";
import { Card, CardContent, Box, Typography, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ ...product, id: product._id });

    setAdded(true);

    // Hide message after 3 seconds
    setTimeout(() => setAdded(false), 3000);
  };

  return (
   <Card
  sx={{
    height: 340,
    display: "flex",
    flexDirection: "column",
    transition: "0.2s",
    "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
  }}
>

    <Box
  sx={{
    position: "relative",
    width: "100%",
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  }}
>

        <Image
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          style={{ objectFit: "cover" , height: "100%", }}
        />
      </Box>

      <CardContent sx={{ py:1.2}}>
        <Typography variant="h6">{product.name}</Typography>

        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>

        <Typography sx={{ mt: 1, fontWeight: "bold" }}>
          ₹{product.price}
        </Typography>

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleAdd}>
          Add to Cart
        </Button>

      </CardContent>
    </Card>
  );
}
