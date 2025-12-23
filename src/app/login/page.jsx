"use client";

import { useRouter } from "next/navigation";  
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();

  // ✅ Zustand hooks — ALWAYS unconditional
  const loadCart = useCartStore((s) => s.loadCart);
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const words = ["Calm", "Warm", "Sacred", "Minimal"];
  const [activeIndex, setActiveIndex] = useState(0);



// Rotate words
useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % words.length);
  }, 2000);

  return () => clearInterval(interval);
}, []);

// Redirect if already logged in
useEffect(() => {
  if (user) router.replace("/shop");
}, [user, router]);

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  const users =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("users") || "{}")
      : {};

  const foundUser = users[form.email];

  if (!foundUser || foundUser.password !== form.password) {
    setError("Invalid email or password");
    setLoading(false);
    return;
  }

  login({ email: foundUser.email, name: foundUser.name });
  loadCart(foundUser.email);
  router.push("/shop");
};

const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
   <Box
  sx={{
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
    bgcolor: "#f6f7fb",
    overflow: "hidden", // 🔑 prevents mobile overflow
  }}
>

      {/* LEFT BRAND PANEL */}
<Box
  sx={{
    position: "relative",

    // 🔑 mobile height fix
    minHeight: { xs: "32vh", sm: "45vh", md: "100vh" },

borderBottomLeftRadius: { xs: 24, md: 0 },
borderBottomRightRadius: { xs: 24, md: 0 },

    backgroundImage:
      "linear-gradient(rgba(123,108,246,0.9), rgba(138,124,248,0.9)), url(/images/candle.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",

    color: "#fff",
    px: { xs: 3, md: 10 },

    display: "flex",

    // 🔑 align top on mobile, center on desktop
    alignItems: { xs: "flex-start", md: "center" },
  }}
>



 {/* Background candle image (NO children) */}
  <Box
    component="img"
    src="/images/candle.webp"
    alt="Handcrafted candle"
    sx={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.18,
      pointerEvents: "none",
    }}
  />
<Box
  sx={{
    width: "100%",
    mt: { xs: 6, md: 0 }, // 🔑 push down on mobile only
  }}
>
  {/* EVERYTHING BELOW GOES HERE */}
  
     {/* CONTENT LAYER */}
  <Box sx={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
   <Typography
  sx={{
  fontSize: { xs: "1.9rem", sm: "2.3rem", md: "3rem" },
    fontWeight: 700,
    lineHeight: 1.15,
    mb: { xs: 2, md: 3 },
  }}
>
  Sparrow Light Studio
</Typography>


<Box
  sx={{
    display: "flex",
    gap: { xs: 2, md: 3 },
mt: { xs: 2, md: 3 },
mb: { xs: 1.5, md: 2 },

    flexWrap: "wrap",
  }}
>
  {["Calm", "Warm", "Sacred", "Minimal"].map((word) => (
   <Typography
  component="div"   // 🔑 THIS FIXES IT
  key={word}
  sx={{
    fontSize: "0.75rem",
    letterSpacing: "0.18em",
    opacity: word === "Minimal" ? 1 : 0.6,
    position: "relative",
    pb: 0.6,
  }}
>

      {word.toUpperCase()}
    {words[activeIndex] === word && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            width: 18,
            height: 2,
            bgcolor: "#fff",
            transform: "translateX(-50%)",
            borderRadius: 2,
          }}
        />
      )}
    </Typography>
  ))}
</Box>

<Typography
  sx={{
    fontSize: { xs: "0.95rem", md: "1.05rem" },
    maxWidth: 420,
    mb: { xs: 1.5, md: 3 },
    lineHeight: 1.6,
  }}
>
  Premium handcrafted candles for your perfect moments.
</Typography>
<Box
  sx={{
    display: { xs: "flex", sm: "none" },
    justifyContent: "center",
    gap: 2,
    mt: 2,
    fontSize: "0.7rem",
    opacity: 0.8,
  }}
>
  <span>🔒 Secure</span>
  <span>🚚 Fast</span>
  <span>⭐ Trusted</span>
</Box>

<Typography
  sx={{
    display: { xs: "none", sm: "block" },
    fontSize: "0.8rem",
    opacity: 0.75,
    mt: 1,
  }}
>
  Secure checkout • Fast delivery • Trusted quality
</Typography>



        </Box>
</Box>

      </Box>

      {/* RIGHT LOGIN FORM */}
    <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: { xs: 4, md: 0 }, // 🔑 mobile spacing
  }}
>

<Paper
  sx={{
    p: { xs: 3, md: 4 },
    width: "100%",
    maxWidth: 420,
    mt: { xs: -6, md: 0 }, // 🔑 mobile lift
  }}
>


          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Lock fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              Secure Login
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight={600} mb={0.5}>
            Login to your account
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Access your orders, cart and wishlist
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email address"
              name="email"
              fullWidth
              required
              margin="normal"
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
<Button
  type="submit"
  variant="contained"
  fullWidth
  disabled={loading}
  sx={{
    py: 1.4,
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    backgroundColor: "#8f7cf0",
    boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
    "&:hover": {
      backgroundColor: "#7b69e6",
    },
    "&:disabled": {
      backgroundColor: "#b7abf4",
    },
  }}
>
  {loading ? (
    <CircularProgress size={24} sx={{ color: "#fff" }} />
  ) : (
    "Login"
  )}
</Button>


          </form>

          <Divider sx={{ my: 3 }} />

          <Typography
  component="div"
  align="center"
  variant="body2"
>
  New to Candle Shop?{" "}
  <Button
    variant="text"
    sx={{ fontWeight: 600 }}
    onClick={() => router.push("/signup")}
  >
    Create account
  </Button>
</Typography>

        </Paper>
      </Box>
    </Box>
  );
}
