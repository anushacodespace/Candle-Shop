"use client";

import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function ChatBubble() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
      }}
    >
      {/* ❌ Close */}
      <IconButton
        size="small"
        onClick={() => setVisible(false)}
        sx={{
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          "&:hover": { background: "#f4f4f4" },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* 💬 Chat Bubble */}
      <IconButton
        sx={{
          background: "#7b6cf6",
          width: 56,
          height: 56,
          color: "#fff",
          boxShadow: "0 10px 22px rgba(0,0,0,.18)",
          "&:hover": { background: "#6756e3" },
        }}
        onClick={() => alert("Chat feature coming soon 🙂")}
      >
        <ChatBubbleOutlineIcon />
      </IconButton>
    </Box>
  );
}
