"use client";

import { Box, Typography, TextField, Button, Container, Stack, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function ContactPage() {
  return (
    <>
      {/* TOP BANNER */}
      <Box
        sx={{
          width: "100%",
          height: 280,
          backgroundImage: "url('/images/contact-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,.4)" }}
        >
          Contact Us
        </Typography>
      </Box>

      <Container sx={{ py: 5 }}>
        <Stack direction={{ md: "row", xs: "column" }} spacing={6}>
          
          {/* LEFT — DETAILS */}
          <Box flex={1}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              Get in Touch
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Have questions about candles, bulk orders, customization — or anything else?  
              We’re happy to help!
            </Typography>

            <Typography sx={{ mt: 1 }}><b>📍 Address:</b> Sparrow Light Studio</Typography>
            <Typography sx={{ mt: 1 }}><b>📞 Phone:</b> +91-98765-43210</Typography>
            <Typography sx={{ mt: 1 }}><b>📧 Email:</b> hello@sparrowlightstudio.com</Typography>
       
          </Box>

          {/* RIGHT — FORM */}
          <Box flex={1}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Send us a Message
            </Typography>

            <Stack spacing={2}>
              <TextField label="Your Name" fullWidth />
              <TextField label="Email Address" fullWidth />
              <TextField label="Phone Number" fullWidth />
              <TextField label="Message" multiline rows={4} fullWidth />

              <Button variant="contained" size="large">
                Submit
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
