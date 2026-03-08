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

const SOCIALS = [
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/company/career_intelligence",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href:  "https://www.instagram.com/vfound.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href:  "https://www.youtube.com/@vfond-d3r",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href:  "https://x.com/AayushKGupta",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "What kind of internship certificate does VFound provide?",
    answer:
      "VFound does not issue generic participation certificates. Every intern completes a real, industry level project that is individually reviewed and verified by our team of 70+ domain expert mentors. Your profile is approved only after your project submission passes mentor evaluation making every VFound certificate a verified proof of real-world capability.",
    bullets: [
      "Industry grade projects not dummy assignments",
      "Reviewed by 70+ verified domain mentors",
      "Account verification tied to project quality",
      "Certificate reflects evaluated technical competency",
    ],
  },
  {
    question: "How are VFound internship projects selected and updated?",
    answer:
      "VFound continuously refreshes its project library and also accepts live industry projects submitted directly by companies. These are published on the platform so interns work on current, real-world challenges not outdated case studies. This means every cohort engages with problems that matter in the industry today.",
    bullets: [
      "Projects updated regularly to reflect industry trends",
      "Industry partners can submit live projects to VFound",
      "Interns work on real company problems",
      "Curriculum stays relevant with every new batch",
    ],


  },
  {
    question: "What are the internship duration options and what is included in each?",
    answer:
      "VFound offers internships in three durations: 30 days, 45 days, and 60 days, each scaling in depth. The 30-day track includes 1 project review and 1 quiz. The 45-day track includes 1 project review and 2 quizzes. The 60-day track includes 3 project reviews and 3 quizzes. Note: the exact structure may be adjusted based on candidate availability and cohort requirements.",
    bullets: [
      "30 Days : 1 project review + 1 quiz",
      "45 Days : 1 project review + 2 quizzes",
      "60 Days : 3 project reviews + 3 quizzes",
      "Structure subject to change based on cohort size",
    ],

  },
  {
    question: "Which domains does VFound offer internships in?",
    answer:
      "VFound currently offers structured internship programs across 3 core domains, each with mentor-reviewed projects, quizzes, and a verified completion process. The domains are selected to reflect high-demand career tracks ensuring that completing a VFound internship translates directly to job relevant skills.",
    bullets: [
      "3 specialized domain tracks available",
      "Mentor network covers each domain in depth",
      "Domain-specific projects reviewed independently",
      "Skills validated against real industry standards",
    ],

  },
  {
    question: "Can top-performing interns receive a full-time job offer?",
    answer:
      "Yes. VFound's best performers are eligible for full time offers in their domain either directly from VFound or from the company that issued the project they worked on. VFound's minimum offer starts at 5.2 LPA, subject to negotiation. Project issuers from the industry may also extend independent offers to standout performers.",
    bullets: [
      "Top performers eligible for direct full-time offers",
      "Offers from VFound or the industry project issuer",
      "VFound minimum: ₹5.2 LPA (subject to negotiation)",
      "Performance on submitted project is the primary evaluation criteria",
    ],

  },
  {
    question: "How does the mentor verification process work?",
    answer:
      "Every intern's submitted project is reviewed by a qualified mentor from VFound's team of 70+ domain experts. Mentors evaluate project quality, technical accuracy, and completeness before approving your intern profile. This two-step validation project review followed by profile verification ensures that every verified VFound intern has genuinely earned their certification.",
    bullets: [
      "70+ active domain mentors on the review panel",
      "Project submitted → mentor evaluates code quality",
      "Profile approved only after passing mentor review",
      "Rigorous two-step verification: project + account",
    ],

  },
  {
    question: "Is the VFound internship suitable for freshers and students?",
    answer:
      "Yes. VFound is specifically designed for students and early career professionals who want more than just a certificate line on their resume. The program gives you real project experience, mentor feedback, and for top performers a path to a verified full-time offer. You build something real, get it reviewed by an expert, and leave with proof of your work.",
    bullets: [
      "Designed for students and early-career candidates",
      "No prior work experience required to apply",
      "Mentor feedback included in every review",
      "Real project output you can showcase to employers",
    ],
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
                highlight={faq.highlight || "~"}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-12 mt-auto">
        <div className="relative bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#222222]
          rounded-3xl px-8 sm:px-12 py-10 overflow-hidden">

          {/* Yellow glow blobs */}
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-yellow-400 rounded-full
            opacity-[0.15] blur-3xl pointer-events-none"/>
          <div className="absolute -bottom-8 left-1/4 w-48 h-32 bg-yellow-300 rounded-full
            opacity-[0.08] blur-3xl pointer-events-none"/>
          <div className="absolute top-1/2 -translate-y-1/2 -left-8 w-32 h-32 bg-yellow-500
            rounded-full opacity-[0.07] blur-2xl pointer-events-none"/>

          <div className="relative z-10 flex flex-col lg:flex-row items-center
            justify-between gap-8">

            {/* Left text */}
            <div className="text-center lg:text-left">
              <span className="inline-block text-[10px] font-bold text-yellow-400 uppercase
                tracking-[0.2em] mb-3 bg-yellow-400/10 border border-yellow-400/20
                px-3 py-1 rounded-full">
                Stay connected
              </span>
              <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-2">
                Follow VFound for updates,<br className="hidden sm:block"/>
                opportunities &amp; more
              </h2>
              
            </div>

            {/* Right — social buttons */}
            <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[260px]">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl
                    bg-white/[0.06] hover:bg-yellow-400
                    border border-white/10 hover:border-yellow-400
                    text-white hover:text-black
                    transition-all duration-200 hover:scale-[1.02]
                    hover:shadow-xl hover:shadow-yellow-400/20"
                >
                  <span className="w-8 h-8 rounded-xl bg-white/10 group-hover:bg-black/10
                    flex items-center justify-center shrink-0 transition-colors">
                    {s.icon}
                  </span>
                  <span className="text-sm font-semibold flex-1">
                    Follow on {s.label}
                  </span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5
                      transition-all duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
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