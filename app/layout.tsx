"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { useEffect, useState } from "react";

import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);

  // ✅ Desktop open by default, mobile collapsed
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setCollapsed(false);
    }
  }, []);

  return (
    <ClerkProvider>
      <html lang="en">

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
          <div className="relative min-h-screen w-full">
            {/* MAIN CONTENT */}
            <main>
              <Navbar />
                {children}
              <Footer />
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
