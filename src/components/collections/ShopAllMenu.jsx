"use client";

import { useRef, useState } from "react";
import { Popover, Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/navigation";

export default function ShopAllMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const timer = useRef(null);

  const open = Boolean(anchorEl);

  const openMenu = (e) => {
    clearTimeout(timer.current);
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    timer.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  const go = (url) => {
    setAnchorEl(null);
    router.push(url);
  };

  return (
    <>
      {/* TRIGGER */}
      <Box
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Typography>Shop All</Typography>
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>

      {/* DROPDOWN */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        disableRestoreFocus
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          onMouseEnter: () => clearTimeout(timer.current),
          onMouseLeave: closeMenu,
          sx: {
            p: 2,
            borderRadius: 2,
            minWidth: 220,
            zIndex: 1500,
          },
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 1 }} onClick={() => go("/shop")}>
          All Products
        </Typography>

        <Typography onClick={() => go("/shop?view=category")}>
          By Category
        </Typography>

        <Typography onClick={() => go("/shop?view=collection")}>
          By Collection
        </Typography>

        <Typography onClick={() => go("/shop?view=price")}>
          By Price
        </Typography>
      </Popover>
    </>
  );
}
