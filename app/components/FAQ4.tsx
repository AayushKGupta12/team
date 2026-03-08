"use client";

/**
 * SEO & AI VISIBILITY IMPROVEMENTS:
 * 1. Fixed h1 → h2 (h1 belongs in the page-level metadata, not mid-page components)
 * 2. FAQPage schema now includes ALL 8 questions (was only 3 — missing 5 answers from rich results)
 * 3. Fixed non-sequential indices (was 0,1,8,9,2,5,4,3 — breaks aria-controls linking)
 * 4. Added aria-expanded, aria-controls, aria-labelledby for accessibility & crawler signals
 * 5. Added itemScope/itemProp microdata directly on DOM elements (dual signal: JSON-LD + microdata)
 * 6. Wrapped each FAQ in <article> with Question/Answer itemType for Google entity recognition
 * 7. Answer text is always in the DOM (display:none via CSS, not conditional render)
 *    — Googlebot reads hidden CSS content; answers are now fully indexed even when collapsed
 * 8. Section has aria-labelledby linking to the heading — semantic landmark for crawlers
 * 9. Used <Script strategy="beforeInteractive"> → schema loads before page hydration
 */

import { useState } from "react";
import Script from "next/script";

// ── FAQ Data ──────────────────────────────────────────────────────────────────
// Centralised here so schema + UI are always in sync — no drift between JSON-LD and visible text

const faqs = [
  {
    question: "What is the VFound Chrome Extension?",
    answer:
      "VFound Chrome Extension is an AI-powered browser tool designed to help students, developers, and professionals simplify technical content, improve resumes, and accelerate research directly inside their browser — without switching tabs.",
    bullets: [
      "AI-powered smart study and research assistance",
      "Instant technical explanations and summaries",
      "Context-aware coding insights and debugging help",
      "Secure API key-based access",
    ],
    highlight: "VFound Chrome Extension",
  },
  {
    question: "Is the VFound Chrome Extension free to use?",
    answer:
      "Yes, the VFound Chrome Extension provides free credits for new users so they can experience its full feature set before choosing to recharge. There are no hidden charges.",
    bullets: [
      "Free initial usage credits for all new users",
      "No hidden background charges",
      "Recharge option available when credits are used",
      "Transparent usage tracking via the dashboard",
    ],
    highlight: "Yes,",
  },
  {
    question: "How do I activate the VFound extension?",
    answer:
      "Activation is simple. After installing the extension from your VFound dashboard, generate or copy your unique API key, paste it into the extension popup, and reload the extension once. You're ready to use it immediately.",
    bullets: [
      "Log in to your VFound dashboard",
      "Generate or copy your API key",
      "Paste the key inside the extension popup",
      "Reload the extension once after saving",
    ],
    highlight: "Unique API key",
  },
  {
    question: "Is my data secure while using the extension?",
    answer:
      "Yes, user privacy is a priority. The extension processes your content only to generate AI responses and does not publicly store or share your data with third parties.",
    bullets: [
      "No public data exposure or third-party sharing",
      "Secure API key authentication",
      "Temporary session-based history",
      "Encrypted communication with the backend",
    ],
    highlight: "Yes,",
  },
  {
    question: "How are usage credits calculated?",
    answer:
      "Credits are deducted each time the extension processes an AI request. This ensures fair and optimised usage across all users. Your remaining balance is always visible in your dashboard.",
    bullets: [
      "Each AI request consumes a fixed credit amount",
      "Usage tracked in real time",
      "Dashboard shows remaining balance at all times",
      "Recharge option available anytime",
    ],
    highlight: null,
  },
  {
    question: "What makes VFound different from other AI tools?",
    answer:
      "Unlike generic AI chat tools, VFound is built specifically for students, developers, and professionals who need concise, focused, and technically accurate explanations — without leaving their current browser tab.",
    bullets: [
      "Short, optimised answers designed for productivity",
      "Technical context-aware responses",
      "Developer and student-focused assistant modes",
      "Integrated credit system for controlled, fair usage",
    ],
    highlight: "students and developers",
  },
  {
    question: "Do I need an account to use the extension?",
    answer:
      "Yes, a VFound account is required to generate your API key and track usage securely through the dashboard. Account creation is free and takes under a minute.",
    bullets: [
      "Account-based authentication for security",
      "Secure API key generation from dashboard",
      "Usage monitoring and credit recharge",
      "Personalised AI study and research experience",
    ],
    highlight: null,
  },
  {
    question: "How does VFound use AI to help with research and resumes?",
    answer:
      "VFound uses advanced AI models to simplify study materials, provide technical explanations, generate coding insights, summarise long articles, and offer tailored resume improvement suggestions — all accessible via a browser side panel.",
    bullets: [
      "AI-powered smart study and research responses",
      "Resume improvement with ATS optimisation tips",
      "Context-aware content simplification",
      "Code suggestions and debugging assistance",
    ],
    highlight: "concise technical explanations",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/*
       * FAQPage JSON-LD schema — now includes ALL 8 questions.
       * Google only shows rich result FAQ dropdowns for questions in the schema.
       * The original only had 3, meaning 5 questions were invisible to search results.
       * strategy="beforeInteractive" ensures schema is in <head> before hydration.
       */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                // Use plain text answer for schema (no JSX/HTML — Google strips tags anyway)
                text: `${faq.answer} Key features: ${faq.bullets.join(". ")}.`,
              },
            })),
          }),
        }}
      />

      <section
        className="w-full py-16 bg-white"
        aria-labelledby="faq-heading"
        // Microdata: section-level FAQPage entity (dual signal alongside JSON-LD)
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-5xl mx-auto px-6">

          {/*
           * FIXED: was <h1> — incorrect for a mid-page component.
           * h1 should appear only once per page, set in the Next.js metadata title
           * or the sr-only h1 in the page wrapper. This is now h2.
           */}
          <h2
            id="faq-heading"
            className="text-5xl sm:text-6xl font-bold text-center mb-10 text-gray-900"
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question={faq.question}
                answer={faq.answer}
                bullets={faq.bullets}
                highlight={faq.highlight}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────

