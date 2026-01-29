"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

export default function WishlistClient() {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const addToCart = useCartStore((s) => s.addToCart);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState("");

  /* 1️⃣ MOVE SINGLE ITEM */
  const moveToCart = (product) => {
    addToCart(product);          // add to cart
    toggleWishlist(product);     // remove from wishlist
    setSnackText("Moved to cart");
    setSnackOpen(true);
  };

  /* 3️⃣ MOVE ALL ITEMS */
  const moveAllToCart = () => {
    wishlist.forEach((p) => addToCart(p));
    wishlist.forEach((p) => toggleWishlist(p));
    setSnackText("All items moved to cart");
    setSnackOpen(true);
  };

  if (wishlist.length === 0) {
    return (
      <Typography sx={{ p: 4 }}>
        Your wishlist is empty ❤️
      </Typography>
    );
  }

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography fontWeight={700} fontSize="1.4rem">
          My Wishlist
        </Typography>

        {/* 3️⃣ MOVE ALL BUTTON */}
        <Button
          variant="outlined"
          onClick={moveAllToCart}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Move all to cart
        </Button>
      </Box>

      {/* GRID */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2,1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(4,1fr)",
          },
        }}
      >
        {wishlist.map((product) => (
          <Box
            key={product._id}
            sx={{
              position: "relative",
              border: "1px solid #eee",
              borderRadius: 2,
              p: 2,
              transition: "0.3s",
              "&:hover .hover-cart": {
                opacity: 1,
                transform: "translateY(0)",
                pointerEvents: "auto",
              },
            }}
          >
            {/* REMOVE FROM WISHLIST */}
            <IconButton
              onClick={() => toggleWishlist(product)}
              sx={{ position: "absolute", top: 6, right: 6 }}
            >
              <FavoriteIcon color="error" />
            </IconButton>

            {/* IMAGE */}
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            <Typography fontWeight={600} sx={{ mt: 1 }}>
              {product.name}
            </Typography>
            <Typography>₹{product.price}</Typography>

            {/* 1️⃣ DESKTOP HOVER */}
            <Box
              className="hover-cart"
              sx={{
                mt: 1,
                opacity: 0,
                transform: "translateY(8px)",
                transition: "0.25s",
                pointerEvents: "none",
                display: { xs: "none", md: "block" },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => moveToCart(product)}
                sx={{
                  backgroundColor: "#6B5FA7",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Move to Cart
              </Button>
            </Box>

            {/* 2️⃣ MOBILE BUTTON */}
            <Box sx={{ mt: 1, display: { xs: "block", md: "none" } }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => moveToCart(product)}
                sx={{
                  backgroundColor: "#6B5FA7",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Move to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* 2️⃣ SNACKBAR */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
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
          }}
        >
          <CheckCircleIcon sx={{ color: "#4ade80" }} />
          <Typography>{snackText}</Typography>
        </Box>
      </Snackbar>
    </>
  );
}
