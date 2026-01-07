"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function OffersPage() {
  const router = useRouter();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        🎉 Sale & Special Offers
      </Typography>

      <Typography sx={{ color: "#666", mb: 3 }}>
        Grab exciting discounts on selected candles. Limited time only!
      </Typography>

      {/* Placeholder — later we can show discounted products here */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px dashed #bbb",
          background: "#fafafa",
        }}
      >
        <Typography sx={{ color: "#777" }}>
          Offers coming soon… 🔥  
          (we’ll show discounted candles here later)
        </Typography>
      </Box>

      <Button
        sx={{ mt: 3 }}
        variant="outlined"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
}
