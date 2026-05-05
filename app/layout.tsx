"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { useEffect, useState } from "react";

import "./globals.css";
import DesktopSidebar from "./components/DesktopSidebar";
import CongratsPopup from "./components/CongratsPopUp";
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
        <head>
          {/* Google Analytics */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-RFS8XFXTZ7"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RFS8XFXTZ7');
            `}
          </Script>
          <meta name="google-adsense-account" content="ca-pub-1545445003970128"></meta>
          <meta name="google-adsense-account" content="ca-pub-2884987145159373"></meta>
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
          <div className="relative min-h-screen w-full">
            {/* SIDEBAR (fixed) */}
            <DesktopSidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />

            {/* MAIN CONTENT */}
            <main
              className={`
                min-h-screen w-full
                transition-all duration-300 ease-in-out
                pl-0
                ${collapsed ? "lg:pl-20" : "lg:pl-54"}
              `}
            >
              <Navbar />
              <PageTransition>
                {children}
              </PageTransition>
              
              <CongratsPopup />
              <Footer />
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
