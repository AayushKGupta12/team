/**
 * app/cover-letter/page.tsx
 *
 * Fixes vs previous version:
 *
 * 1. CLOAKING REMOVED (two instances):
 *    a) `<div className="sr-only" aria-hidden="false">` — Tailwind sr-only hides
 *       content visually but aria-hidden="false" explicitly tells crawlers to read it.
 *       Content shown to bots but not users = cloaking.
 *    b) `<h1 className="sr-only">` inside <main> — a visually hidden H1 that
 *       differs from what users see is also cloaking. If your HeroCTA component
 *       has a visible H1, this creates a duplicate hidden H1 mismatch.
 *       All signal moved to metadata, keywords, and structured data.
 *    Ref: https://developers.google.com/search/docs/essentials/spam-policies#cloaking
 *
 * 2. metadataBase casing fixed: `https://www.Tauzand.in` → `https://www.tauzand.in`
 *    Capital-T changes URL resolution for all relative paths.
 *
 * 3. All `https://www.Tauzand.in` occurrences fixed → `https://www.tauzand.in`
 *    Affected: OG url, OG image, Twitter images, canonical, author url,
 *    all structured data @id and url fields (11 occurrences total)
 *
 * 4. Twitter creator fixed: '@Tauzand' → '@tauzand'
 *
 * 5. `new Date().toISOString().split('T')[0]` in WebPage schema — REMOVED.
 *    Causes Next.js server/client hydration mismatch. Replaced with fixed date.
 *    Update manually when you make major content changes.
 *
 * 6. Product schema REMOVED — same reason as iATS page. Google's Product rich
 *    result requires a purchasable item. A free SaaS tool is SoftwareApplication.
 *    Having both creates a schema conflict Google ignores anyway.
 *
 * 7. Breadcrumb moved INTO the main @graph — one @graph per page is cleaner
 *    and lets Google understand entity relationships.
 *
 * 8. Multiple <script> JSON-LD tags → single consolidated @graph.
 *
 * 9. Keyword year updated: "2025" → "2026"
 *
 * 10. author fixed: name changed from 'Tauzand' → 'Aayush Kumar Gupta'
 *     (creator field = person, publisher field = company)
 */

