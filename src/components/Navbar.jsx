"use client";
import React from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Drawer
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import InstagramIcon from "@mui/icons-material/Instagram";

import BrandIcon from "@/components/BrandIcon";

import { useRouter, usePathname } from "next/navigation";
import { useState , useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useMediaQuery } from "@mui/material";
import { Popover } from "@mui/material";
import { useRef } from "react";


export default function Navbar() {
const [shopAllAnchor, setShopAllAnchor] = useState(null);
const shopAllOpen = Boolean(shopAllAnchor);
const closeDelay = useRef(null);
const [priceBands, setPriceBands] = useState([]);


  const isDesktop = useMediaQuery("(min-width:900px)");

  const router = useRouter();
  const pathname = usePathname();

  const cart = useCartStore((s) => s.cart);
  const user = useAuthStore((s) => s.user);
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  // 👇 THIS NOW LIVES INSIDE COMPONENT (correct)
  const [menuOpen, setMenuOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const links = [
  { label: "Home", path: "/" },
  { label: "Sale / Offers", path: "/offers" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];
 useEffect(() => {
  async function load() {
    const res = await fetch("/api/products");
    const products = await res.json();

    const prices = products.map(p => p.price).sort((a,b)=>a-b);
    if (!prices.length) return;

    const min = prices[0];
    const max = prices[prices.length - 1];

    // create up to 5 bands
    const step = Math.ceil((max - min) / 4);

    const bands = [
      { label: `Under ₹${min + step}`, min: 0, max: min + step },
      { label: `₹${min + step} – ₹${min + step*2}`, min: min + step, max: min + step*2 },
      { label: `₹${min + step*2} – ₹${min + step*3}`, min: min + step*2, max: min + step*3 },
      { label: `₹${min + step*3} – ₹${max}`, min: min + step*3, max },
      { label: `Above ₹${max}`, min: max, max: Infinity }
    ];

    setPriceBands(bands);
  }

  load();
}, []);


  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#fff",
        color: "#000",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* MENU TOGGLE */}
        {!isDesktop && (
  <IconButton onClick={() => setMenuOpen((prev) => !prev)}>
    <MenuIcon />
  </IconButton>
)}


        {/* BRAND */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <BrandIcon size={26} />
          <Typography sx={{ fontWeight: 700 }}>
            Sparrow Light Studio
          </Typography>
        </Box>

        {/* RIGHT ICONS */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton onClick={() => router.push(user ? "/profile" : "/login")}>
            <PersonOutlineIcon />
          </IconButton>

          <IconButton onClick={() => router.push("/cart")}>
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

       {/* MOBILE DRAWER */}
{!isDesktop && (
  <Drawer
    anchor="left"
    open={menuOpen}
    onClose={() => setMenuOpen(false)}
  >
  <Box sx={{ width: 260, p: 2 }}>

    {/* NAV LINKS FROM ARRAY */}
    {links.map((link) => (
      <Typography
        key={link.path}
        onClick={() => {
          router.push(link.path);
          setMenuOpen(false);
        }}
        sx={{
          py: 1.5,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        {link.label}
      </Typography>
    ))}

    {/* 🚨 ADD SHOP ALL MANUALLY */}
    <Typography
  onClick={() => router.push("/collections")}     // still opens page on click
  onMouseEnter={(e) => setShopAllAnchor(e.currentTarget)}
  onMouseLeave={() => setTimeout(() => setShopAllAnchor(null), 150)}
  sx={{
    cursor: "pointer",
    position: "relative",
    fontWeight: pathname === "/collections" ? 700 : 500,
    color: pathname === "/collections" ? "#000" : "#666",
    "&:hover": { color: "#000" },
  }}
>
  Shop All
</Typography>


  </Box>
</Drawer>
)}

      {/* CLICK-MENU BAR */} {/* DESKTOP NAV LINKS BAR */}
 <Box
        sx={{
          maxHeight: isDesktop ? 120 : menuOpen ? 120 : 0,
          opacity: isDesktop ? 1 : menuOpen ? 1 : 0,
          overflow: "hidden",
          transition: "all .35s ease",
          display: isDesktop ? "flex" : menuOpen ? "flex" : "none",
          justifyContent: "center",
          gap: 5,
          py: isDesktop ? 1.5 : 0,
          borderTop: "1px solid #eee",
          background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(6px)",
        }}
      >


  {links.map((link, index) => (
  <React.Fragment key={link.path}>
    {/* Render HOME */}
    {index === 0 && (
      <Typography
        key={link.path}
        onClick={() => router.push(link.path)}
        sx={{
          cursor: "pointer",
          position: "relative",
          fontWeight: pathname === link.path ? 700 : 500,
          color: pathname === link.path ? "#000" : "#666",
          "&:hover": { color: "#000" },
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: -6,
            width: pathname === link.path ? "100%" : "0%",
            height: "2px",
            backgroundColor: "#7b6cf6",
            borderRadius: 50,
            transition: ".3s",
          },
          "&:hover::after": { width: "100%" },
        }}
      >
        {link.label}
      </Typography>
    )}

 {/* SHOP ALL (HOVER DROPDOWN) */}
{index === 0 && (
  <Typography
    onClick={() => router.push("/collections")}
    onMouseEnter={(e) => isDesktop && setShopAllAnchor(e.currentTarget)}
    onMouseLeave={() =>
      isDesktop && setTimeout(() => setShopAllAnchor(null), 120)
    }
    sx={{
      cursor: "pointer",
      position: "relative",
      fontWeight: pathname === "/collections" ? 700 : 500,
      color: pathname === "/collections" ? "#000" : "#666",
      "&:hover": { color: "#000" },
    }}
  >
    Shop All
  </Typography>
)}


    {/* Render everything except HOME (skip duplicate) */}
    {index > 0 && (
      <Typography
        key={link.path}
        onClick={() => router.push(link.path)}
        sx={{
          cursor: "pointer",
          position: "relative",
          fontWeight: pathname === link.path ? 700 : 500,
          color: pathname === link.path ? "#000" : "#666",
          "&:hover": { color: "#000" },
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: -6,
            width: pathname === link.path ? "100%" : "0%",
            height: "2px",
            backgroundColor: "#7b6cf6",
            borderRadius: 50,
            transition: ".3s",
          },
          "&:hover::after": { width: "100%" },
        }}
      >
        {link.label}
      </Typography>
    )}
  
  </React.Fragment>
))}



</Box>

    </AppBar>
  );
}
