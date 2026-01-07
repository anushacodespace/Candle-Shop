"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ProductCard from "./ProductCard";

export default function ThemedProductSection({ title, category }) {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.filter((p) => p.category === category));
    }
    load();
  }, [category]);

  const visibleProducts = showAll ? products : products.slice(0, 3);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        {title}
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {visibleProducts.map((p) => (
          <Grid key={p._id} item xs={12} sm={6} md={3}>
            <ProductCard product={p} />
          </Grid>
        ))}

        {/* VIEW MORE BUTTON AS GRID ITEM */}
        {!showAll && products.length > 3 && (
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => setShowAll(true)}
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  px: 3,
                  background: "#8C77FF",
    "&:hover": { background: "#7a68e6" }
                }}
              >
                View More
              </Button>
            </Box>
          </Grid>
        )}

        {/* VIEW LESS (only when expanded) */}
        {showAll && (
          <Grid item xs={12}>
           <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => setShowAll(false)}
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  px: 3,
                  background: "#8C77FF",
    "&:hover": { background: "#7a68e6" }
                }}
              >
                View less
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
