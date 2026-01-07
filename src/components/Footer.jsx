"use client";

import { Box, Typography, TextField, Button, Grid, Link, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Newsletter from "./Newsletter";
import { useState } from "react";

export default function Footer() {
     const [openForm, setOpenForm] = useState(false);
  return (
    <Box sx={{ mt: 6, background: "#032c70", color: "#fff" }}>
      
      {/* SUBSCRIBE BAR */}
     {/* SUBSCRIBE BAR */}
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        {!openForm ? (
          // 👉 Only button first
          <Button
            variant="contained"
            onClick={() => setOpenForm(true)}
          >
            Subscribe
          </Button>
        ) : (
          // 👉 When clicked → show full form
          <Box
  sx={{
    width: "70%",
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    p: 2,
    gap: 2,
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
  }}
>
  <Newsletter />

  <Button
    sx={{ color: "#6a11cb", textTransform: "none" }}
    onClick={() => setOpenForm(false)}
  >
    Close
  </Button>
</Box>

        )}
      </Box>


      {/* LINKS ROW */}
      <Grid
        container
        spacing={2}
        sx={{
          px: 6,
          pb: 4,
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,.2)",
          pt: 3,
        }}
      >
        <Grid item xs={12} md={10}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              fontSize: 15,
            }}
          >
            {[
              "My Account",
              "Track Order",
              "About Us",
              "Products",
              "Contact us",
              "Franchise",
              "Privacy policy",
              "Terms & Conditions",
              "Return policy",
              "Shipping policy",
              "Pricing Policy",
            ].map((text) => (
              <Link
                key={text}
                sx={{ color: "#fff", textDecoration: "none" }}
                href="#"
              >
                {text}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* SOCIAL ICONS */}
        <Grid item xs={12} md={2} sx={{ textAlign: "right" }}>
          <IconButton
            href="#"
            sx={{ color: "#fff" }}
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            href="https://www.instagram.com/sparrow_light_studio?utm_source=qr&igsh=OHJmcTI2YzludHU3"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <InstagramIcon />
          </IconButton>

          <IconButton href="#" sx={{ color: "#fff" }}>
            <WhatsAppIcon />
          </IconButton>
        </Grid>
      </Grid>

      
            {/* COPYRIGHT BAR */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          borderTop: "1px solid rgba(255,255,255,.2)",
          fontSize: 14,
          opacity: 0.9,
        }}
      >
        © {new Date().getFullYear()} <b>Sparrow Light Studio</b> — All Rights Reserved
      </Box>

    </Box>
  );
}
