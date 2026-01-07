"use client";

import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";

export default function CollectionCard({ image, title, subtitle, href }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          position: "relative",
          height: 220,
          borderRadius: 3,
          overflow: "hidden",
          cursor: "pointer"
        }}
      >
        <img
          src={image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,.7), transparent)",
            color: "#fff",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <Typography fontWeight={800}>{title}</Typography>
          <Typography sx={{ opacity: 0.9, fontSize: 14 }}>{subtitle}</Typography>

          <Button size="small" sx={{ mt: 1 }} variant="contained">
            View Collection
          </Button>
        </Box>
      </Box>
    </Link>
  );
}
