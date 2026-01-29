"use client";

import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";

import HeroSlider from "@/components/HeroSlider";
import ThemedProductSection from "@/components/ProductCardDetails/ThemedProductSection";
import ClientProductGrid from "@/components/ProductCardDetails/ClientProductGrid";
import CollectionsSection from "@/components/CollectionsSection";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  const handleNavigate = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    }

    load();
  }, []);

  return (
    <>
      {/* 🔥 FULL-WIDTH HERO (no white edges) */}
     <Box
  sx={{
    width: "100vw",
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    overflow: "clip",
  }}
>
  <HeroSlider onNavigate={handleNavigate} />
</Box>

      {/* 🧱 CONTENT WITH NORMAL PADDING */}
     {/* 🧱 CONTENT WITH NORMAL PADDING (NO BOXED CONTAINER) */}
<Box sx={{ width: "100%", px: { xs: 2, md: 6 }, py: 4 }}>
        
  <section id="festival-section">
    <ThemedProductSection
      title="✨ Festival Favourites"
      category="Festival Candles"
    />
  </section>

  <section id="calm-section">
    <ThemedProductSection
      title="🌿 Calm & Relax"
      category="Calm Candles"
    />
  </section>

  <section id="decor-section">
    <ThemedProductSection
      title="🏡 Home Decor"
      category="Decor Candles"
    />
  </section>

</Box>

    </>
  );
}
