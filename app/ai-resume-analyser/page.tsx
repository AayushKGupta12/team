/**
 * app/ai-resume-analyser/page.tsx
 *
 * Fixes vs previous version:
 *
 * 1. CLOAKING REMOVED — the `sr-only aria-hidden="false"` div is cloaking.
 *    Tailwind's sr-only hides content visually but keeps it fully DOM-readable
 *    by crawlers. Combined with aria-hidden="false" (explicitly telling crawlers
 *    to read it), this is textbook cloaking — content different for users vs bots.
 *    Google's spam classifier specifically targets this pattern.
 *    All signal from that block is now in metadata, keywords, and structured data.
 *    Ref: https://developers.google.com/search/docs/essentials/spam-policies#cloaking
 *
 * 2. URL PATH FIXED throughout — file is at /ai-resume-analyser (with the 'r').
 *    The old version had a split: most URLs said /ai-resume-analysis (no 'r'),
 *    but the Product schema said /ai-resume-analyser (with 'r'). The canonical
 *    was pointing to the wrong path, meaning Google may have been indexing a
 *    different URL than your actual live page.
 *    Fixed: all canonical, OG, structured data @id and url → /ai-resume-analyser
 *
 * 3. metadataBase casing fixed: `new URL('https://www.Tauzand.in')` →
 *    `new URL('https://www.tauzand.in')`. Capital-T Tauzand is a different
 *    origin for URL resolution purposes.
 *
 * 4. All `https://www.Tauzand.in` → `https://www.tauzand.in` (8 occurrences)
 *    Affected: OG url, OG image, Twitter images, alternates.canonical, author url
 *
 * 5. Twitter creator fixed: '@Tauzand' → '@tauzand'
 *
 * 6. `new Date().toISOString()` in structured data — REMOVED.
 *    This causes a Next.js server/client hydration mismatch because the date
 *    computed at SSR time differs from the client render time. Use a fixed
 *    ISO date string instead. Update manually when you make major content changes.
 *
 * 7. Product schema REMOVED — Google's Product rich result is for purchasable
 *    physical or digital products with a price. A free SaaS tool should use
 *    SoftwareApplication (already present). Having both causes schema conflicts
 *    and Google ignores the Product block anyway for non-purchasable items.
 *
 * 8. Breadcrumb moved INTO the main @graph — multiple separate JSON-LD scripts
 *    for the same page entity can confuse parsers. One @graph per page is cleaner.
 *
 * 9. All structured data @id values normalized to www.tauzand.in/ai-resume-analyser
 */

