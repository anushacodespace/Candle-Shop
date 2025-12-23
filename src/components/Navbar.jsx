"use client";

import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import useMounted from "@/hooks/useMounted";
import BrandIcon from "@/components/BrandIcon";

export default function Navbar() {
  const router = useRouter();
  const mounted = useMounted();

  // ✅ ALL hooks must be called BEFORE any return
  const user = useAuthStore((s) => s.user);
  const cart = useCartStore((s) => s.cart);

  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ✅ Safe early return AFTER hooks
  if (!mounted) return null;

  return (
<AppBar
  position="sticky"
  elevation={0}
  sx={{
    background: "linear-gradient(90deg, #a585ef, #9b7fe8)",
    height: 64,
    justifyContent: "center",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
  }}
>

      <Toolbar
  sx={{
    minHeight: 64,
    display: "flex",
    justifyContent: "space-between",
  }}
>
<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <BrandIcon size={22} />
         <Typography
  sx={{
    fontWeight: 600,
    fontSize: { xs: "1rem", md: "1.1rem" },
    letterSpacing: "0.3px",
  }}
>
  Sparrow Light Studio
</Typography>

</Box>


        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Hi, {user.name}</Typography>

            <IconButton color="inherit" onClick={() => router.push("/cart")}>
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Button color="inherit" onClick={() => router.push("/logout")}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
    color="inherit"
    sx={{
      opacity: 0.85,
      "&:hover": { opacity: 1 },
    }}
    onClick={() => router.push("/login")}
  >
    Login
  </Button>
             <Button
    variant="outlined"
    sx={{
      borderColor: "rgba(255,255,255,0.6)",
      color: "#fff",
      "&:hover": {
        borderColor: "#fff",
        backgroundColor: "rgba(255,255,255,0.08)",
      },
    }}
    onClick={() => router.push("/signup")}
  >
    Sign up
  </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
