"use client";

import { useState } from "react";
import Script from "next/script";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
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
                    "Yes, Vfound provides free resume analysis with ATS checks, technical depth evaluation, and actionable improvement suggestions for IT graduates and freshers."
                }
              },
              {
                "@type": "Question",
                name: "Does Vfound provide IT jobs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, Vfound lists real IT job openings including off-campus roles, fresher jobs, and direct company application links."
                }
              },
              {
                "@type": "Question",
                name: "Does Vfound use AI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, Vfound uses advanced AI and large language models to analyze resumes, detect skill gaps, and optimize content for modern hiring systems."
                }
              }
            ]
          }),
        }}
      />

      <section className="w-full py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-6xl font-bold text-center mb-10 text-gray-900 kaushan-script-regular">
            Want to know more ?
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
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> Vfound offers a <span className="bg-[#ffe8b1] px-2">completely free</span> resume analysis
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
                question="Does Vfound provide IT jobs?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> Vfound actively helps candidates discover real and
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
                question="Do recruiters directly hire from Vfound?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Vfound is not a recruitment agency. Instead, it acts as a discovery and
                      <span className="bg-[#ffe8b1] px-2">preparation platform</span> that connects users with real job opportunities.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Jobs link directly to company career pages</li>
                      <li>No resume selling or third-party sharing</li>
                      <li>Users <span className="bg-[#ffe8b1] px-2">apply independently</span></li>
                      <li>Complete transparency in job applications</li>
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
                question="Is my resume data safe on Vfound?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> user data privacy and security are taken seriously on Vfound.
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
              question="How is Vfound different from other platforms?"
              answer={
                <>
                  <p className="mb-3 text-gray-700">
                    Vfound is built specifically for <span className="bg-[#ffe8b1] px-2">recent IT graduates</span> and early-career
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
                    Yes, Vfound offers a <span className="bg-[#ffe8b1] px-2">free trial that</span> allows users to experience core
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
                question="Does Vfound use AI?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Yes, Vfound uses advanced AI and large language models to
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
