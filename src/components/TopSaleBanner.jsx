"use client";
import { Box, Button, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState } from "react";

export default function TopSaleBanner() {
  const [show, setShow] = useState(true);

  // detect mobile
  const isMobile = useMediaQuery("(max-width:600px)");

  if (!show) return null;

  return (
    <Box
      sx={{
        width: "100%",
        background: "#ff1766",
        color: "white",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 1,
        fontSize: { xs: "11px", md: "14px" },
        position: "relative",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >

      {/* 🔁 SCROLLING TEXT */}
      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 18s linear infinite",
          "@keyframes marquee": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
        }}
      >
        {isMobile ? (
          <>
            <span style={{ marginRight: 32 }}>🔥 Flat 10% OFF Today</span>
            <span style={{ marginRight: 32 }}>🎁 Free Gift Above ₹999</span>
            <span style={{ marginRight: 32 }}>🚚 Free Shipping Available</span>

            {/* duplicate for looping */}
            <span style={{ marginRight: 32 }}>🔥 Flat 10% OFF Today</span>
            <span style={{ marginRight: 32 }}>🎁 Free Gift Above ₹999</span>
            <span style={{ marginRight: 32 }}>🚚 Free Shipping Available</span>
          </>
        ) : (
          <>
            <span style={{ marginRight: 40 }}>BLACK FRIDAY SALE</span>
            <span style={{ marginRight: 40 }}>| 50% OFF + 1 FREE MONTH |</span>
            <span style={{ marginRight: 40 }}>LIMITED TIME DEAL</span>

            {/* duplicate */}
            <span style={{ marginRight: 40 }}>BLACK FRIDAY SALE</span>
            <span style={{ marginRight: 40 }}>| 50% OFF + 1 FREE MONTH |</span>
            <span>PAY ON DELIVERY COD AVAILABLE</span>
          </>
        )}
      </Box>

      {/* 🎯 ACTION BUTTON + CLOSE */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: 10, md: 40 },
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Link href="/offers">
          <Button
            size="small"
            sx={{
              background: "white",
              color: "#ff1766",
              fontWeight: 700,
              textTransform: "none",
              px: { xs: 1.8, md: 2.5 },
              py: { xs: 0.4, md: 0.6 },
              borderRadius: "18px",
              fontSize: { xs: "11px", md: "13px" },
              boxShadow: "0 2px 6px rgba(0,0,0,.2)",
              "&:hover": { background: "#f9f9f9" },
            }}
          >
            Grab Deal
          </Button>
        </Link>

        <CloseIcon
          onClick={() => setShow(false)}
          sx={{
            cursor: "pointer",
            fontSize: { xs: 16, md: 18 },
            color: "white",
            "&:hover": { opacity: 0.7 },
          }}
        />
      </Box>
    </Box>
  );
}
