"use client";

import { Box, Typography, Container } from "@mui/material";

export default function AboutPage() {
  return (
    <>
      {/* 🔹 HERO SECTION */}
      <Box
        sx={{
          width: "100vw",
          height: { xs: 260, md: 420 },
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      >
        <img
          src="/images/about-hero.png"      // <-- add image in public/images/
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Text Over Image */}
       
      </Box>

      {/* 🔹 CONTENT SECTION */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Our Story
        </Typography>

        <Typography sx={{ mb: 3, lineHeight: 1.7 }}>
          Sparrow Light Studio was born from a passion for handcrafted candles,
          peaceful homes, and warm memories. Every candle we make is poured with
          love — using premium wax, long-lasting fragrance, and safe ingredients.
        </Typography>

        <Typography sx={{ lineHeight: 1.7 }}>
          Our mission is simple: create candles that smell beautiful, look elegant,
          and bring calmness into your space. Whether it’s festivals, gifting, or
          everyday comfort — we’ve got something special for you.
        </Typography>
      </Container>
    </>
  );
}
