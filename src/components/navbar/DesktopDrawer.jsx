"use client";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import WishlistIcon from "@/app/wishlist/wishlistIcon";


import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import ShopAllMegaMenu from "./ShopAllMegaMenu";


export default function DesktopDrawer() {
  const router = useRouter();
  const pathname = usePathname();

  const cart = useCartStore((s) => s.cart);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const count = cart.reduce((s, i) => s + i.quantity, 0);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [shopAnchor, setShopAnchor] = useState(null);
const closeTimer = useRef(null);

  /* ---------------- SEARCH ---------------- */
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  /* Close menu on route change */
  useEffect(() => {
    setAnchorEl(null);
  }, [pathname]);

 const navItem = (label, path) => {
  const isActive = pathname === path;

  return (
    <Typography
      key={label}
      onClick={() => router.push(path)}
      sx={navItemStyle(isActive)}
    >
      {label}
    </Typography>
  );
};


const navItemStyle = (active) => ({
  cursor: "pointer",
  fontWeight: active ? 600 : 500,
  position: "relative",
  color: active ? "#6B5FA7" : "inherit",
  paddingBottom: "6px",

  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 2,
    width: active ? "100%" : "0%",
    backgroundColor: "#6B5FA7",
    transition: "width 0.25s ease",
  },

  "&:hover::after": {
    width: "100%",
  },
});

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
      {/* ================= TOP ROW ================= */}
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "260px 1fr auto",
          alignItems: "center",
          px: 3,
          minHeight: 88,
          gap: 3,
        }}
      >
        {/* LOGO */}
        <Box
          onClick={() => router.push("/")}
          sx={{ cursor: "pointer", lineHeight: 1 }}
        >
          <Typography
            sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: "2.1rem",
              fontWeight: 800,
              color: "#6B5FA7",
            }}
          >
            Sparrow
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              letterSpacing: "0.4em",
              fontWeight: 700,
              color: "#4B2E83",
              mt: "4px",
            }}
          >
            LIGHT STUDIO
          </Typography>
        </Box>

        {/* SEARCH */}
        <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <Box
            sx={{
              width: 560,
              maxWidth: "90%",
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 2,
              height: 44,
              borderRadius: "999px",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <SearchIcon sx={{ fontSize: 20, color: "#666" }} />
            <input
              value={query}
              placeholder="Search candles, fragrances, gift sets..."
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: 14,
              }}
            />
          </Box>

          {showSuggestions && query && (
            <Box
              sx={{
                position: "absolute",
                top: "110%",
                width: 560,
                background: "#fff",
                borderRadius: 2,
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                zIndex: 1400,
              }}
            >
              {loading && <Box sx={{ px: 2, py: 1 }}>Searching...</Box>}
              {!loading && results.length === 0 && (
                <Box sx={{ px: 2, py: 1 }}>No results</Box>
              )}
              {results.map((item) => (
                <Box
                  key={item._id}
                  onClick={() => {
                    router.push(`/product/${item._id}`);
                    setShowSuggestions(false);
                  }}
                  sx={{ px: 2, py: 1, cursor: "pointer" }}
                >
                  🔍 {item.name}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* RIGHT ICONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* PROFILE */}
          {/* PROFILE */}
{user ? (
  <>
    {/* LOGGED IN */}
    <Typography
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      sx={{
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "#6B5FA7",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      Hi, {user.name.split(" ")[0]} 👋
    </Typography>

    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem
        onClick={() => {
          logout();
          setAnchorEl(null);
          router.push("/");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  </>
) : (
  <>
    {/* LOGGED OUT */}
    <IconButton
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      sx={{
        background: "#f7f7f7",
        width: 36,
        height: 36,
        "&:hover": { background: "#eee" },
      }}
    >
      <PersonOutlineIcon />
    </IconButton>

    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          router.push("/login");
        }}
      >
        Login
      </MenuItem>

      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          router.push("/signup");
        }}
      >
        Signup
      </MenuItem>
    </Menu>
  </>
)}
<WishlistIcon /> 

          {/* CART */}
          <IconButton onClick={() => router.push("/cart")}>
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* ================= BOTTOM ROW ================= */}
      <Toolbar
        sx={{
          justifyContent: "center",
          gap: 5,
          minHeight: 48,
          borderTop: "1px solid #f2f2f2",
        }}
      >
        {navItem("Home", "/")}
        {navItem("Sale / Offers", "/offers")}
        {navItem("About Us", "/about")}
        {navItem("Contact Us", "/contact")}
     <Typography
  onMouseEnter={(e) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopAnchor(e.currentTarget);
  }}
  onClick={(e) => setShopAnchor(e.currentTarget)}
  onMouseLeave={() => {
    closeTimer.current = setTimeout(() => {
      setShopAnchor(null);
    }, 200);
  }}
  sx={navItemStyle(Boolean(shopAnchor))}
>
  Shop All
</Typography>


      </Toolbar>
  <ShopAllMegaMenu
  anchorEl={shopAnchor}
  open={Boolean(shopAnchor)}
  onEnter={() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }}
  onClose={() => {
    closeTimer.current = setTimeout(() => {
      setShopAnchor(null);
    }, 300);
  }}
/>


    </AppBar>
  );
}
