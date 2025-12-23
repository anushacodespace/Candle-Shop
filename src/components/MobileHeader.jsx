"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MobileHeader() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        display: { xs: "flex", md: "none" }, // 👈 MOBILE ONLY
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        background:
          "linear-gradient(90deg, #7b6cf6 0%, #8a7cf8 100%)",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
      }}
    >
      {/* Brand */}
      <Typography fontWeight={700} fontSize="1rem">
        🕯️ Sparrow Light
      </Typography>

      {/* Actions */}
      <Box display="flex" gap={1}>
        <Button
          size="small"
          onClick={() => router.push("/login")}
          sx={{
            color: "#fff",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Login
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push("/signup")}
          sx={{
            borderColor: "rgba(255,255,255,0.6)",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#fff",
            },
          }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
}
