/**
 * app/internship/page.tsx
 *
 * Fixes applied vs previous version:
 *
 * 1. CLOAKING REMOVED — hidden aria-hidden div with duplicate SEO content
 *    is a direct Google spam policy violation. Removed entirely.
 *    Ref: https://developers.google.com/search/docs/essentials/spam-policies#cloaking
 *
 * 2. canonical fixed: "https://Tauzand.in/internship" → "https://www.tauzand.in/internship"
 *    (wrong casing + missing www — was causing canonical mismatch in Search Console)
 *
 * 3. OG image fixed: "https://vfound.in/og-internship.png" → "https://www.tauzand.in/og-internship.png"
 *
 * 4. OG url fixed: "https://Tauzand.in/internship" → "https://www.tauzand.in/internship"
 *
 * 5. siteName fixed: "Tauzand (formerly VFound)" → "Tauzand"
 *
 * 6. Organization schema url fixed: "https://vfound.in" → "https://www.tauzand.in"
 *
 * 7. Pricing in schema fixed: "₹2 / ₹3" tiers (obviously wrong placeholder values)
 *    → correct values based on your actual page: ₹220 / ₹290 / ₹340
 *    Update these if your actual prices differ.
 *
 * 8. InternshipStructuredData component kept — your existing component is fine.
 *    The JSON-LD schemas here are ADDITIONAL and complementary.
 *
 * 9. Script tags replaced with <script> — next/script is for external src scripts,
 *    not inline JSON-LD. Using dangerouslySetInnerHTML directly is correct here.
 *
 * 10. Keywords cleaned — removed full sentences used as keywords (bad practice).
 *     Kept all legitimate short-phrase keywords.
 */

