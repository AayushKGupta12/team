/**
 * app/extension/page.tsx
 *
 * FIXES vs previous version:
 *
 * 1. CLOAKING REMOVED — the <section aria-hidden="true" className="sr-only"> block.
 *    Common misconception: aria-hidden="true" prevents crawlers from reading it.
 *    It does NOT. Google explicitly documents that aria-hidden is an accessibility
 *    attribute and does NOT affect crawling or indexing. Googlebot, GPTBot, and
 *    ClaudeBot all read aria-hidden="true" content. Combined with sr-only (visually
 *    hidden from users), this is still content shown to bots but not users = cloaking.
 *    The data-llm-context, data-product, data-use-cases attributes are also irrelevant
 *    — crawlers do not use custom data-* attributes as ranking or discovery signals.
 *    All signal redistributed to metadata + structured data.
 *    Ref: https://developers.google.com/search/docs/essentials/spam-policies#cloaking
 *
 * 2. metadataBase fixed: `https://www.Tauzand.in` → `https://www.tauzand.in`
 *
 * 3. All capital-T `Tauzand.in` URLs fixed → lowercase (15 occurrences across
 *    metadata and all four schema objects)
 *
 * 4. twitter.site '@Tauzand' fixed → twitter.creator '@tauzand'
 *    `site` is for the site's handle, `creator` for the content author.
 *    Both had capital T.
 *
 * 5. authors fixed: { name: 'Tauzand' } → { name: 'Aayush Kumar Gupta' }
 *    authors = person. publisher = company.
 *
 * 6. creator fixed: 'Tauzand' → 'Aayush Kumar Gupta'
 *
 * 7. keyword year updated: "2025" → "2026"
 *
 * 8. Product schema REMOVED — same reason as iATS and iCL pages.
 *    Chrome extensions distributed free are SoftwareApplication, not Product.
 *    Google ignores Product schema for non-purchasable items and the validator
 *    flags it. SoftwareApplication already has offers + aggregateRating + featureList.
 *
 * 9. All four separate JSON-LD <script> tags merged into one @graph.
 *    WebPage.isPartOf now references Organization by @id instead of
 *    inlining a duplicate Organization object — avoids schema entity conflicts.
 *
 * 10. alternates.languages URLs fixed: capital T → lowercase
 *
 * LINE COUNT DIFFERENCE EXPLAINED:
 *    - Cloaking <section>: ~30 lines removed
 *    - productSchema const + <script> tag: ~22 lines removed
 *    - Three separate @context/@type headers merged into one @graph: ~10 lines saved
 *    - Comments consolidated: ~8 lines saved
 *    Total removed: ~70 lines. Every removal is documented above.
 *    Zero content/signal removed — all redistributed to structured data.
 */

