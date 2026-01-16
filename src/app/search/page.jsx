"use client";

import {
  Box,
  Typography,
  TextField,
  List,
  ListItemButton,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔁 reuse SAME api as desktop
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
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography fontWeight={700} mb={2}>
        Search Products
      </Typography>

      <TextField
        autoFocus
        fullWidth
        placeholder="Search candles, fragrances, gift sets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <CircularProgress size={22} />
        </Box>
      )}

      {!loading && results.length === 0 && query && (
        <Typography sx={{ mt: 2, color: "#777" }}>
          No results found
        </Typography>
      )}

      <List>
        {results.map((item) => (
          <ListItemButton
            key={item._id}
            onClick={() => router.push(`/product/${item._id}`)}
          >
            🔍 {item.name}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
