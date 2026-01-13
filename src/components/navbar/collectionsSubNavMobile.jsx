"use client";

import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

import { CATEGORIES, COLLECTIONS } from "@/config/catalog";
import { useRouter } from "next/navigation";

export default function CollectionsSubNavMobile({
  open,
  onClose,
  mobileView,
  setMobileView,
  priceBands,
}) {
  const router = useRouter();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, pt: 8 }}>

        {/* HEADER */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* MAIN */}
        {mobileView === "main" && (
          <List>
            <ListItemButton onClick={() => setMobileView("shopAll")}>
              <ListItemText primary="Shop All" />
              <ChevronRightIcon />
            </ListItemButton>
          </List>
        )}

        {/* SHOP ALL */}
        {mobileView === "shopAll" && (
          <>
            <ListItemButton onClick={() => setMobileView("main")}>
              <ArrowBackIosNewIcon sx={{ fontSize: 16, mr: 1 }} />
              <ListItemText primary="Shop All" />
            </ListItemButton>
            <Divider />

            <List>
              <ListItemButton onClick={() => router.push("/collections")}>
                <ListItemText primary="All Products" />
              </ListItemButton>

              <ListItemButton onClick={() => setMobileView("category")}>
                <ListItemText primary="By Category" />
                <ChevronRightIcon />
              </ListItemButton>

              <ListItemButton onClick={() => setMobileView("collection")}>
                <ListItemText primary="By Collection" />
                <ChevronRightIcon />
              </ListItemButton>

              <ListItemButton onClick={() => setMobileView("price")}>
                <ListItemText primary="By Price" />
                <ChevronRightIcon />
              </ListItemButton>
            </List>
          </>
        )}

        {/* CATEGORY */}
        {mobileView === "category" && (
          <>
            <ListItemButton onClick={() => setMobileView("shopAll")}>
              <ArrowBackIosNewIcon sx={{ fontSize: 16, mr: 1 }} />
              <ListItemText primary="By Category" />
            </ListItemButton>
            <Divider />
            <List>
              {CATEGORIES.map(c => (
                <ListItemButton
                  key={c.value}
                  onClick={() => router.push(`/collections?category=${c.value}`)}
                >
                  <ListItemText primary={c.label} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {/* COLLECTION */}
        {mobileView === "collection" && (
          <>
            <ListItemButton onClick={() => setMobileView("shopAll")}>
              <ArrowBackIosNewIcon sx={{ fontSize: 16, mr: 1 }} />
              <ListItemText primary="By Collection" />
            </ListItemButton>
            <Divider />
            <List>
              {COLLECTIONS.map(c => (
                <ListItemButton
                  key={c.value}
                  onClick={() => router.push(`/collections?theme=${c.value}`)}
                >
                  <ListItemText primary={c.label} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}
