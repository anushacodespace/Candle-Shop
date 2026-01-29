"use client";

import {
  Box,
  Typography,
  Button,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import ClientProductGrid from "../ProductCardDetails/ClientProductGrid";
import ShopFilters from "./ShopFilters";

export default function ShopClient({ products }) {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [filterOpen, setFilterOpen] = useState(false);

  const params = useSearchParams();
  const router = useRouter();

  const category = params.get("category");
  const theme = params.get("theme");
  const min = params.get("min");
  const max = params.get("max");

  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (theme) {
    filtered = filtered.filter((p) => p.collection === theme);
  }

  if (min || max) {
    filtered = filtered.filter(
      (p) =>
        p.price >= Number(min || 0) &&
        p.price <= Number(max || Infinity)
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {/* DESKTOP FILTER */}
      {isDesktop && (
        <Box sx={{ width: 260 }}>
          <ShopFilters onNavigate={(url) => router.push(url)} />
        </Box>
      )}

      {/* PRODUCTS */}
      <Box sx={{ flex: 1 }}>
    {!isDesktop && (
  <Box
    sx={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      mb: 2,
      py: 1.5,
      borderBottom: "1px solid #eee",
    }}
  >
    {/* LEFT: FILTER BUTTON */}
    <Button
      variant="outlined"
      size="small"
      onClick={() => setFilterOpen(true)}
      sx={{ zIndex: 1 }}
    >
      Filters
    </Button>

    {/* CENTER: TITLE + COUNT */}
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "baseline",
        gap: 1,
        pointerEvents: "none",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          letterSpacing: "0.08em",
          fontSize: 14,
          color: "#111",
          textTransform: "uppercase",
        }}
      >
        All Products
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          color: "#777",
          whiteSpace: "nowrap",
        }}
      >
        {filtered.length} products
      </Typography>
    </Box>
  </Box>
)}

        <ClientProductGrid products={filtered} />
      </Box>

      {/* MOBILE FILTER DRAWER */}
      {!isDesktop && (
        <Drawer
          anchor="bottom"
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
        >
          <ShopFilters
            onNavigate={(url) => {
              router.push(url);
              setFilterOpen(false);
            }}
          />
        </Drawer>
      )}
    </Box>
  );
}
