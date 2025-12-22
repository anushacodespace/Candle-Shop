"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { cart, openCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          sx={{ flexGrow: 1, fontWeight: 600, cursor: "pointer" }}
          onClick={() => router.push("/shop")}
        >
          Candle Shop
        </Typography>

        {/* 🛒 Cart icon — only clickable if logged in */}
        <IconButton
          color="inherit"
          size={isMobile ? "large" : "medium"}
          onClick={() => {
            if (!session) {
              router.push("/login");
            } else {
              openCart();
            }
          }}
          disabled={status === "loading"}
        >
          <Badge badgeContent={session ? count : 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
