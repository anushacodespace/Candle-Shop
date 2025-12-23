"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #7b6cf6, #8a7cf8)",
        px: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        {/* BRAND */}
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onClick={() => router.push("/shop")}
        >
          🕯️ Sparrow Light Studio
        </Typography>

        {/* ACTIONS */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {pathname !== "/login" && (
            <Button
              color="inherit"
              size={isMobile ? "small" : "medium"}
              onClick={() => router.push("/login")}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Login
            </Button>
          )}

          {pathname !== "/signup" && (
            <Button
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              onClick={() => router.push("/signup")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Sign up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
