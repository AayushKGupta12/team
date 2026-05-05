"use client";

import { useState } from "react";
import Script from "next/script";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    href:  "https://www.instagram.com/Tauzand.in",
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

  return (
    <>

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
                Stay connectedclea
              </span>
              <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-2">
                Follow Tauzanddd for updates,<br className="hidden sm:block"/>
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
      {/* ✅ FAQ Schema for Google Rich Results */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is resume analysis free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, Tauzand provides free resume analysis with ATS checks, technical depth evaluation, and actionable improvement suggestions for IT graduates and freshers."
                }
              },
              {
                "@type": "Question",
                name: "Does Tauzand provide IT jobs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, Tauzand lists real IT job openings including off-campus roles, fresher jobs, and direct company application links."
                }
              },
              {
                "@type": "Question",
                name: "Does Tauzand use AI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, Tauzand uses advanced AI and Algorithm's to analyze resumes, detect skill gaps, and optimize content for modern hiring systems."
                }
              }
            ]
          }),
        }}
      />

      <section className="w-full py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-6xl font-bold text-center mb-10 text-gray-900 kaushan-script-regular">
            Frequently asked Question 
          </h1>

          <div className="space-y-6">

            {/* ================= Resume Analysis ================= */}
            <section>
              <FAQItem
                index={0}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Is resume analysis free?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> Tauzand offers a <span className="bg-[#ffe8b1] px-2">completely free</span> resume analysis
                      feature designed specifically for IT students, recent
                      graduates, and early career professionals. Unlike basic
                      keyword scanners, our <span className="bg-[#ffe8b1] px-2">system deeply evaluates</span> your resume
                      against current hiring expectations.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li><span className="bg-[#ffe8b1] px-2">Technical depth</span> and skill relevance analysis</li>
                      <li><span className="bg-[#ffe8b1] px-2">ATS-compatibility</span> and formatting checks</li>
                      <li>Comparison with real<span className="bg-[#ffe8b1] px-2">market competition</span></li>
                      <li>Clear and actionable improvement <span className="bg-[#ffe8b1] px-2">suggestions</span></li>
                    </ul>
                  </>
                }
              />
            </section>

            {/* ================= Jobs & Career ================= */}
            <section>

              <FAQItem
                index={1}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Does Tauzand provide IT jobs?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> Tauzand actively helps candidates discover real and
                      relevant IT job opportunities through its dedicated jobs
                      section. The focus is on <span className="bg-[#ffe8b1] px-2">fresher friendly</span> and off campus
                      hiring.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Live IT job openings from trusted sources</li>
                      <li>Off campus and <span className="bg-[#ffe8b1] px-2">entry level roles</span></li>
                      <li>Direct application links to company pages</li>
                      <li><span className="bg-[#ffe8b1] px-2">No recruitment agencies</span> and <span className="bg-[#ffe8b1] px-2">no middlemen involved</span></li>
                    </ul>
                  </>
                }
              />
            </section>

            <section>
              <FAQItem
                index={8}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Who are we ?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Tauzand is a developer builder tooklit where early professional come to get career insights and improve their job readiness.
                      <span className="bg-[#ffe8b1] px-2">career intelligence platform</span> that connects users with real world scenarios and opportunities.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Resume in-depth insights and analysis</li>
                      <li>AI-powered career roadmap guidance</li>
                      <li>live <span className="bg-[#ffe8b1] px-2">english speaking</span> practice sessions</li>
                      <li>Live and personalized mocks tech-interview</li>
                    </ul>
                  </>
                }
              />
            </section>

            <section>
              <FAQItem
                index={9}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Is my resume data safe on Tauzand?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> user data privacy and security are taken seriously on Tauzand.
                      Uploaded resumes are processed only to provide analysis and insights.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>No public sharing</li>
                      <li>Used only for analysis and improvement</li>
                      <li>Handled using <span className="bg-[#ffe8b1] px-2">secure infrastructure</span></li>
                    </ul>
                  </>
                }
              />

            </section>





            {/* ================= Platform & Learning ================= */}
            <section>
              
              <FAQItem
                index={2}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="How often are roadmaps updated?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Our learning and career roadmaps are <span className="bg-[#ffe8b1] px-2">updated every month</span>
                      to reflect the fast changing technology industry and
                      current hiring <span className="bg-[#ffe8b1] px-2">trends.</span>
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>New tools and frameworks added regularly</li>
                      <li>Skills aligned with real job requirements</li>
                      <li><span className="bg-[#ffe8b1] px-2">Optimized for freshers</span> and early professionals</li>
                      <li>Focus on <span className="bg-[#ffe8b1] px-2">long-term IT career growth</span></li>
                    </ul>
                  </>
                }
              />
            </section>

            <section>
              <FAQItem
              index={5}
              openIndex={openIndex}
              toggleFAQ={toggleFAQ}
              question="How is Tauzand different from other platforms?"
              answer={
                <>
                  <p className="mb-3 text-gray-700">
                    Tauzand is built specifically for <span className="bg-[#ffe8b1] px-2">recent IT graduates</span> and early-career
                    professionals, unlike generic job portals or resume tools. Every feature
                    is designed with <span className="bg-[#ffe8b1] px-2">fresher-level hiring expectations</span> and real-world
                    industry needs in mind.
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-gray-700">
                    <li>Resume analysis focused on <span className="bg-[#ffe8b1] px-2">technical depth,</span> not just keywords</li>
                    <li>Live and fresher-friendly IT job listings</li>
                    <li>AI-powered <span className="bg-[#ffe8b1] px-2">insights tailored</span> to specific job roles</li>
                    <li>No unnecessary features meant for senior or irrelevant roles</li>
                  </ul>
                </>
              }
            />

            </section>

            <section>
              <FAQItem
              index={4}
              openIndex={openIndex}
              toggleFAQ={toggleFAQ}
              question="Do you offer a free trial?"
              answer={
                <>
                  <p className="mb-3 text-gray-700">
                    Yes, Tauzand offers a <span className="bg-[#ffe8b1] px-2">free trial that</span> allows users to experience core
                    platform features before committing to any paid plans. The free trial
                    is designed to help you understand how our tools work and how they can
                    improve your job readiness.
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-gray-700">
                    <li><span className="bg-[#ffe8b1] px-2">No credit card</span> required to start</li>
                    <li>Free resume analysis with actionable feedback</li>
                    <li>Access to <span className="bg-[#ffe8b1] px-2">essential career insights</span></li>
                    <li>Ideal for students and fresh graduates testing the platform</li>
                  </ul>
                </>
              }
            />
            </section>


            {/* ================= AI & Platform ================= */}
            <section>

              <FAQItem
                index={3}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Does Tauzand use AI?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Yes, Tauzand uses advanced AI and large language models to
                      power its resume analysis and <span className="bg-[#ffe8b1] px-2">content optimization tools.</span>
                      The goal is to provide context aware and role specific
                      insights.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li><span className="bg-[#ffe8b1] px-2">Skill gap detection</span> based on job roles</li>
                      <li>Contextual <span className="bg-[#ffe8b1] px-2">resume evaluation</span></li>
                      <li>Modern <span className="bg-[#ffe8b1] px-2">ATS-aligned recommendations</span></li>
                      <li><span className="bg-[#ffe8b1] px-2">Improved clarity</span> and resume impact</li>
                    </ul>
                  </>
                }
              />
            </section>

          </div>
        </div>
      </section>
    </>
  );
}

/* ================= FAQ ITEM (CRAWLABLE) ================= */

function FAQItem({
  index,
  openIndex,
  toggleFAQ,
  question,
  answer,
}: {
  index: number;
  openIndex: number | null;
  toggleFAQ: (index: number) => void;
  question: string;
  answer: React.ReactNode;
}) {
  return (
    <div className="border border-[#2E5E99]/70 rounded-xl shadow-sm hover:shadow-md transition-all">
      <button
        onClick={() => toggleFAQ(index)}
        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-700">
          {question}
        </span>
        <svg
          className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${
            openIndex === index ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ✅ Always rendered for SEO */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          openIndex === index
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4">
          {answer}
        </div>
      </div>
    </div>
  );
}
