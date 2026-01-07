"use client";

import { useState } from "react";
import { Popover, Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ShopAllMenu() {
 const [anchorEl, setAnchorEl] = useState(null);
const timer = useRef(null);

const open = Boolean(anchorEl);

const openMenu = (e) => {
  clearTimeout(timer.current);
  setAnchorEl(e.currentTarget);
};

const closeMenu = () => {
  timer.current = setTimeout(() => setAnchorEl(null), 220);
};


    return (
    <>
      {/* SHOP ALL BUTTON */}
 <Box
  onMouseEnter={openMenu}
  onMouseLeave={closeMenu}
  onClick={openMenu}
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

      {/* 🟣 MEGA MENU CARD */}
           <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: { p: 3, borderRadius: 3, minWidth: 800 },
          onMouseEnter: () => clearTimeout(timer.current),
          onMouseLeave: closeMenu
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 4,
          }}
        >
          {/* CATEGORY */}
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
              By Category
            </Typography>

            {[
              { label: "Jar Candles", value: "jar" },
              { label: "Pillar Candles", value: "pillar" },
              { label: "Tealights", value: "tealight" },
              { label: "Decorative / Designer", value: "designer" },
            ].map(item => (
              <Typography
                key={item.value}
                sx={{ mb: 1, cursor: "pointer" }}
                onClick={() =>
                  (window.location.href =
                    `/collections?category=${item.value}`)
                }
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* COLLECTION */}
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
              By Collection
            </Typography>

            {[
              { label: "Festive Collection", value: "festive" },
              { label: "Calm Collection", value: "calm" },
              { label: "Decor Collection", value: "decor" },
              { label: "hey anu", value: "decor" },
            ].map(item => (
              <Typography
                key={item.value}
                sx={{ mb: 1, cursor: "pointer" }}
                onClick={() =>
                  (window.location.href =
                    `/collections?theme=${item.value}`)
                }
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* PRICE */}
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
              By Price
            </Typography>

            {[
              { label: "Under ₹499", min: 0, max: 499 },
              { label: "₹500 – ₹999", min: 500, max: 999 },
              { label: "₹1000 – ₹1999", min: 1000, max: 1999 },
              { label: "Above ₹2000", min: 2000, max: 999999 },
            ].map(item => (
              <Typography
                key={item.label}
                sx={{ mb: 1, cursor: "pointer" }}
                onClick={() =>
                  (window.location.href =
                    `/collections?min=${item.min}&max=${item.max}`)
                }
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Popover>
    </>
  );
}
