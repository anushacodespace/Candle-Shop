"use client";

import { Box, Typography } from "@mui/material";
import { CATEGORIES, COLLECTIONS, PRICE_BANDS } from "@/config/catalog";


export default function ShopFilters({ onNavigate }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontWeight: 700, mb: 2 }}>By Category</Typography>
{/* BY CATEGORY */}
{CATEGORIES.map((c) => (
  <Typography
    key={c.value}
    onClick={() => onNavigate(`/shop?category=${c.value}`)}
  >
    {c.label}
  </Typography>
))}

   <Typography sx={{ fontWeight: 700, mt: 3, mb: 2 }}>By Collection</Typography>
{/* BY COLLECTION */}
{COLLECTIONS.map((c) => (
  <Typography
    key={c.value}
    onClick={() => onNavigate(`/shop?theme=${c.value}`)}
  >
    {c.label}
  </Typography>
))}


      <Typography sx={{ fontWeight: 700, mt: 3, mb: 2 }}>By Price</Typography>

    {/* BY PRICE */}
{PRICE_BANDS.map((p) => (
  <Typography
    key={p.label}
    onClick={() =>
      onNavigate(`/shop?min=${p.min}&max=${p.max}`)
    }
  >
    {p.label}
  </Typography>
))}

    </Box>
  );
}
