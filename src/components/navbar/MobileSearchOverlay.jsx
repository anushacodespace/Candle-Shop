"use client";

import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MobileSearchOverlay({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 1300,
        }}
      />

      {/* SEARCH PANEL */}
      <Box
        sx={{
          position: "fixed",
          top: 72, // just below navbar
          left: "50%",
          transform: "translateX(-50%)",
          width: "92%",
          maxWidth: 520,
          background: "#fff",
          borderRadius: 3,
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          zIndex: 1400,
          p: 2,
        }}
      >
        {/* SEARCH INPUT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            height: 44,
            borderRadius: "999px",
            background: "#f5f5f5",
          }}
        >
          <SearchIcon sx={{ color: "#666" }} />

          <input
            autoFocus
            value={query}
            placeholder="Search candles, fragrances, gift sets..."
            onChange={(e) => setQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: 14,
              background: "transparent",
            }}
          />

          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* RESULTS */}
        <Box sx={{ mt: 1, maxHeight: 320, overflowY: "auto" }}>
          {loading && <Box sx={{ p: 1, color: "#777" }}>Searching…</Box>}

          {!loading && results.length === 0 && query && (
            <Box sx={{ p: 1, color: "#777" }}>No results found</Box>
          )}

          {results.map((item) => (
            <Box
              key={item._id}
              onClick={() => {
                router.push(`/product/${item._id}`);
                onClose();
              }}
              sx={{
                px: 1.5,
                py: 1,
                cursor: "pointer",
                borderRadius: 1,
                "&:hover": { background: "#f0f0f0" },
              }}
            >
              🔍 {item.name}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
