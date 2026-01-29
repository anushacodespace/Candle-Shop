"use client";

import { useTheme, useMediaQuery } from "@mui/material";
import ShopDesktop from "./ShopDesktop";
import ShopMobile from "./ShopMobile";

export default function ShopPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <ShopMobile /> : <ShopDesktop />;
}
