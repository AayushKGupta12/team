"use client";

import { useState } from "react";
import Script from "next/script";
import { CheckCircle2, Clock3, Layers3, BookOpen, Target, Trophy } from "lucide-react";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/career_intelligence",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/Tauzand.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@vfond-d3r",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/AayushKGupta",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "What is Tauzand DSA and who is it for?",
    answer:
      "Tauzand DSA is a company-focused DSA preparation dashboard built for students and freshers who want structured interview practice, company-wise questions, and topic-based learning in one place.",
    bullets: [
      "Company-wise DSA preparation",
      "Topic-based practice flow",
      "Built for placements and interview prep",
      "Designed for freshers and self-learners",
    ],
  },
  {
    question: "How many companies are covered in the DSA list?",
    answer:
      "The DSA section currently includes 62+ companies, with more being added over time so users can prepare from a broader interview set.",
    bullets: [
      "62+ companies included",
      "Company-wise question grouping",
      "Built for common hiring brands",
      "Expandable content structure",
    ],
  },
  {
    question: "How many questions are available?",
    answer:
      "Tauzand provides 800+ DSA questions, organized to help users practice efficiently without wasting time searching across random sources.",
    bullets: [
      "800+ curated questions",
      "Built for fast interview prep",
      "Easy to expand later",
      "Supports focused revision",
    ],
  },
  {
    question: "Is the practice topic-wise?",
    answer:
      "Yes. Questions are organized topic-wise so users can jump directly into arrays, strings, recursion, trees, graphs, dynamic programming, and more.",
    bullets: [
      "Topic-wise filtering",
      "Core DSA chapters covered",
      "Helps identify weak areas",
      "Supports targeted revision",
    ],
  },
  {
    question: "What difficulty levels are available?",
    answer:
      "Tauzand supports 3 difficulty levels: easy, medium, and hard. This lets users build confidence gradually and prepare in a structured way.",
    bullets: [
      "Easy, medium, hard",
      "Progressive learning flow",
      "Useful for beginners and advanced learners",
      "Interview-oriented difficulty split",
    ],
  },
  {
    question: "Does Tauzand help with actual interview readiness?",
    answer:
      "Yes. The structure is built to improve interview readiness through practice consistency, topic coverage, and company-wise exposure rather than random grinding.",
    bullets: [
      "Interview-focused practice",
      "Structured problem selection",
      "Better revision flow",
      "Helps build confidence",
    ],
  },
  {
    question: "How do I start practising?",
    answer:
      "You can start practising from the user dashboard and continue through company-wise and topic-wise sections in a guided flow.",
    bullets: [
      "Start from the dashboard",
      "Move into company-wise lists",
      "Track your preparation progress",
      "Keep everything in one place",
    ],
  },
  {
    question: "Why choose Tauzand over random practice sites?",
    answer:
      "Tauzand is made to keep DSA prep focused, organized, and interview-ready, with a cleaner structure than scattered problem lists.",
    bullets: [
      "Cleaner learning flow",
      "Company and topic structure",
      "Less random searching",
      "Built for serious preparation",
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: `${faq.answer} Key points: ${faq.bullets.join(". ")}.`,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section
        className="w-full bg-white py-16"
        aria-labelledby="faq-heading"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h2
            id="faq-heading"
            className="mb-10 text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-6xl"
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                index={index}
                openIndex={openIndex}
                toggleFAQ={setOpenIndex}
                question={faq.question}
                answer={faq.answer}
                bullets={faq.bullets}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto mt-14 w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#222222] px-8 py-12">
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-yellow-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-48 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="mb-3 text-3xl font-bold leading-snug text-white sm:text-4xl">
                Don’t just practise DSA.<br className="hidden sm:block" />
                <span className="text-yellow-400">Build real interview confidence.</span>
              </h2>

              <a
                href="https://tauzand.in/DSA/userdashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all hover:scale-[1.04] hover:bg-yellow-300"
              >
                Start Practising Now →
              </a>

              <p className="mt-4 text-xs text-gray-200">
                "Company-wise Questions • Topic-wise Practice • 800+ Curated Problems"
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:min-w-[260px] lg:w-auto">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-white transition-all duration-200 hover:scale-[1.02] hover:border-yellow-400 hover:bg-yellow-400 hover:text-black hover:shadow-xl hover:shadow-yellow-400/20"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-black/10">
                    {s.icon}
                  </span>
                  <span className="flex-1 text-sm font-semibold">
                    Follow on {s.label}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

function FAQItem({
  index,
  openIndex,
  toggleFAQ,
  question,
  answer,
  bullets,
}: {
  index: number;
  openIndex: number | null;
  toggleFAQ: (index: number | null) => void;
  question: string;
  answer: string;
  bullets: string[];
}) {
  const isOpen = openIndex === index;
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <article
      className="rounded-xl border border-[#2E5E99]/60 shadow-sm transition-all hover:shadow-md"
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        id={questionId}
        onClick={() => toggleFAQ(isOpen ? null : index)}
        className="flex w-full items-center justify-between rounded-xl px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="text-lg font-semibold text-gray-700" itemProp="name">
          {question}
        </span>
        <svg
          className={`h-6 w-6 flex-shrink-0 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        itemScope
        itemType="https://schema.org/Answer"
      >
        <div className="px-6 pb-4" itemProp="text">
          <p className="mb-3 text-gray-700">{answer}</p>
          <ul className="ml-6 list-disc space-y-1 text-gray-700">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}