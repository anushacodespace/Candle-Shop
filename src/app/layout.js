"use client";

import "./globals.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import MuiProvider from "@/providers/MuiProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialBar from "@/components/SocialBar";
import PromoPopup from "@/components/PromoPopup";
import TopSaleBanner from "@/components/TopSaleBanner";


import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function RootLayout({ children }) {
  const initAuth = useAuthStore((s) => s.initAuth);
  const user = useAuthStore((s) => s.user);
  const loadCart = useCartStore((s) => s.loadCart);

  /* Init auth once */
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  /* Load cart when user logs in */
  useEffect(() => {
    if (user?.email) {
      loadCart(user.email);
    }
  }, [user, loadCart]);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
       
      >
        <SessionProvider>
          <MuiProvider>
            <TopSaleBanner />
            <Navbar />

            {children}
            <SocialBar />
            <PromoPopup />
            <Footer />
          </MuiProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
