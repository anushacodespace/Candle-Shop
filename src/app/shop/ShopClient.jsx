"use client";

import { useSearchParams } from "next/navigation";
import ShopDesktop from "./ShopDesktop";
import ShopMobile from "./ShopMobile";
import { useTheme, useMediaQuery } from "@mui/material";

export default function ShopClient() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const params = useSearchParams();

  return isMobile ? <ShopMobile /> : <ShopDesktop />;
}