import type { Metadata } from "next";
import InternshipFeature from "../components/InternshipFeature";
import FAQ5 from "../components/FAQ5";
import InternshipShowcase from "../components/InternshipFeature2";
import InternshipHero from "../components/InternshipHero";
import InternshipStructuredData from "../components/InternshipStructuredData";
import InternTest from "../components/InternTest";
import InternshipFeature3 from "../components/InternshipFeature3";
import ProblemSection from "../components/ProblemSection";
import ComparisonSection from "../components/ComparisonSection";
import InternPrice from "../components/InternPrice";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // Title: ~65 chars — what users actually search + brand
  title: "Verified Internship Certificates & Project Validation India | Tauzand",

  // Description: ≤160 chars — mentor-backed, fast, risk-free pricing, trust
  description:
    "Get a mentor-verified internship certificate in under 3 days. 70+ expert mentors. 60% AI + 40% human review. Monthly updated projects. ₹269 one-time. Risk-free.",

  keywords: [
    // Primary intent
    "internship certificate validation India",
    "project verification platform India",
    "skill authentication certificate India",
    "verified internship certificate India",
    "mentor backed internship certificate India",
    // Supporting
    "proof of work platform India",
    "project authenticity verification India",
    "fake certificate detection India",
    "recruiter trusted certificate India",
    "internship verification platform India",
    // Student targeting
    "internship certificate B.Tech students India",
    "internship certificate BCA MCA India",
    "internship for engineering students India 2026",
    "internship certificate freshers India 2026",
    // Brand
    "Tauzand internship",
    "Tauzand certificate",
    "Tauzand project verification",
    // Geo
    "internship certificate Bhubaneswar",
    "internship certificate Patna",
    "tech internship Odisha 2026",
    "tech internship Bihar 2026",
    "skill certificate India 2026",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Verified Internship Certificates & Project Validation India | Tauzand",
    description:
      "India's mentor-backed project verification platform. 70+ expert mentors. 60% AI + 40% human review. Under 3-day turnaround. ₹269 one-time. Trusted by Indian recruiters.",
    // FIXED: was "https://Tauzand.in/internship" — wrong casing + no www
    url: "https://www.tauzand.in/internship",
    // FIXED: was "Tauzand (formerly VFound)"
    siteName: "Tauzand",
    locale: "en_IN",
    type: "website",
    images: [
      {
        // FIXED: was "https://vfound.in/og-internship.png"
        url: "https://www.tauzand.in/og-internship.png",
        width: 1200,
        height: 630,
        alt: "Tauzand — Verified Internship Certificate & Project Validation Platform India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Verified Internship Certificates | Tauzand India",
    description:
      "Mentor-backed project verification. 60% AI + 40% human review. 70+ mentors. Under 3-day turnaround. ₹269 one-time registration.",
    // FIXED: was "https://Tauzand.in/og-internship.png"
    images: ["https://www.tauzand.in/og-internship.png"],
    creator: "@tauzand",
  },

  // FIXED: was "https://Tauzand.in/internship" — capital T + no www
  alternates: {
    canonical: "https://www.tauzand.in/internship",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
// ─────────────────────────────────────────────────────────────────────────────

// Organization schema — establishes brand entity for Google
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.tauzand.in/#organization",
  "name": "Tauzand",
  // FIXED: was "https://vfound.in"
  "url": "https://www.tauzand.in",
  "description":
    "MSME-registered, Startup India-recognized AI career intelligence platform providing mentor-backed internship certificate validation and project verification for students and freshers across India.",
  "foundingDate": "2024",
  "areaServed": { "@type": "Country", "name": "India" },
  "founder": {
    "@type": "Person",
    "name": "Aayush Kumar Gupta",
    "jobTitle": "Founder & CEO",
    "sameAs": "https://www.linkedin.com/in/aayush-kumar-gupta-2b7952219/",
  },
  // Pricing tiers — FIXED from placeholder "₹2 / ₹3" to actual values
  // Update these numbers if your InternPrice component shows different amounts
  "offers": [
    {
      "@type": "Offer",
      "name": "Platform Registration — Lifetime Access",
      "price": "269",
      "priceCurrency": "INR",
      "description": "One-time registration fee for lifetime platform access. Unlimited resubmissions included.",
    },
    {
      "@type": "Offer",
      "name": "Skill Authentication Certificate — Tier 1 (30 Days)",
      "price": "220",
      "priceCurrency": "INR",
      "description": "Certification fee charged only after mentor approval. Includes 1-month / 30-day internship certificate.",
    },
    {
      "@type": "Offer",
      "name": "Skill Authentication Certificate — Tier 2 (45 Days)",
      "price": "290",
      "priceCurrency": "INR",
      "description": "Certification fee charged only after mentor approval. Includes 45-day internship certificate.",
    },
    {
      "@type": "Offer",
      "name": "Skill Authentication Certificate — Tier 3 (60 Days)",
      "price": "340",
      "priceCurrency": "INR",
      "description": "Certification fee charged only after mentor approval. Includes 2-month / 60-day internship certificate.",
    },
  ],
};

// EducationalOccupationalProgram — correct schema type for an internship program
const programSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "Tauzand Internship Certificate & Project Verification Program",
  "url": "https://www.tauzand.in/internship",
  "description":
    "India's mentor-backed internship certificate and project verification platform. Students submit real projects across Web Development, AI, or Data Science. 70+ expert mentors review via 60% AI + 40% human process in under 3 days. Monthly updated, industry-approved projects. Certificate valid 2 years. Verifiable at tauzand.in/internship/validate. ₹269 one-time registration. Certification fee charged only after approval. Unlimited resubmissions.",
  "provider": {
    "@id": "https://www.tauzand.in/#organization",
  },
  "educationalProgramMode": "online",
  "timeToComplete": "P3D",
  "inLanguage": "en",
  "occupationalCategory": ["Web Development", "Artificial Intelligence", "Data Science"],
  "offers": {
    "@type": "Offer",
    "price": "269",
    "priceCurrency": "INR",
    "description": "One-time registration. Certification fee charged only after mentor approval.",
    "url": "https://www.tauzand.in/internship",
  },
};

// FAQPage — drives rich result snippets, helps LLMs answer questions accurately
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Tauzand a legitimate project verification platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Tauzand is an MSME-registered, Startup India-recognized platform founded in 2024. It operates with 70+ active expert mentors who manually review student project submissions alongside an AI screening system. Every certificate carries a unique verifiable ID. Authenticity can be checked instantly at tauzand.in/internship/validate.",
      },
    },
    {
      "@type": "Question",
      "name": "What is internship certificate validation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Internship certificate validation is independent verification that a student genuinely completed the project or internship work they claim. Tauzand provides this through 70+ expert mentors who review submissions for originality and technical depth, then issue a recruiter-verifiable digital certificate — not a self-reported credential.",
      },
    },
    {
      "@type": "Question",
      "name": "How does project verification work on Tauzand?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tauzand uses a 60% automated + 40% manual verification process. The automated layer screens for plagiarism and code originality. A domain expert mentor then reviews the project manually. The full review completes in under 3 days. Unlimited resubmissions are included at no extra charge.",
      },
    },
    {
      "@type": "Question",
      "name": "Are Tauzand internship projects updated regularly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All projects at tauzand.in/internship/project are updated monthly and are industry-approved and market-validated by domain experts before being made available to students. Self-made, independently built projects are also accepted.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens if my project is rejected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You receive detailed mentor feedback and can resubmit unlimited times at no extra charge. The ₹269 registration fee is never forfeited on rejection. Certification fee is charged only after approval.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does Tauzand internship certification cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Registration is ₹269 one-time for lifetime platform access. Certification fee is charged only after your project is approved: Tier 1 (30-day certificate) is ₹220, Tier 2 (45-day) is ₹290, and Tier 3 (60-day) is ₹340. No hidden fees. No resubmission charges.",
      },
    },
    {
      "@type": "Question",
      "name": "How long is the Tauzand internship certificate valid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Certificates issued by Tauzand are valid for 2 years from the date of issuance. Any recruiter or institution can verify authenticity instantly using the certificate ID at tauzand.in/internship/validate.",
      },
    },
    {
      "@type": "Question",
      "name": "Who can apply for the Tauzand Internship Certificate Program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The program is open to all engineering and technology students across India — B.Tech, BCA, MCA, and BSc students from any state and any year of study. No CGPA cutoff, no branch restriction. CSE, IT, ECE, and related branches are all eligible.",
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function InternshipPage() {
  return (
    <>
      {/* Your existing structured data component — kept as-is */}
      <InternshipStructuredData />

      {/* Additional JSON-LD schemas — organization, program, FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <InternshipHero />
        <ProblemSection />
        <ComparisonSection />
        <InternshipFeature />
        <InternshipShowcase />
        <InternshipFeature3 />
        <InternTest />
        <InternPrice />
        <FAQ5 />
      </main>
    </>
  );
}