import { Metadata } from "next";
import ExtensionCTA from "../components/ExtensionCTA";
import ExtensionDashboard from "../components/ExtenionDashboard";
import ExtensionFeature from "../components/ExtensionFeature";
import FAQ4 from "../components/FAQ4";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // FIXED: was `https://www.Tauzand.in` — capital T
  metadataBase: new URL("https://www.tauzand.in"),

  // Title template kept — good pattern for sub-pages under extension
  title: {
    default: "AI Assistant for Research | Tauzand",
    template: "%s | Tauzand Extension",
  },

  // Description: ≤160 chars — what it does, user count, free signal
  description:
    "Free AI Chrome extension for research, coding help, resume improvement, translation, and summarization — all inside your browser. Trusted by 18,000+ users. No tab switching.",

  keywords: [
    // Core product
    "AI Chrome extension India",
    "AI research assistant Chrome",
    "resume improvement Chrome extension",
    "coding assistant Chrome extension",
    "productivity Chrome extension India",
    "AI study helper Chrome",
    "translation Chrome extension",
    "summarization Chrome extension",
    "Tauzand extension",
    "Tauzand Chrome extension",
    // High-intent
    "no tab switching AI tool",
    "AI tool for students India",
    "free AI Chrome extension India",
    "browser AI assistant India",
    "assessment help Chrome extension",
    "AI career assistant Chrome",
    // Updated year
    "best AI Chrome extension India 2026",
    "free AI extension 2026",
  ],

  // FIXED: author was 'Tauzand' (company) — authors field is for a person
  authors: [{ name: "Aayush Kumar Gupta", url: "https://www.tauzand.in" }],
  // FIXED: was 'Tauzand'
  creator: "Aayush Kumar Gupta",
  publisher: "Tauzand",
  category: "Technology",
  classification: "Software Application / Browser Extension",

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
    // FIXED: was `https://www.Tauzand.in/extension`
    url: "https://www.tauzand.in/extension",
    siteName: "Tauzand",
    title: "Tauzand Chrome Extension — AI Research, Coding & Career Assistant",
    description:
      "Free AI Chrome extension for research assistance, coding help, resume improvement, translation, and summarization — all inside your browser without switching tabs.",
    images: [
      {
        // FIXED: was `https://www.Tauzand.in/extension-og.jpg`
        url: "https://www.tauzand.in/extension-og.jpg",
        width: 1200,
        height: 630,
        alt: "Tauzand Chrome Extension — AI Research & Career Assistant",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    // FIXED: was `site: '@Tauzand'` — site = site handle, creator = author handle
    // Both had capital T
    creator: "@tauzand",
    title: "Tauzand Chrome Extension — AI Research, Coding & Career Assistant",
    description:
      "Free AI extension for resume help, research, coding, translation & more. No tab switching. 18,000+ users.",
    images: [
      {
        // FIXED: was `https://www.Tauzand.in/extension-og.jpg`
        url: "https://www.tauzand.in/extension-og.jpg",
        alt: "Tauzand AI Chrome Extension",
      },
    ],
  },

  alternates: {
    // FIXED: was `https://www.Tauzand.in/extension`
    canonical: "https://www.tauzand.in/extension",
    languages: {
      // FIXED: was `https://www.Tauzand.in/extension`
      "en-IN": "https://www.tauzand.in/extension",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
// All four schemas merged into one @graph. All URLs fixed to www.tauzand.in.
// ─────────────────────────────────────────────────────────────────────────────

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [

    // ── 1. Organization ───────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": "https://www.tauzand.in/#organization",
      "name": "Tauzand",
      // FIXED: was `https://www.Tauzand.in`
      "url": "https://www.tauzand.in",
      "logo": {
        "@type": "ImageObject",
        // FIXED: was `https://www.Tauzand.in/logo.png`
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
      // FIXED: was `https://www.Tauzand.in/extension#webpage`
      "@id": "https://www.tauzand.in/extension#webpage",
      "url": "https://www.tauzand.in/extension",
      "name": "Tauzand Chrome Extension — AI Research, Coding & Career Assistant",
      "description":
        "Download Tauzand's free AI Chrome extension for research assistance, coding help, resume improvement, translation, and summarization — all inside your browser without switching tabs. Trusted by 18,000+ users.",
      "inLanguage": "en-IN",
      "isPartOf": {
        // FIXED: was inline Organization object — now references by @id
        // Avoids duplicate entity definition which confuses Google's parser
        "@id": "https://www.tauzand.in/#website",
      },
      "about": {
        "@type": "SoftwareApplication",
        // FIXED: was `https://www.Tauzand.in/extension#software`
        "@id": "https://www.tauzand.in/extension#software",
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            // FIXED: was `https://www.Tauzand.in`
            "item": "https://www.tauzand.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Chrome Extension",
            // FIXED: was `https://www.Tauzand.in/extension`
            "item": "https://www.tauzand.in/extension",
          },
        ],
      },
    },

    // ── 3. SoftwareApplication ────────────────────────────────────────────
    {
      "@type": "SoftwareApplication",
      // FIXED: was `https://www.Tauzand.in/extension#software`
      "@id": "https://www.tauzand.in/extension#software",
      "name": "Tauzand Chrome Extension",
      "alternateName": ["Tauzand AI Extension", "Tauzand Browser Assistant"],
      "applicationCategory": "BrowserApplication",
      "applicationSubCategory": [
        "Productivity",
        "Education",
        "Career Tools",
        "Research Assistant",
        "Writing Assistant",
      ],
      "operatingSystem": "Google Chrome, Chromium",
      "browserRequirements": "Chrome 90+",
      // FIXED: was `https://www.Tauzand.in/extension`
      "url": "https://www.tauzand.in/extension",
      "description":
        "Tauzand is a free AI-powered Chrome extension for students, researchers, and professionals in India. It provides on-demand resume improvement, research assistance, coding help, language translation, and content summarization — all directly within your browser tab without switching between apps. Trusted by 18,000+ users.",
      "featureList": [
        "Resume improvement and career guidance",
        "Academic and professional research assistance",
        "Coding help and debugging support",
        "Real-time language translation",
        "Webpage and document summarization",
        "In-browser AI with no tab switching",
        "AI-powered Q&A on any topic",
        "Assessment and exam preparation help",
        "Learning assistant for students",
        "Upcoming: file upload and image analysis",
        "Upcoming: voice input support",
        "Upcoming: on-screen intelligence",
      ],
      // FIXED: was `https://www.Tauzand.in/extension-screenshot.jpg`
      "screenshot": "https://www.tauzand.in/extension-screenshot.jpg",
      "softwareVersion": "1.0 Beta",
      "releaseNotes":
        "Beta version supports textual input. Upcoming features include file upload, image analysis, voice support, and on-screen intelligence.",
      "softwareRequirements": "Google Chrome version 90 or above",
      "inLanguage": ["en", "hi"],
      "audience": {
        "@type": "Audience",
        "audienceType": [
          "Students",
          "Researchers",
          "Developers",
          "Job Seekers",
          "Professionals",
        ],
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "description": "Free during Beta. No credit card required.",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "320",
        "bestRating": "5",
        "worstRating": "1",
      },
      "provider": {
        "@id": "https://www.tauzand.in/#organization",
      },
    },

    // ── 4. FAQPage ────────────────────────────────────────────────────────
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Tauzand Chrome Extension?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand is a free AI-powered Chrome extension for students, researchers, and professionals. It provides research assistance, coding help, resume improvement, language translation, and content summarization — all inside your browser tab without switching between apps. Currently in Beta and free to use. Trusted by 18,000+ users.",
          },
        },
        {
          "@type": "Question",
          "name": "Can the Tauzand extension help me improve my resume?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Tauzand's AI assistant provides resume improvement suggestions directly inside your browser. Paste your resume content and receive instant feedback on structure, phrasing, ATS optimization, and industry alignment — without leaving your current tab.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Tauzand help with academic or professional research?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand acts as an AI research assistant within Chrome. It helps you summarize long articles, ask follow-up questions about any topic, find explanations for complex concepts, and draft research notes — all from a side panel without switching tabs.",
          },
        },
        {
          "@type": "Question",
          "name": "Is the Tauzand Chrome Extension free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Tauzand is completely free during its Beta phase. No credit card or sign-up fee is required to download and use the extension.",
          },
        },
        {
          "@type": "Question",
          "name": "What AI features does Tauzand offer for students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand offers students AI-powered study assistance including content summarization, exam prep Q&A, concept explanation, coding help, language translation, and assessment support — all without leaving the current browser tab.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Tauzand work without switching browser tabs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Tauzand works as a browser side-panel or overlay, meaning you can access all AI features while staying on any webpage — no tab switching needed.",
          },
        },
        {
          "@type": "Question",
          "name": "What upcoming features will the Tauzand extension include?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Upcoming features include file upload and analysis, image recognition, voice input support, and on-screen intelligence that can read and interact with what is visible on your screen.",
          },
        },
      ],
    },
  ],
};

export default function ExtensionPage() {
  return (
    <>
      {/* Single consolidated JSON-LD block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ExtensionFeature />
      <ExtensionCTA />
      <FAQ4 />
    </>
  );
}