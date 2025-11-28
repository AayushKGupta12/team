import { Geist, Geist_Mono } from "next/font/google";

import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import Navbar from "./components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vfound.in | Developer Tools & Smart Resume Checker",
  description:
    "Hyper-advanced resume analysis and job compatibility checker with built-in latest IT sector news and developer tools.",
};


export default function RootLayout({ children }) {
   return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}