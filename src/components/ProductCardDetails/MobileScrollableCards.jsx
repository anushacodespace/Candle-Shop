"use client";

import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function HomeHorizontalProducts({ products }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: "75%",
        gap: 2,
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        px: 2,
        pb: 2,

        "&::-webkit-scrollbar": {
          display: "none",
        },

        /* DESKTOP */
        "@media (min-width:900px)": {
          gridAutoFlow: "unset",
          gridTemplateColumns: "repeat(3, 1fr)",
          overflowX: "unset",
          px: 0,
        },
      }}
    >
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </Box>
  );
}
