"use client";

import { SessionProvider } from "next-auth/react";
import MuiProvider from "@/providers/MuiProvider";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Footer from "@/components/Footer";
import SocialBar from "@/components/SocialBar";
import PromoPopup from "@/components/PromoPopup";
import TopSaleBanner from "@/components/TopSaleBanner";
import "./globals.css";


export default function RootLayout({ children }) {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);
  
  return (
    <html lang="en">
      <body style={{ borderRadius: 0, overflowX: "hidden" }} suppressHydrationWarning>
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
