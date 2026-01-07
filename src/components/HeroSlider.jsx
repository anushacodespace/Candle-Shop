"use client";

import { Box, Typography, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

const IMAGES = [
  {
    image: "/images/hero1.png",
    title: "✨ Festival Favourites",
    subtitle: "Light up your celebrations with warm glow",
    target: "festival-section"
  },
  {
    image: "/images/hero2.png",
    title: "🌿 Calm & Relax",
    subtitle: "Aromatherapy candles for peaceful evenings",
    target: "calm-section"
  },
  {
    image: "/images/hero3.png",
    title: "🏡 Aesthetic Decor",
    subtitle: "Create cozy corners & beautiful vibes",
    target: "decor-section"
  }
];

export default function HeroSlider({onNavigate}) {
  const [index, setIndex] = useState(0);

const handleHeroClick = () => {
    if (onNavigate) onNavigate(IMAGES[index].target);
  };
  // 🔁 AUTO PLAY
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % IMAGES.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin:0,
        padding:0,
        height: 420,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer"
      }}
    onClick={handleHeroClick}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={IMAGES[index].image}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: "scale(1.05)",
          transition: "opacity .5s, transform 4s ease"
        }}
      />

      {/* DARK GRADIENT */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.15), rgba(0,0,0,0))"
        }}
      />

      {/* TEXT */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          textAlign: "center",
          maxWidth: 600,
          zIndex: 5
        }}
      >
        <Typography sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" }, fontWeight: 800 }}>
          {IMAGES[index].title}
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.9 }}>
          {IMAGES[index].subtitle}
        </Typography>
      </Box>

      {/* LEFT ARROW */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // ❗ stops scroll trigger
          setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
        }}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          color: "white",
          zIndex: 10
        }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* RIGHT ARROW */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // ❗ stops scroll trigger
          setIndex((i) => (i + 1) % IMAGES.length);
        }}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          color: "white",
          zIndex: 10
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* DOTS */}
      <Box
        sx={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1
        }}
      >
        {IMAGES.map((_, i) => (
          <Box
            key={i}
            onClick={(e) => {
              e.stopPropagation(); // ❗ clicking dots should NOT scroll
              setIndex(i);
            }}
            sx={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              cursor: "pointer",
              background: i === index ? "#fff" : "rgba(255,255,255,.5)",
              border: i === index ? "2px solid #7b6cf6" : "1px solid #ccc"
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