import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import ResumeHero from "../components/ResumeHero";
import ATSResumeCheckerApp from "../components/Analysis";
import ResumeFAQ from "../components/ResumeFAQ";
import FAQ from "../components/ResumeTest";
import ResumeCTA from "../components/ResumeCTA";
import FAQNewResume from "../components/FAQNewResume";
// import Banner from "../components/Banner";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // FIXED: was `new URL('https://www.Tauzand.in')` — capital T
  metadataBase: new URL("https://www.tauzand.in"),

  // Title: ~65 chars — product name + what it does + who it's for
  title: "iATS Resume Analysis | Tauzand",

  // Description: ≤160 chars — 8 scores, no JD needed, 75 free credits, freshers
  description:
    "Tauzand iATS scores your resume across 8 metrics — Selection Score, Percentile Rank, Career Health, Market Positioning, and more. No job description needed. 75 free credits.",

  keywords: [
    // Core product
    "iATS score",
    "intelligent ATS checker India",
    "predictive ATS score",
    "AI resume analysis India",
    "ATS resume checker India",
    "resume selection score",
    "resume percentile rank",
    "career health score resume",
    "resume quality score",
    "technical compatibility score resume",
    "market positioning resume",
    "resume analysis 8 scores",
    // High-intent long-tail
    "free resume analysis IT professionals India",
    "ATS resume checker freshers India",
    "resume checker without job description",
    "resume analysis no job description needed",
    "best ATS checker India 2026",
    "resume analysis 75 free credits",
    "iATS 32 hiring parameters",
    "resume trained 3 lakh IT resumes",
    // Broad supporting
    "ATS checker India",
    "resume analyzer India",
    "resume ATS score checker",
    "resume grader India",
    "IT resume analyzer",
    "resume score checker",
    "Tauzand iATS",
  ],

  authors: [
    // FIXED: was `https://www.Tauzand.in` — capital T
    { name: "Aayush Kumar Gupta", url: "https://www.tauzand.in" },
  ],
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
    // FIXED: was "https://www.Tauzand.in/ai-resume-analysis" — capital T + wrong path
    url: "https://www.tauzand.in/ai-resume-analyser",
    siteName: "Tauzand",
    title: "iATS Resume Analysis | Tauzand",
    description:
      "iATS by Tauzand parses every word of your resume, aligns it with live IT market data, and gives you 8 scores: Selection Score, Percentile Rank, Career Health, Market Positioning, and more. No job description needed. 75 free credits.",
    images: [
      {
        // FIXED: was "https://www.Tauzand.in/resume-analysis-og.jpg" — capital T
        url: "https://www.tauzand.in/resume-analysis-og.jpg",
        width: 1200,
        height: 630,
        alt: "Tauzand iATS — Intelligent & Predictive AI Resume Analysis for IT Jobs India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "iATS — Not Just ATS. Intelligence + Prediction | Tauzand",
    description:
      "8 scores. 32+ parameters. No JD needed. 75 free credits. Monthly updated. Trained on 3L+ Indian IT resumes. Validate your resume with Tauzand iATS.",
    // FIXED: was "https://www.Tauzand.in/resume-analysis-og.jpg" — capital T
    images: ["https://www.tauzand.in/resume-analysis-og.jpg"],
    // FIXED: was "@Tauzand" — capital T
    creator: "@tauzand",
  },

  alternates: {
    // FIXED: was "https://www.Tauzand.in/ai-resume-analysis" — capital T + wrong path
    canonical: "https://www.tauzand.in/ai-resume-analyser",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
// All schemas merged into one @graph — cleaner for Google's parser.
// All @id and url values fixed to www.tauzand.in/ai-resume-analyser
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
      "description":
        "MSME-registered, Startup India-recognized AI career intelligence platform for IT professionals and freshers in India. Products include iATS resume analysis, iCL cover letter generation, internship certification, company-wise DSA prep, and IT job listings.",
      "sameAs": [
        "https://twitter.com/tauzand",
        "https://www.linkedin.com/company/tauzand",
        "https://youtube.com/@tauzand",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "url": "https://www.tauzand.in/contact",
        "contactType": "customer support",
      },
      "areaServed": "IN",
    },

    // ── 2. WebPage ────────────────────────────────────────────────────────
    {
      "@type": "WebPage",
      // FIXED: was /ai-resume-analysis — wrong path
      "@id": "https://www.tauzand.in/ai-resume-analyser#webpage",
      "url": "https://www.tauzand.in/ai-resume-analyser",
      "name": "iATS Resume Analysis — Intelligent & Predictive Applicant Tracking System | Tauzand",
      "description":
        "Tauzand's iATS goes far beyond a standard ATS checker. It parses every word of your resume, aligns it with real-time IT market data, identifies technical gaps, and produces 8 distinct scores: iATS Score, Selection Score, Percentile Rank, Career Health Score, Resume Quality Score, Experience Score, Technical Compatibility Score, and Market Positioning. No job description or company needed. 75 free lifetime credits.",
      "inLanguage": "en-IN",
      // FIXED: was `new Date().toISOString()` — causes hydration mismatch
      // Update this manually when you make significant content changes
      "dateModified": "2026-05-01",
      "isPartOf": {
        "@id": "https://www.tauzand.in/#website",
      },
      "about": {
        "@type": "Thing",
        "name": "iATS — Intelligent and Predictive Applicant Tracking System",
        "description":
          "iATS is Tauzand's AI scoring engine that analyzes resumes word-by-word against live IT industry hiring data, identifies technical gaps, and predicts whether a real ATS system will shortlist or reject the resume — without needing a job description or company name.",
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
            "name": "iATS Resume Analysis",
            "item": "https://www.tauzand.in/ai-resume-analyser",
          },
        ],
      },
    },

    // ── 3. SoftwareApplication ────────────────────────────────────────────
    {
      "@type": "SoftwareApplication",
      // FIXED: was /ai-resume-analysis — wrong path
      "@id": "https://www.tauzand.in/ai-resume-analyser#app",
      "name": "Tauzand iATS — Intelligent and Predictive Applicant Tracking System",
      "alternateName": [
        "iATS Resume Checker",
        "iATS Resume Analyser",
        "Intelligent Predictive ATS",
        "Tauzand Resume Analysis",
      ],
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "ResumeAnalysisTool",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a modern web browser with JavaScript enabled",
      "url": "https://www.tauzand.in/ai-resume-analyser",
      "description":
        "iATS (Intelligent & Predictive Applicant Tracking System) by Tauzand is an advanced AI resume analysis engine trained on 3,00,000+ real Indian IT resumes. It evaluates resumes word-by-word across 8 distinct scores and 32+ hiring parameters without requiring a job description. Scores: iATS Score (99.99% ATS prediction accuracy), Selection Score, Percentile Rank, Market Positioning, Career Health Score, Resume Quality Score, Experience Score, Technical Compatibility Score. AI model updated monthly. 75 free lifetime credits.",
      "featureList": [
        "iATS Score — 99.99% accurate ATS shortlist/rejection prediction",
        "Selection Score — recruiter shortlist probability out of 100",
        "Percentile Rank — standing vs all IT applicants in similar pool",
        "Market Positioning — current level and best-fit roles in IT market",
        "Career Health Score — long-term career trajectory analysis",
        "Resume Quality Score — formatting, structure, ATS-friendliness audit",
        "Experience Score — depth and relevance of projects and internships",
        "Technical Compatibility Score — tech stack vs current IT market demand",
        "Word-by-word resume parsing against live IT industry data",
        "Technical gap detection specific to the IT industry",
        "32+ real-world hiring parameters evaluated",
        "No job description or company name required",
        "AI model updated every month",
        "Trained on 3,00,000+ real Indian IT resumes",
        "75 free lifetime analysis credits",
        "Intelligent Performance Tracking Dashboard",
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "description": "75 free lifetime AI resume analysis credits",
        "eligibleRegion": {
          "@type": "Country",
          "name": "India",
        },
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "740",
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
      "name": "How to Validate Your Resume with Tauzand iATS After AI Optimization",
      "description":
        "Step-by-step guide to getting your iATS Score, Selection Score, Percentile Rank, and Market Positioning on Tauzand after optimizing your resume with ChatGPT, Gemini, or Claude.",
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": "0",
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Optimize resume content with an AI tool",
          "text": "Use ChatGPT, Gemini, or Claude to generate or improve the content of your resume — phrasing, structure, and skills sections.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Upload your resume to Tauzand iATS",
          "text": "Go to tauzand.in/ai-resume-analyser and upload your resume PDF. No job description or company name is required.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Review your 8 iATS scores",
          "text": "Receive your iATS Score, Selection Score, Percentile Rank, Market Positioning, Career Health Score, Resume Quality Score, Experience Score, and Technical Compatibility Score across 32+ hiring parameters.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Fix gaps and re-analyze",
          "text": "Use the gap analysis and score insights to improve your resume, then re-analyze with iATS to track improvement. Up to 75 re-analyses are free.",
        },
      ],
    },

    // ── 5. FAQPage — rich snippets + accurate LLM Q&A ─────────────────────
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Tauzand iATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iATS stands for Intelligent and Predictive Applicant Tracking System. It is Tauzand's AI resume analysis engine trained on 3,00,000+ real Indian IT resumes. It evaluates your resume word-by-word across 8 scores and 32+ hiring parameters — iATS Score, Selection Score, Percentile Rank, Market Positioning, Career Health Score, Resume Quality Score, Experience Score, and Technical Compatibility Score — without requiring a job description or company name. Available at tauzand.in/ai-resume-analyser.",
          },
        },
        {
          "@type": "Question",
          "name": "What should I do after optimizing my resume with ChatGPT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After optimizing your resume with ChatGPT, Gemini, or Claude, the recommended next step is to validate it with Tauzand iATS. AI tools improve content and wording. iATS evaluates ATS compatibility, keyword alignment, and real IT market hiring performance — producing 8 measurable scores without needing a job description.",
          },
        },
        {
          "@type": "Question",
          "name": "How is iATS different from a normal ATS checker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Normal ATS checkers match keywords against a single job description and return a percentage. iATS parses your resume word-by-word, aligns every skill and experience with current IT market data, detects technical gaps, and produces 8 distinct scores across 32+ parameters — without any job description. The AI model is updated monthly and trained on 3,00,000+ real Indian IT resumes.",
          },
        },
        {
          "@type": "Question",
          "name": "Does iATS require a job description?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. iATS is the only resume analysis tool that evaluates your resume against the entire Indian IT industry without requiring a job description, job title, or company name. Upload your resume and receive all 8 scores immediately.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the Selection Score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Selection Score is the predicted probability (out of 100) that your resume will be shortlisted by a recruiter or ATS system, based on your skills, experience, technical depth, and current IT market alignment.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the Percentile Rank?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Percentile Rank shows where your resume stands vs all IT applicants in a similar profile pool. A rank of 75 means your resume is stronger than 75% of candidates. It gives you a real, data-backed competitive benchmark.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Market Positioning in iATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Market Positioning identifies your current level in the IT job market (fresher, junior, mid-level, senior), which roles you are competitive for right now, and what skill improvements would move you into higher-demand positions.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the Career Health Score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Career Health Score evaluates the long-term strength and trajectory of your professional profile — factoring in technical growth, depth of experience, skill relevance, and market alignment.",
          },
        },
        {
          "@type": "Question",
          "name": "How many free credits does iATS give?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand gives every user 75 free lifetime iATS resume analysis credits. You can analyze and re-analyze your resume up to 75 times for free, tracking improvement as you update your skills and experience.",
          },
        },
        {
          "@type": "Question",
          "name": "How accurate is the iATS Score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tauzand's iATS achieves 99.99% accuracy in predicting whether an ATS system will reject or shortlist a resume. It is trained on 3,00,000+ real Indian IT resumes and updated monthly.",
          },
        },
        {
          "@type": "Question",
          "name": "Is iATS suitable for freshers and students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. iATS is designed to fairly evaluate freshers, students, and early-career professionals. It assesses academic projects, internships, certifications, and technical skills — not just full-time work experience — making it ideal for students entering IT roles.",
          },
        },
        {
          "@type": "Question",
          "name": "How often is the iATS AI model updated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The iATS AI model is updated every month to reflect new technologies, evolving frameworks, changing ATS logic, and shifting hiring trends in the Indian IT market.",
          },
        },
      ],
    },

  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default async function Page() {
  const { userId } = await auth();

  return (
    <>
      {/* Single consolidated JSON-LD block */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        <ResumeHero />
        <ATSResumeCheckerApp />
        {/* <Banner
          isPositive={false}
          message="Use our state of the are "
        /> */}
        <ResumeFAQ />
        <FAQ />
        <FAQNewResume />
        <ResumeCTA />
      </main>
    </>
  );
}