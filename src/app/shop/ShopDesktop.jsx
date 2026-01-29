"use client";

import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/config/catalog";
import ProductGrid from "@/components/ProductCardDetails/ProductGrid";
import Grid from "@mui/material/Grid";
import ProductCard from "@/components/ProductCardDetails/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardDetails/ProductCardSkeleton";

export default function ShopMobile() {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category");
  const sort = params.get("sort") || "newest";

  const [products, setProducts] = useState([]);

  /* LOAD PRODUCTS */
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    })();
  }, []);

  /* FILTER + SORT */
  const filtered = useMemo(() => {
    let list = [...products];

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, category, sort]);

  /* CATEGORY LABEL */
  const categoryLabel =
    CATEGORIES.find((c) => c.value === category)?.label ||
    "Shop All Candles";

  return (
    <Box sx={{ px: 2, py: 3 }}>
      {/* TITLE */}
     <Typography sx={{ fontSize: "1.8rem", fontWeight: 700 }}>
  {categoryLabel}
</Typography>



      {/* CATEGORY LIST (ONLY WHEN NO CATEGORY SELECTED) */}
      {!category && (
        <Box sx={{ display: "grid", gap: 1.5, mb: 3 }}>
          {CATEGORIES.map((c) => (
            <Button
              key={c.value}
              variant="outlined"
              onClick={() =>
               router.push(
  `/shop?category=${c.value}&sort=${sort}`
)
              }
              sx={{
                justifyContent: "space-between",
                textTransform: "none",
                py: 1.2,
              }}
            >
              {c.label}
            </Button>
          ))}
        </Box>
      )}
  {category && (
  <Button
    size="small"
    onClick={() => router.push("/shop")}
    sx={{ mb: 1, textTransform: "none" }}
  >
    ← All Categories
  </Button>
)}

      {/* SORT (ONLY WHEN PRODUCTS SHOWN) */}
      {category && (
        <Select
          size="small"
          value={sort}
          onChange={(e) =>
            router.push(
              `/shop?category=${category}&sort=${e.target.value}`
            )
          }
          sx={{ mb: 2, width: "100%" }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
        </Select>
      )}

      {/* PRODUCTS */}
<Box>
  <Typography sx={{ mb: 2, fontWeight: 600 }}>
    {products.length ? `${filtered.length} Products` : "Loading products..."}
  </Typography>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 3,
    }}
  >
    {products.length === 0
      ? Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))
      : filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
  </Box>
</Box>

  
      </Box>
    
  );
}
