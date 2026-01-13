"use client";

import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { label: "ALL", action: () => ({}) },
  { label: "BY CATEGORY", action: () => ({ view: "category" }) },
  { label: "BY COLLECTION", action: () => ({ view: "collection" }) },
  { label: "BY PRICE", action: () => ({ view: "price" }) },
];

export default function CollectionsSubNavDesktop({ activeView, setActiveView }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        borderBottom: "1px solid #eee",
        py: 2,
        px: 4,
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>Filters</Typography>

      {TABS.map(tab => (
        <Typography
          key={tab.label}
          onClick={() => setActiveView(tab.action().view || "all")}
          sx={{
            cursor: "pointer",
            fontWeight: activeView === tab.action().view ? 700 : 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: activeView === tab.action().view ? "#000" : "#777",
          }}
        >
          {tab.label}
        </Typography>
      ))}
    </Box>
  );
}
