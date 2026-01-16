"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [openSnack, setOpenSnack] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product);
    setOpenSnack(true);
  };

  return (
    <>
      <Card
        sx={{
          height: 340,
          display: "flex",
          flexDirection: "column",
          transition: "0.25s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        {/* IMAGE */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 140,
            overflow: "hidden",
          }}
        >
          <Image
            src={product.image || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 100vw, 25vw"
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* CONTENT */}
        <CardContent sx={{ py: 1.2 }}>
          <Typography fontWeight={600}>{product.name}</Typography>

          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <Typography sx={{ mt: 1, fontWeight: 700 }}>
            ₹{product.price}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              mt: 1.2,
              backgroundColor: "#6B5FA7",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#5a4d96",
              },
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      {/* 🔔 MYNTRA STYLE SNACKBAR */}
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.2,
            bgcolor: "#2f2f3a",
            color: "#fff",
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            minWidth: 260,
          }}
        >
          <CheckCircleIcon sx={{ color: "#4ade80" }} />

          <Typography sx={{ flex: 1, fontSize: 14 }}>
            Added to cart
          </Typography>

          <Button
            size="small"
            onClick={() => router.push("/cart")}
            sx={{
              color: "#a78bfa",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            VIEW CART
          </Button>
        </Box>
      </Snackbar>
    </>
  );
}
