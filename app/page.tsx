import { Metadata } from "next";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import Features from "./components/FeatureSection";
import HeroCTA from "./components/HeroCTA";
// import Countdown from "./components/Countdown";
import Testimonials from "./components/test";
import CongratsPopup from "./components/CongratsPopUp";
import Banner from "./components/Banner";
import YouTubePreview from "./components/Youtube";
import Dashboard from "./components/Dashboard";
import Updates from "./components/Updates";
import ToolsExplorer from "./components/ToolsExplorer";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tauzand.in"),

  title: "Tauzand | Career Intelligence",

  description:
    "iATS resume analyser, iCL cover letter, verified internship certificates, company-wise DSA prep, and IT jobs — AI career tools built for Indian IT freshers.",

  keywords: [
    "Tauzand",
    "iATS intelligent ATS resume analyser India",
    "iCL intelligent cover letter generator India",
    "verified internship certificate India",
    "company wise DSA questions India",
    "AI resume analyser IT jobs India",
    "ATS score checker India",
    "internship certificate freshers India",
    "DSA coding interview prep India",
    "cover letter generator IT jobs India",
    "IT jobs freshers India",
    "career platform students India",
    "skill validation certificate India",
    "off-campus IT jobs India",
  ],

  authors: [{ name: "Aayush Kumar Gupta" }],
  creator: "Aayush Kumar Gupta",
  publisher: "Tauzand",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.tauzand.in",
    siteName: "Tauzand",
    title: "Tauzand | Career Intelligence",
    description:
      "iATS resume analyser, iCL cover letter, verified internship certificates, company-wise DSA prep, and IT jobs — AI career tools built for Indian IT freshers.",
    images: [
      {
        url: "/tauzand.png",   // place at /public/og-image.png — 1200×630px
        width: 1200,
        height: 630,
        alt: "Tauzand — AI Career Platform for IT Freshers in India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tauzand | Career Intelligence",
    description:
      "iATS resume analyser, iCL cover letter, verified internship certificates, DSA prep, and IT jobs for freshers across India.",
    images: ["/tauzand.png"],
    creator: "@tauzand",
  },

  alternates: {
    canonical: "https://www.tauzand.in",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA (JSON-LD)
// All four products covered: iATS, iCL, Internship, DSA
// ─────────────────────────────────────────────────────────────────────────────

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [

    // ── 1. WebSite — enables Google Sitelinks Search Box ─────────────────
    {
      "@type": "WebSite",
      "@id": "https://www.tauzand.in/#website",
      "url": "https://www.tauzand.in",
      "name": "Tauzand",
      "description":
        "AI-powered career intelligence platform offering iATS resume analysis, iCL cover letter generation, mentor-backed internship certificates, company-wise DSA prep, and IT job listings for freshers in India.",
      "publisher": {
        "@id": "https://www.tauzand.in/#organization",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.tauzand.in/it-jobs?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },

    // ── 2. Organization — brand entity for Google Knowledge Panel ─────────
    {
      "@type": "Organization",
      "@id": "https://www.tauzand.in/#organization",
      "name": "Tauzand",
      "url": "https://www.tauzand.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.tauzand.in/tauzand.png",
      },
      "description":
        "MSME-registered, Startup India-recognized AI career intelligence platform helping IT freshers and students across India with resume analysis, internship certification, DSA prep, cover letter generation, and job listings.",
      "foundingDate": "2024",
      "founder": {
        "@type": "Person",
        "name": "Aayush Kumar Gupta",
        "url": "https://www.linkedin.com/in/aayush-kumar-gupta-2b7952219/",
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha",
        "postalCode": "751024",
        "addressCountry": "IN",
      },
      "sameAs": [
        "https://twitter.com/tauzand",
        "https://www.linkedin.com/company/tauzand",
      ],
    },

    // ── 3. iATS — SoftwareApplication ────────────────────────────────────
    // Intelligent and Predictive Applicant Tracking System
    {
      "@type": "SoftwareApplication",
      "name": "Tauzand iATS — Intelligent and Predictive Applicant Tracking System",
      "alternateName": "iATS Resume Analyser",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://www.tauzand.in/ai-resume-analyser",
      "description":
        "iATS evaluates IT resumes word-by-word across 8 scores and 32+ hiring parameters. Trained on 3,00,000+ real Indian IT resumes. No job description needed. 75 free lifetime credits. Monthly model updates. Scores: iATS Score, Selection Score, Percentile Rank, Market Positioning, Career Health Score, Resume Quality Score, Experience Score, Technical Compatibility Score.",
      "offers": {
        "@type": "Offer",
        "price": "Free with 75 lifetime credits",
        "priceCurrency": "INR",
        "description": "75 free lifetime analysis credits",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "740",
        "bestRating": "5",
      },
      "provider": {
        "@id": "https://www.tauzand.in/#organization",
      },
    },

    // ── 4. iCL — SoftwareApplication ─────────────────────────────────────
    // Intelligent Cover Letter Generator
    {
      "@type": "SoftwareApplication",
      "name": "Tauzand iCL — Intelligent Cover Letter Generator",
      "alternateName": "iCL Cover Letter",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://www.tauzand.in/cover-letter",
      "description":
        "iCL generates a personalized, ATS-optimized cover letter in 2 steps and under 10 seconds. Fine-tuned on 2.1 billion parameters of Indian IT recruitment data. Reads your actual resume. Written in the voice of a 20+ year Indian IT HR professional. Free for IT freshers in India.",
      "offers": {
        "@type": "Offer",
        "price": "Free with 75 lifetime credits",
        "priceCurrency": "INR",
        "description": "75 free lifetime analysis credits",
      },
      "provider": {
        "@id": "https://www.tauzand.in/#organization",
      },
    },

    // ── 5. Internship Program — EducationalOccupationalProgram ───────────
    {
      "@type": "EducationalOccupationalProgram",
      "name": "Tauzand Internship Certificate & Project Verification Program",
      "url": "https://www.tauzand.in/internship",
      "description":
        "India's mentor-backed internship certificate and project verification platform. 70+ expert mentors from IIT's, NIT's, and other top engineering colleges. 60% AI + 40% human review. Under 3-day turnaround. Monthly updated, industry-approved projects. Certificate valid 2 years, verifiable at tauzand.in/internship/validate. ₹269 one-time registration. Certification fee charged only after approval. Unlimited resubmissions.",
      "provider": {
        "@id": "https://www.tauzand.in/#organization",
      },
      "educationalProgramMode": "online",
      "timeToComplete": "P3D",
      "offers": {
        "@type": "Offer",
        "price": "269",
        "priceCurrency": "INR",
        "description": "One-time registration. Certification fee charged only after approval.",
      },
      "occupationalCategory": ["Web Development", "Artificial Intelligence", "Data Science", "Machine Learning","Backend-java","Backend-python","Frontend","SDE projects"],
    },

    // ── 6. DSA Platform — Course ─────────────────────────────────────────
    {
      "@type": "Course",
      "name": "Tauzand DSA — Company-wise Coding Interview Preparation",
      "url": "https://www.tauzand.in/DSA",
      "description":
        "800+ company-wise DSA previous year questions from real interviews at 70+ companies including Google, Microsoft, Amazon, Apple, Meta, Netflix, Adobe, TCS, infosys, wipro and more. Topic-wise sorting, Easy/Medium/Hard levels. Pattern-first approach curated by FAANG engineers. Built for placements 2026 + 2027.",
      "provider": {
        "@id": "https://www.tauzand.in/#organization",
      },
      "inLanguage": "en",
      "educationalLevel": "undergraduate",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "1380",
        "bestRating": "5",
      },
    },

    // ── 7. FAQPage — rich snippets across all products ────────────────────
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Tauzand iATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iATS stands for Intelligent and Predictive Applicant Tracking System. It is Tauzand's AI resume analysis engine trained on 3,00,000+ real Indian IT resumes. It produces 8 scores — iATS Score, Selection Score, Percentile Rank, Market Positioning, Career Health Score, Resume Quality Score, Experience Score, and Technical Compatibility Score — across 32+ hiring parameters, without requiring a job description. 75 free lifetime credits. Used after ChatGPT/Gemini/Claude as the final ATS validation step. Available at tauzand.in/ai-resume-analyser.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Tauzand iCL?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iCL stands for Intelligent Cover Letter. It generates a personalized, ATS-optimized cover letter in 2 steps and under 10 seconds by reading your actual resume. Fine-tuned on 2.1 billion parameters of Indian IT recruitment data and written in the voice of a 20+ year Indian IT HR professional. Free for freshers and IT professionals in India. Available at tauzand.in/cover-letter.",
          },
        },
        {
          "@type": "Question",
          "name": "How does the Tauzand Internship Certificate Program work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Students submit real projects across Web Development, AI, or Data Science, Backend-java, Backend-python, Frontend, SDE projects etc. Each project is reviewed by 70+ expert mentors via a 60% AI automations + 40% human process in under 3 days. Projects are monthly updated and industry-approved. Upon approval, a verifiable 2-year certificate is issued. ₹269 one-time registration. Certification fee charged only after approval. Unlimited resubmissions at no extra charge. Certificates verifiable at tauzand.in/internship/validate.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the Tauzand DSA platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand DSA has 800+ previous year questions from real company coding interviews at 70+ companies including Google, Microsoft, Amazon, Apple, Meta, Flipkart, and more. Questions are organized company-wise, topic-wise, and by difficulty (Easy/Medium/Hard). Pattern-first approach curated by FAANG engineers. 1380+ engineering students enrolled. Available at tauzand.in/DSA.",
          },
        },
        {
          "@type": "Question",
          "name": "How is Tauzand different from other career platforms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand is the only platform that combines iATS (8-score intelligent resume analysis), iCL (2-step HR-quality cover letters), mentor-verified internship certificates with monthly updated projects, company-wise DSA prep with 800+ real PYQs, and a daily-updated IT jobs board — all built specifically for Indian IT freshers at affordable pricing.",
          },
        },
      ],
    },

  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Banner
        isPositive={false}
        message="Formerly VFound! Same platform, stronger identity."
      />
      <Hero />
      <YouTubePreview />
      <ToolsExplorer />
      <Features />
      <Dashboard />
      <Testimonials />
      <FAQ />
      <CongratsPopup />
      <Updates />
      <HeroCTA />
      {/* <Countdown /> */}
    </>
  );
};

export default Page;