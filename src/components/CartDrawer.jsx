"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCartStore } from "@/store/cartStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const {
  cart,
  isOpen,
  closeCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = useCartStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <Box sx={{ width: isMobile ? "100%" : 360, p: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={closeCart}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Cart Items */}
        {cart.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Cart is empty</Typography>
        ) : (cart.map((item) => (
  <Box key={`cart-item-${item.id}`} sx={{ mt: 2 }}>
    <Typography>{item.name}</Typography>

    <Typography variant="body2" color="text.secondary">
      ₹{item.price}
    </Typography>

    {/* Quantity Controls */}
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      <IconButton size="small" onClick={() => decreaseQty(item.id)}>
        <RemoveIcon />
      </IconButton>

      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>

      <IconButton size="small" onClick={() => increaseQty(item.id)}>
        <AddIcon />
      </IconButton>
    </Box>

    <Button
      size="small"
      color="error"
      fullWidth={isMobile}
      sx={{ mt: 1 }}
      onClick={() => removeFromCart(item.id)}
    >
      Remove
    </Button>

    <Divider sx={{ mt: 1 }} />
  </Box>
)))
}

        {/* Checkout */}
        {cart.length > 0 && (
          <Button
  fullWidth
  size="large"
  variant="contained"
  sx={{ mt: 3 }}
  onClick={() => {
    closeCart();
    router.push("/checkout");
  }}
>
  Checkout
</Button>

        )}
      </Box>
    </Drawer>
  );
}
