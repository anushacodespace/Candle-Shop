"use client";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, PRICE_BANDS } from "@/config/catalog";

export default function ShopPage() {
  const router = useRouter();
  const params = useSearchParams();

  /* ================= URL PARAMS ================= */
  const category = params.get("category");
  const min = params.get("min");
  const max = params.get("max");
  const sort = params.get("sort") || "newest";

  /* ================= STATE ================= */
  const [products, setProducts] = useState([]);

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    let active = true;

    (async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (active) setProducts(data);
    })();

    return () => {
      active = false;
    };
  }, []);

  /* ================= CATEGORY LABEL ================= */
  const categoryLabel = useMemo(() => {
    if (!category) return "Shop All Candles";
    const found = CATEGORIES.find(c => c.value === category);
    return found ? found.label : "Shop All Candles";
  }, [category]);

  /* ================= FILTER + SORT ================= */
  const filtered = useMemo(() => {
    let list = [...products];

    if (category) {
      list = list.filter(p => p.category === category);
    }

    if (min || max) {
      list = list.filter(
        p =>
          p.price >= Number(min || 0) &&
          p.price <= Number(max || 999999)
      );
    }

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      list.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return list;
  }, [products, category, min, max, sort]);

  /* ================= HELPERS ================= */
  const push = (qs = "") => router.push(`/shop${qs}`);

  const updateSort = (value) => {
    const search = new URLSearchParams(params.toString());
    search.set("sort", value);
    router.push(`/shop?${search.toString()}`);
  };

  /* ================= FILTER ITEM ================= */
  const FilterItem = ({ label, active, onClick }) => (
    <ListItemButton
      onClick={onClick}
      selected={active}
      sx={{
        borderRadius: 1,
        mb: 0.5,
        px: 1.5,
        "&:hover": {
          backgroundColor: "#f2efff",
          color: "#6B5FA7",
        },
        "&.Mui-selected": {
          backgroundColor: "#e6e1ff",
          color: "#4B2E83",
          fontWeight: 600,
        },
      }}
    >
      <ListItemText primary={label} />
    </ListItemButton>
  );

  return (
    <Box sx={{ px: 6, py: 5 }}>
      {/* ================= BREADCRUMB ================= */}
      <Typography sx={{ color: "#777", mb: 1 }}>
        Home / Shop{category && ` / ${categoryLabel}`}
      </Typography>

      {/* ================= HEADER + SORT ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 700 }}>
          {categoryLabel}
        </Typography>

        <Select
          size="small"
          value={sort}
          onChange={(e) => updateSort(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
        </Select>
      </Box>

      {/* ================= LAYOUT ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 6,
          alignItems: "start",
        }}
      >
        {/* ================= STICKY SIDEBAR ================= */}
        <Box
          sx={{
            position: "sticky",
            top: 120,
            height: "fit-content",
            p: 2,
            borderRadius: 3,
            background: "#fafafa",
            border: "1px solid #eee",
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 2 }}>
            By Category
          </Typography>

          <List disablePadding>
            <FilterItem
              label="All Candles"
              active={!category}
              onClick={() => push()}
            />

            {CATEGORIES.map(c => (
              <FilterItem
                key={c.value}
                label={c.label}
                active={category === c.value}
                onClick={() => push(`?category=${c.value}`)}
              />
            ))}
          </List>

          <Typography sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            By Price
          </Typography>

          <List disablePadding>
            {PRICE_BANDS.map(p => (
              <FilterItem
                key={p.label}
                label={p.label}
                active={
                  Number(min) === p.min &&
                  Number(max) === p.max
                }
                onClick={() =>
                  push(`?min=${p.min}&max=${p.max}`)
                }
              />
            ))}
          </List>
        </Box>

        {/* ================= PRODUCTS ================= */}
        <Box>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            {filtered.length} Products
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 3,
            }}
          >
            {filtered.map(product => (
              <Box
                key={product._id}
                sx={{
                  p: 2,
                  border: "1px solid #eee",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <img
                  src={product.image || "/images/placeholder.jpg"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />

                <Typography sx={{ mt: 1, fontWeight: 600 }}>
                  {product.name}
                </Typography>

                <Typography sx={{ color: "#666" }}>
                  ₹{product.price}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
