"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import useMounted from "@/hooks/useMounted";

export default function Navbar() {
    const mounted = useMounted();
    
  if (!mounted) return null;
  
  const user = useAuthStore((s) => s.user);
  const cart = useCartStore((s) => s.cart);

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        <Typography
          component={Link}
          href="/shop"
          variant="h6"
          sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
        >
          🕯️ Candle Shop
        </Typography>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Hi, {user.name}</Typography>

            <IconButton
              component={Link}
              href="/cart"
              color="inherit"
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Button
              color="inherit"
              component={Link}
              href="/logout"
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              href="/login"
            >
              Login
            </Button>

            <Button
              color="inherit"
              component={Link}
              href="/signup"
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
