"use client";

import {
  Box,
  Typography,
  Popper,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";

import {
  CATEGORIES,
  COLLECTIONS,
  PRICE_BANDS,
} from "@/config/catalog";

export default function ShopAllMegaMenu({
  anchorEl,
  open,
  onClose,
  onEnter,
}) {

  const router = useRouter();

  const go = (url) => {
    onClose();
    router.push(url);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      disablePortal
      sx={{ zIndex: 1300 }}
    >
      <Paper
  onMouseEnter={() => {
    if (onEnter) onEnter();
  }}
  onMouseLeave={onClose}
  sx={{
    mt: 2,
    px: 6,
    py: 4,
    width: "100vw",
    borderRadius: 0,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  }}
>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 2fr 4fr",
            gap: 6,
          }}
        >
          {/* CATEGORY */}
          <MegaColumn
            title="By Category"
            items={CATEGORIES}
            onClick={(v) => go(`/shop?category=${v}`)}
          />

          {/* COLLECTION */}
          <MegaColumn
            title="By Collection"
            items={COLLECTIONS}
            onClick={(v) => go(`/collections?theme=${v}`)}
          />

          {/* PRICE */}
          <MegaColumn
            title="By Price"
            items={PRICE_BANDS}
            isPrice
            onClick={(p) =>
              go(`/shop?min=${p.min}&max=${p.max}`)
            }
          />
          <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  }}
>
  <Box
    onClick={() => {
      onClose();
      router.push("/shop?category=jar"); 
    }}
    sx={{
      width:"100%",
      cursor: "pointer",
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
      transition: "0.3s",
      "&:hover": {
        transform: "scale(1.03)",
      },
    }}
  >
    <img
      src="/images/mega-menu-candle.png"
      alt="Handcrafted Candles"
      style={{
        width: "100%",
        height: "100%",
        maxHeight: 280,
        objectFit: "cover",
        display: "block",
      }}
    />
  </Box>
</Box>

        </Box>
      </Paper>
    </Popper>
  );
}

function MegaColumn({ title, items, onClick, isPrice }) {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "#6B5FA7",
        }}
      >
        {title}
      </Typography>

      {items.map((item) => (
        <Typography
          key={item.label}
          onClick={() =>
            isPrice ? onClick(item) : onClick(item.value)
          }
          sx={{
            mb: 1.2,
            cursor: "pointer",
            "&:hover": {
              color: "#6B5FA7",
              fontWeight: 600,
              textDecoration: "underline",
            },
          }}
        >
          {item.label}
        </Typography>
      ))}
    </Box>
  );
}
