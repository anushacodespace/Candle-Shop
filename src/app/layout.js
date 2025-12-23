"use client";

import { SessionProvider } from "next-auth/react";
import MuiProvider from "@/providers/MuiProvider";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Header from "@/components/Header";


export default function RootLayout({ children }) {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);
  
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SessionProvider>
          <MuiProvider>
            <Navbar />
            {children}
          </MuiProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
