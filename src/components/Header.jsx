"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";

import { useTheme } from "@mui/material/styles";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

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
        {/* MENU BUTTON (always visible) */}
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            mr: 2,
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MenuIcon />
          {/* show text only on desktop */}
          <Typography
            sx={{
              ml: 1,
              fontSize: 14,
              display: { xs: "none", md: "block" },
            }}
          >
            Menu
          </Typography>
        </IconButton>

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

        {/* DRAWER */}
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              width: 280,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* TOP MENU */}
            <List>
              <ListItemButton onClick={() => router.push("/shop")}>
                <ListItemText primary="All Products" />
              </ListItemButton>

              <ListItemButton onClick={() => router.push("/collections")}>
                <ListItemText primary="Collections" />
              </ListItemButton>

              <ListItemButton onClick={() => router.push("/about")}>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </List>

            <Divider sx={{ my: 1 }} />

            {/* FOOTER SECTION */}
            <Box sx={{ mt: "auto", p: 2 }}>
              <Divider sx={{ mb: 1 }} />

              <ListItemButton onClick={() => router.push("/login")}>
                <ListItemText primary="Log in" />
              </ListItemButton>

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <IconButton
                  onClick={() =>
                    window.open("https://instagram.com", "_blank")
                  }
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
