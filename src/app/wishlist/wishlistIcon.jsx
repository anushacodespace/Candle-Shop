"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Badge } from "@mui/material";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import { useEffect, useRef, useState } from "react";

export default function WishlistIcon() {
  const router = useRouter();
  const wishlistCount = useWishlistStore((s) => s.wishlist.length);

  const prevCount = useRef(wishlistCount);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (wishlistCount !== prevCount.current) {
      setAnimate(true);
      prevCount.current = wishlistCount;

      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    }
  }, [wishlistCount]);

  return (
    <IconButton onClick={() => router.push("/wishlist")}>
      <FavoriteBorderIcon />
    </IconButton>
  );
}
