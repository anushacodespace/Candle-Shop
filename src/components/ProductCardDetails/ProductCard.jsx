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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useWishlistStore } from "@/store/wishlistStore";


export default function ProductCard({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [openSnack, setOpenSnack] = useState(false);
  const router = useRouter();
const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
const isWishlisted = useWishlistStore((s) =>
  s.isWishlisted(product._id)
);

  const handleAddToCart = () => {
    addToCart(product);
    setOpenSnack(true);
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
  "&:hover .wishlist-btn": {
  opacity: 1,
  transform: "translateX(0)",
  pointerEvents: "auto",
},

          /* SHOW OVERLAY ONLY ON DESKTOP */
          "@media (hover: hover)": {
            "&:hover .hover-actions": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        {/* IMAGE */}
        <Box sx={{ position: "relative", height: 180 }}>
          <IconButton
  onClick={(e) => {
    e.stopPropagation();
    toggleWishlist(product);
  }}
  sx={{
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.9)",
    display:{xs:"flex", md:"none"},
    "&:hover": {
      backgroundColor: "#fff",
    },
  }}
>
  {isWishlisted ? (
    <FavoriteIcon sx={{ color: "#e91e63" }} />
  ) : (
    <FavoriteBorderIcon />
  )}
</IconButton>

          <Image
            src={product.image || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />

          {/* HOVER OVERLAY (DESKTOP ONLY) */}
          <Box
            className="hover-actions"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              p: 2,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
              opacity: 0,
              transform: "translateY(12px)",
              transition: "0.3s",
            }}
          > {/* DESKTOP ACTIONS (HOVER) */}
<Box
  className="card-actions"
  sx={{
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    gap: 1,
    mt: 1.2,
  }}
>

</Box>

          <Button
  fullWidth
  variant="contained"
  onClick={handleAddToCart}
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6B5FA7",
    textTransform: "none",
    fontWeight: 600,
    px: 2,
  }}
>
  Add to Cart

  <IconButton
    onClick={(e) => {
      e.stopPropagation(); // 👈 IMPORTANT
      toggleWishlist(product);
    }}
    sx={{
      color: isWishlisted ? "#e91e63" : "#fff",
    }}
  >
    {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
  </IconButton>
</Button>


          </Box>
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

          {/* MOBILE BUTTON (ALWAYS VISIBLE) */}
          <Box sx={{ mt: 1, display: { xs: "block", md: "none" } }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddToCart}
              sx={{
                backgroundColor: "#6B5FA7",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* SNACKBAR */}
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
