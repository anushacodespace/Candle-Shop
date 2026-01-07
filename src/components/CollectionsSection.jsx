"use client";

import { Box, Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const shopLinks = [
  { label: "Shop All", path: "/shop" },
  { label: "By Type", path: "/shop?view=type" },
  { label: "By Scent", path: "/shop?view=scent" },
  { label: "By Occasion", path: "/shop?view=occasion" },
  { label: "By Purpose", path: "/shop?view=purpose" },
  { label: "Gifts & Combos", path: "/shop?view=gifts" },
  { label: "Accessories", path: "/shop?view=accessories" },
  { label: "Offers", path: "/shop?view=offers" },
];

export default function CollectionsSection() {
  const router = useRouter();

  return (
    <Box sx={{ mt: 6 }}>
      <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 2 }}>
        Collections
      </Typography>

      {/* SHOP NAV STRIP */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          background: "#f7f7fc",
        }}
      >
        {shopLinks.map((link) => (
          <Button
            key={link.label}
            size="small"
            onClick={() => router.push(link.path)}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            {link.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