import { Metadata } from "next";
import CoverHero from "../components/CoverHero";
import Cover from "../components/Cover";
import CoverFeatures from "../components/CoverFeatures";
import FAQ3 from "../components/FAQ3";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // FIXED: was `https://www.Tauzand.in` — capital T
  metadataBase: new URL("https://www.tauzand.in"),

  // Title: ~62 chars — product name + 2-step differentiator + brand
  title: "iCL Cover Letter | Tauzand",

  // Description: ≤160 chars — 2 steps, HR voice, ATS-optimized, free, fast
  description:
    "iCL by Tauzand generates ATS-optimized, HR-quality cover letters in 2 steps and under 10 seconds. Reads your actual resume. Written by a 20+ year IT HR expert. Free.",

  keywords: [
    // Core iCL brand
    "iCL cover letter",
    "intelligent cover letter generator India",
    "AI cover letter generator IT jobs India",
    "ATS cover letter generator India",
    "resume based cover letter generator",
    "cover letter generator 2 steps",
    // High-intent long-tail
    "cover letter written by HR expert AI India",
    "cover letter for freshers IT India",
    "cover letter for software developer India",
    "cover letter for data science jobs India",
    "cover letter for internship India",
    "best AI cover letter generator India 2026",
    "instant cover letter generator free India",
    "editable AI cover letter PDF India",
    "cover letter trained on Indian IT hiring",
    // Broad supporting
    "AI cover letter India",
    "free cover letter generator India",
    "professional cover letter IT India",
    "ATS friendly cover letter India",
    "cover letter for IT professionals India",
    "Tauzand iCL",
    "Tauzand cover letter",
  ],

  // FIXED: author name was 'Tauzand' (company, not person)
  authors: [{ name: "Aayush Kumar Gupta", url: "https://www.tauzand.in" }],
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
    // FIXED: was `https://www.Tauzand.in/cover-letter` — capital T
    url: "https://www.tauzand.in/cover-letter",
    siteName: "Tauzand",
    title: "iCL Cover Letter | Tauzand",
    description:
      "Generate a professional cover letter in 2 steps with iCL by Tauzand. Upload resume + enter job details — ATS-optimized, HR-quality, instantly downloadable. Free.",
    images: [
      {
        // FIXED: was `https://www.Tauzand.in/cover-letter-og.jpg` — capital T
        url: "https://www.tauzand.in/cover-letter-og.jpg",
        width: 1200,
        height: 630,
        alt: "Tauzand iCL — Intelligent Cover Letter Generator for Indian IT Jobs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "iCL Cover Letter | Tauzand",
    description:
      "Upload resume + enter job details → professional, ATS-friendly cover letter in the voice of a 20-year IT HR expert. Under 10 seconds. Free by Tauzand.",
    // FIXED: was `https://www.Tauzand.in/cover-letter-og.jpg` — capital T
    images: ["https://www.tauzand.in/cover-letter-og.jpg"],
    // FIXED: was '@Tauzand' — capital T
    creator: "@tauzand",
  },

  alternates: {
    // FIXED: was `https://www.Tauzand.in/cover-letter` — capital T
    canonical: "https://www.tauzand.in/cover-letter",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
// All schemas in one @graph. All URLs fixed to www.tauzand.in (lowercase).
// ─────────────────────────────────────────────────────────────────────────────

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [

    // ── 1. Organization ───────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": "https://www.tauzand.in/#organization",
      "name": "Tauzand",
      "url": "https://www.tauzand.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.tauzand.in/logo.png",
      },
      "sameAs": [
        "https://twitter.com/tauzand",
        "https://www.linkedin.com/company/tauzand",
        "https://youtube.com/@tauzand",
      ],
    },

    // ── 2. WebPage ────────────────────────────────────────────────────────
    {
      "@type": "WebPage",
      // FIXED: was `https://www.Tauzand.in/cover-letter#webpage`
      "@id": "https://www.tauzand.in/cover-letter#webpage",
      "url": "https://www.tauzand.in/cover-letter",
      "name": "iCL Cover Letter | Tauzand",
      "description":
        "iCL (Intelligent Cover Letter) by Tauzand generates ATS-optimized, HR-quality cover letters in 2 steps. Upload resume + enter job title and company name. iCL reads your actual resume, understands your target role, and writes a tailored cover letter in the voice of a 20+ year Indian IT HR expert. Free, editable, instantly downloadable as PDF.",
      "inLanguage": "en-IN",
      // FIXED: was `new Date().toISOString()` — causes hydration mismatch
      "dateModified": "2026-05-01",
      "isPartOf": {
        "@id": "https://www.tauzand.in/#website",
      },
      "about": {
        "@type": "Thing",
        "name": "iCL — Intelligent Cover Letter",
        "description":
          "iCL is Tauzand's AI-powered cover letter generation engine fine-tuned on 2.1 billion parameters of Indian IT recruitment data. It reads the user's actual resume word-by-word, understands the target role and company, and generates a professional cover letter in the voice of a seasoned Indian IT HR professional with 20+ years of experience — ATS-optimized, human-quality, in under 10 seconds.",
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.tauzand.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "iCL — Intelligent Cover Letter",
            "item": "https://www.tauzand.in/cover-letter",
          },
        ],
      },
    },

    // ── 3. SoftwareApplication ────────────────────────────────────────────
    {
      "@type": "SoftwareApplication",
      // FIXED: was `https://www.Tauzand.in/cover-letter#app`
      "@id": "https://www.tauzand.in/cover-letter#app",
      "name": "Tauzand iCL — Intelligent Cover Letter Generator",
      "alternateName": [
        "iCL Cover Letter Generator",
        "Intelligent Cover Letter by Tauzand",
        "Tauzand AI Cover Letter",
        "AI Cover Letter Generator India",
      ],
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "CoverLetterGenerator",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a modern web browser with JavaScript enabled",
      // FIXED: was `https://www.Tauzand.in/cover-letter`
      "url": "https://www.tauzand.in/cover-letter",
      "description":
        "iCL (Intelligent Cover Letter) by Tauzand is a 2-step AI cover letter generator fine-tuned on 2.1 billion parameters of Indian IT recruitment data. It reads your actual resume completely, understands your target role and company, and generates a professional cover letter in the voice of a 20+ year Indian IT HR expert in under 10 seconds. ATS-optimized, human-quality, fully editable, instantly downloadable as PDF. Free for IT professionals and freshers in India.",
      "featureList": [
        "2-step generation — upload resume + enter job details, done",
        "Resume-aware — reads your actual resume, not a template",
        "Written in the voice of a 20+ year Indian IT HR professional",
        "Human-quality, non-robotic tone",
        "ATS-optimized keywords and formatting",
        "Role and company specific — no two letters are the same",
        "Fine-tuned on 2.1 billion parameters of Indian IT hiring data",
        "Generated in under 10 seconds",
        "Fully editable after generation",
        "Instant PDF download",
        "Free for IT professionals and freshers in India",
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "description": "Free AI cover letter generation for IT professionals and freshers in India",
        "eligibleRegion": {
          "@type": "Country",
          "name": "India",
        },
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "6000",
        "bestRating": "5",
        "worstRating": "1",
      },
      "provider": {
        "@id": "https://www.tauzand.in/#organization",
      },
    },

    // ── 4. HowTo — drives "how to" rich results ───────────────────────────
    {
      "@type": "HowTo",
      "name": "How to Generate a Professional Cover Letter with Tauzand iCL",
      "description":
        "Generate an ATS-optimized, HR-quality cover letter in 2 steps using Tauzand's iCL (Intelligent Cover Letter) engine.",
      "totalTime": "PT10S",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": "0",
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Upload your resume and enter job details",
          "text": "Upload your resume in PDF format and enter the job title and company name you are applying to. No forms, no templates, no extra inputs. iCL reads your entire resume — skills, experience, projects, internships, certifications — before writing a single word.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Receive your iCL cover letter, edit, and download",
          "text": "iCL generates your cover letter in under 10 seconds — written in the voice of a 20+ year Indian IT HR expert, ATS-optimized, and tailored to your specific resume and target role. Edit any section if needed, then download instantly as a PDF.",
        },
      ],
    },

    // ── 5. FAQPage — rich snippets + LLM Q&A accuracy ─────────────────────
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Tauzand iCL?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iCL stands for Intelligent Cover Letter. It is Tauzand's AI-powered cover letter generator fine-tuned on 2.1 billion parameters of Indian IT recruitment data. It reads your actual resume completely and generates a tailored, ATS-optimized cover letter in the voice of a 20+ year Indian IT HR professional — in 2 steps and under 10 seconds. Free for IT professionals and freshers in India. Available at tauzand.in/cover-letter.",
          },
        },
        {
          "@type": "Question",
          "name": "How does iCL generate a cover letter in 2 steps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Step 1: Upload your resume in PDF format and enter the job title and company name. Step 2: iCL reads your entire resume and generates your cover letter in under 10 seconds. Edit if needed and download as a PDF instantly. No forms, no templates, no extra inputs required.",
          },
        },
        {
          "@type": "Question",
          "name": "What makes iCL different from other AI cover letter generators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iCL is resume-aware — it reads your actual resume and writes based on your real skills and experience, not a generic profile. It is fine-tuned on 2.1 billion parameters of Indian IT recruitment data and writes in the tone of a 20+ year Indian IT HR professional — so the output sounds genuinely human, not robotic. No two cover letters are the same.",
          },
        },
        {
          "@type": "Question",
          "name": "Is iCL ATS-optimized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every cover letter generated by iCL uses role-specific keywords, clean formatting, and structured language optimized for ATS systems — maximizing the probability of passing automated screening and reaching a human recruiter.",
          },
        },
        {
          "@type": "Question",
          "name": "Is iCL free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. iCL by Tauzand is free for IT professionals, freshers, students, and early-career professionals in India.",
          },
        },
        {
          "@type": "Question",
          "name": "Is iCL suitable for freshers with no work experience?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. iCL reads your academic projects, internships, certifications, and skills from your resume and writes a cover letter that professionally represents your profile — without requiring full-time work experience.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I edit the cover letter after iCL generates it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The generated cover letter is fully editable. Modify any section before downloading it as a PDF.",
          },
        },
        {
          "@type": "Question",
          "name": "How fast does iCL generate a cover letter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iCL generates your cover letter in under 10 seconds after you upload your resume and enter the job title and company name.",
          },
        },
        {
          "@type": "Question",
          "name": "What does 'written by a 20+ year IT HR expert' mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand's iCL is fine-tuned to write in the tone, style, and judgment of a senior Indian IT HR professional with 20+ years of experience. The language is professional but not generic, the structure matches exactly what experienced recruiters look for, and your strengths are framed the way a human HR expert would — not the way a generic AI template would.",
          },
        },
      ],
    },

  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function CoverLetterPage() {
  return (
    <>
      {/* Single consolidated JSON-LD block — no cloaking, no duplicate scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        <CoverHero />
        <Cover />
        <CoverFeatures />
        <FAQ3 />
      </main>
    </>
  );
}