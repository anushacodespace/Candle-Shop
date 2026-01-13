"use client";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import MobileSearchOverlay from "./navbar/MobileSearchOverlay";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";

import MobileDrawer from "./navbar/MobileDrawer";
import DesktopDrawer from "./navbar/DesktopDrawer";

export default function Navbar() {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width:900px)");

  const cart = useCartStore((s) => s.cart);
  const user = useAuthStore((s) => s.user);
  const count = cart.reduce((s, i) => s + i.quantity, 0);
const logout = useAuthStore((s) => s.logout);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
const [profileAnchor, setProfileAnchor] = useState(null);
const profileOpen = Boolean(profileAnchor);

const pathname = usePathname();

useEffect(() => {
  setProfileAnchor(null);
}, [pathname]);


 return (
  <>
    {/* MOBILE NAVBAR */}
    {!isDesktop && (
      <>
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
            {/* MENU BUTTON */}
            <IconButton onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </IconButton>

            {/* BRAND */}
            {/* BRAND */}
<Box
  onClick={() => router.push("/")}
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
    lineHeight: 1,
  }}
>
  <Typography
    sx={{
      fontFamily: "'Cinzel', serif",
      fontSize: "1.6rem",     // ✅ big enough for mobile
      fontWeight: 800,
      color: "#6B5FA7",       // lavender
      letterSpacing: "1px",
      whiteSpace: "nowrap",
      lineHeight: 1,
    }}
  >
    Sparrow
  </Typography>

  <Typography
    sx={{
      fontSize: "0.6rem",
      letterSpacing: "0.35em",
      fontWeight: 700,
      color: "#4B2E83",
      marginTop: "2px",
      whiteSpace: "nowrap",
    }}
  >
    LIGHT STUDIO
  </Typography>
</Box>


            {/* ICONS */}
            <Box sx={{ display: "flex", gap: 1 }}>
             <IconButton onClick={() => setSearchOpen(true)}>
  <SearchIcon />
</IconButton>


  <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
  <PersonOutlineIcon />
</IconButton>



              <IconButton onClick={() => router.push("/cart")}>
                <Badge badgeContent={count} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
            <Menu
  anchorEl={profileAnchor}
  open={profileOpen}
  onClose={() => setProfileAnchor(null)}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  PaperProps={{
    sx: {
      mt: 1,
      borderRadius: 2,
      minWidth: 180,
      boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    },
  }}
>
  {user ? (
    <>
      <MenuItem disabled sx={{ fontWeight: 600, color: "#6B5FA7" }}>
        Hi, {user.name.split(" ")[0]} 👋
      </MenuItem>

      <MenuItem
        onClick={() => {
          setProfileAnchor(null);
          router.push("/orders"); // optional
        }}
      >
        My Orders
      </MenuItem>

      <MenuItem
  onClick={() => {
    setProfileAnchor(null);
    logout();
    router.push("/");
  }}
  sx={{ color: "error.main" }}
>
  Logout
</MenuItem>

    </>
  ) : (
    <>
      <MenuItem
        onClick={() => {
          setProfileAnchor(null);
          router.push("/login");
        }}
      >
        Login
      </MenuItem>

      <MenuItem
        onClick={() => {
          setProfileAnchor(null);
          router.push("/signup");
        }}
      >
        Signup
      </MenuItem>
    </>
  )}
</Menu>

          </Toolbar>
        </AppBar>

  <MobileSearchOverlay
  open={searchOpen}
  onClose={() => setSearchOpen(false)}
/>

        {/* MOBILE DRAWER */}
        <MobileDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </>
    )}

    {/* DESKTOP NAVBAR */}
    {isDesktop && <DesktopDrawer />}
  </>
);

}
