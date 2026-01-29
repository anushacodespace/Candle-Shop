"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

export default function PromoPopup() {
    const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  
 useEffect(() => {
    setMounted(true);

    const alreadySeen = sessionStorage.getItem("promoSeen");
    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);                                // ⏳ 5-second delay

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 18,
        left: 18,
        height: 210,
        width: 200,                 // ⬅️ smaller width
        borderRadius: 3,
        background: "#111",
        color: "#fff",
        p: 1.5,                   
        pointerEvents: "auto",   // ⬅️ reduced padding
        boxShadow: "0 12px 28px rgba(0,0,0,.35)",
        zIndex: 3000,
      }}
    >
      {/* Close Button */}
      <IconButton
        size="small"
        onClick={() => {
          sessionStorage.setItem("promoSeen", "true");
          setOpen(false);
        }}
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          color: "#fff",
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* Tag */}
      <Box
        sx={{
          background: "#ffc400",
          color: "#111",
          fontSize: 10,
          fontWeight: 700,
          px: 1,
          py: 0.3,
          borderRadius: 10,
          display: "inline-block",
          mb: 0.8,
        }}
      >
        LIMITED OFFER
      </Box>

      {/* Title */}
      <Typography
        sx={{
          background: "#ff4d6a",
          fontWeight: 700,
          textAlign: "center",
          py: 0.5,
          borderRadius: 1,
          fontSize: 13,
          mb: 1.2,
        }}
      >
        BLACK FRIDAY SALE
      </Typography>

      {/* Big Discount */}
      <Typography
        sx={{
          fontSize: 22,            // ⬅️ reduced
          fontWeight: 900,
          textAlign: "center",
          mb: 0.5,
        }}
      >
        10% OFF
      </Typography>

      <Box
        sx={{
          border: "1.5px solid #ffc400",
          color: "#ffc400",
          textAlign: "center",
          py: 0.3,
          borderRadius: 20,
          fontWeight: 700,
          fontSize: 11,
          mb: 1,
        }}
      >
        +1 FREE MONTH
      </Box>

      {/* Description */}
      <Typography sx={{ textAlign: "center", fontSize: 12, mb: 1 }}>
        Biggest sale of the year.
      </Typography>

      {/* CTA */}
    <Button
  onClick={() => {
    sessionStorage.setItem("promoSeen", "true");
    setOpen(false);
    router.replace("/offers");
  }}
  sx={{
    background: "#ff1766",
    color: "white",
    fontWeight: 700,
    textTransform: "none",
    px: 3,
    borderRadius: "20px",
    width: "100%",
    "&:hover": { background: "#e01459" },
  }}
>
  Grab Deal
</Button>

    </Box>
  );
}