function FAQItem({
  index,
  openIndex,
  toggleFAQ,
  question,
  answer,
  bullets,
  highlight,
}: {
  index: number;
  openIndex: number | null;
  toggleFAQ: (index: number) => void;
  question: string;
  answer: string;
  bullets: string[];
  highlight: string | null;
}) {
  const isOpen = openIndex === index;
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    /*
     * itemScope + Question type: Google can read each card as a Question entity.
     * This provides a second indexing signal alongside the JSON-LD schema.
     */
    <article
      className="border border-[#2E5E99]/70 rounded-xl shadow-sm hover:shadow-md transition-all"
      itemScope
      itemType="https://schema.org/Question"
    >
      {/* ── Question Button ────────────────────────────────── */}
      <button
        id={questionId}
        onClick={() => toggleFAQ(index)}
        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
        // aria-expanded tells screen readers AND Google whether the answer is visible
        aria-expanded={isOpen}
        // aria-controls links button to its answer panel
        aria-controls={answerId}
      >
        <span
          className="text-lg font-semibold text-gray-700"
          itemProp="name"
        >
          {question}
        </span>
        <svg
          className={`h-6 w-6 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/*
       * ── Answer Panel ────────────────────────────────────────
       * CRITICAL SEO FIX: The answer is ALWAYS in the DOM (not conditionally rendered).
       * CSS controls visibility via max-height/opacity.
       *
       * Googlebot reads collapsed accordion content when it's in the DOM.
       * If you use conditional rendering ({isOpen && <div>...}), Googlebot
       * only indexes the first open item. All 8 answers are now always indexable.
       */}
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        // itemScope + Answer type on the answer panel
        itemScope
        itemType="https://schema.org/Answer"
      >
        <div className="px-6 pb-4" itemProp="text">
          <p className="mb-3 text-gray-700">
            {highlight ? (
              <>
                <span className="bg-[#ffe8b1] px-2">{highlight}</span>{" "}
                {answer.startsWith(highlight)
                  ? answer.slice(highlight.length).trimStart()
                  : answer}
              </>
            ) : (
              answer
            )}
          </p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            {bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}