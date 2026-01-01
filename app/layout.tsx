import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import CongratsPopup from "./components/CongratsPopUp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "VFound – AI Resume Analyzer & IT Jobs in India",
    template: "%s | VFound",
  },
  description:
    "vfound is an AI-powered CareerTech SaaS(Software as a Service) helping undergraduates build ATS-ready resumes, generate job-specific cover letters, and discover real off-campus opportunities.",
  keywords: [
    "Developer Builder",
    "AI resume analyzer",
    "resume ATS checker",
    "IT jobs India",
    "software jobs India",
    "cover letter generator",
    "resume analysis for developers",
    "ATS score for my resume",
    "How to make resume",
    "How to make cover letter",
  ],
  metadataBase: new URL("https://vfound.in"),
  alternates: {
    canonical: "https://vfound.in",
  },
  openGraph: {
    title: "VFound - Smart Resume Analyzer & IT Jobs Platform",
    description:
      "Analyze your resume, generate ATS-optimized cover letters, and apply to verified IT jobs in India.",
    url: "https://vfound.in",
    siteName: "VFound",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
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
        </head>

        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
            {children}
            <CongratsPopup />
        </body>
      </html>
    </ClerkProvider>
  );
}
