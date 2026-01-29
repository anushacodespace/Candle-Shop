"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CATEGORIES, COLLECTIONS, PRICE_BANDS } from "@/config/catalog";

export default function MobileDrawer({ open, onClose }) {
  const router = useRouter();
  const [view, setView] = useState("main");

  const go = (url) => {
    onClose();
    setView("main");
    router.push(url);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 260, pt: "64px", px: 2 }}>
        {/* HEADER */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 64,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            borderBottom: "1px solid #eee",
            background: "#fff",
          }}
        >
          <Typography fontWeight={700}>Menu</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* MAIN */}
        {view === "main" && (
          <List>
            <ListItemButton onClick={() => go("/")}>
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton onClick={() => setView("shopAll")}>
              <ListItemText primary="Shop All" />
              <ChevronRightIcon />
            </ListItemButton>

            <ListItemButton onClick={() => go("/offers")}>
              <ListItemText primary="Sale / Offers" />
            </ListItemButton>

            <ListItemButton onClick={() => go("/about")}>
              <ListItemText primary="About Us" />
            </ListItemButton>

            <ListItemButton onClick={() => go("/contact")}>
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </List>
        )}

        {/* SHOP ALL */}
        {view === "shopAll" && (
          <>
            <ListItemButton onClick={() => setView("main")}>
              <ArrowBackIosNewIcon sx={{ fontSize: 18, mr: 1 }} />
              <ListItemText primary="Shop All" />
            </ListItemButton>

            <Divider />

            <List>
              <ListItemButton onClick={() => go("/shop")}>
                <ListItemText primary="All Products" />
              </ListItemButton>

              <ListItemButton onClick={() => setView("category")}>
                <ListItemText primary="By Category" />
                <ChevronRightIcon />
              </ListItemButton>

              <ListItemButton onClick={() => setView("collection")}>
                <ListItemText primary="By Collection" />
                <ChevronRightIcon />
              </ListItemButton>

              <ListItemButton onClick={() => setView("price")}>
                <ListItemText primary="By Price" />
                <ChevronRightIcon />
              </ListItemButton>
            </List>
          </>
        )}

        {/* CATEGORY */}
        {view === "category" && (
          <>
            <ListItemButton onClick={() => setView("shopAll")}>
              <ArrowBackIosNewIcon sx={{ fontSize: 18, mr: 1 }} />
              <ListItemText primary="By Category" />
            </ListItemButton>
            <Divider />
            <List>
              {CATEGORIES.map(c => (
                <ListItemButton
                  key={c.value}
                  onClick={() => go(`/shop?category=${c.value}`)}
                >
                  <ListItemText primary={c.label} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {/* COLLECTION */}
        {view === "collection" && (
          <>
            <ListItemButton onClick={() => setView("shopAll")}>
              <ArrowBackIosNewIcon sx={{ fontSize: 18, mr: 1 }} />
              <ListItemText primary="By Collection" />
            </ListItemButton>
            <Divider />
            <List>
              {COLLECTIONS.map(c => (
                <ListItemButton
                  key={c.value}
                  onClick={() => go(`/shop?collection=${c.value}`)}
                >
                  <ListItemText primary={c.label} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {/* PRICE */}
        {view === "price" && (
          <>
            <ListItemButton onClick={() => setView("shopAll")}>
              <ArrowBackIosNewIcon sx={{ fontSize: 18, mr: 1 }} />
              <ListItemText primary="By Price" />
            </ListItemButton>
            <Divider />
            <List>
              {PRICE_BANDS.map(p => (
                <ListItemButton
                  key={p.label}
                  onClick={() => go(`/shop?min=${p.min}&max=${p.max}`)}
                >
                  <ListItemText primary={p.label} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}
