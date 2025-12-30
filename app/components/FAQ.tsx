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

          <h2 className="text-6xl font-bold text-center mb-10 text-gray-900 kaushan-script-regular">
            Want to know more ?
          </h2>

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
                      Yes, Vfound offers a completely free resume analysis
                      feature designed specifically for IT students, recent
                      graduates, and early career professionals. Unlike basic
                      keyword scanners, our system deeply evaluates your resume
                      against current hiring expectations.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Technical depth and skill relevance analysis</li>
                      <li>ATS-compatibility and formatting checks</li>
                      <li>Comparison with real market competition</li>
                      <li>Clear and actionable improvement suggestions</li>
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
                      Yes, Vfound actively helps candidates discover real and
                      relevant IT job opportunities through its dedicated jobs
                      section. The focus is on fresher friendly and off campus
                      hiring.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Live IT job openings from trusted sources</li>
                      <li>Off campus and entry level roles</li>
                      <li>Direct application links to company pages</li>
                      <li>No recruitment agencies or middlemen involved</li>
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
                      preparation platform that connects users with real job opportunities.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Jobs link directly to company career pages</li>
                      <li>No resume selling or third-party sharing</li>
                      <li>Users apply independently</li>
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
                      Yes, user data privacy and security are taken seriously on Vfound.
                      Uploaded resumes are processed only to provide analysis and insights.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>No public sharing</li>
                      <li>Used only for analysis and improvement</li>
                      <li>Handled using secure infrastructure</li>
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
                      Our learning and career roadmaps are updated every month
                      to reflect the fast changing technology industry and
                      current hiring trends.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>New tools and frameworks added regularly</li>
                      <li>Skills aligned with real job requirements</li>
                      <li>Optimized for freshers and early professionals</li>
                      <li>Focus on long-term IT career growth</li>
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
                    Vfound is built specifically for recent IT graduates and early-career
                    professionals, unlike generic job portals or resume tools. Every feature
                    is designed with fresher-level hiring expectations and real-world
                    industry needs in mind.
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-gray-700">
                    <li>Resume analysis focused on technical depth, not just keywords</li>
                    <li>Live and fresher-friendly IT job listings</li>
                    <li>AI-powered insights tailored to specific job roles</li>
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
                    Yes, Vfound offers a free trial that allows users to experience core
                    platform features before committing to any paid plans. The free trial
                    is designed to help you understand how our tools work and how they can
                    improve your job readiness.
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-gray-700">
                    <li>No credit card required to start</li>
                    <li>Free resume analysis with actionable feedback</li>
                    <li>Access to essential career insights</li>
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
                      power its resume analysis and content optimization tools.
                      The goal is to provide context aware and role specific
                      insights.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Skill gap detection based on job roles</li>
                      <li>Contextual resume evaluation</li>
                      <li>Modern ATS-aligned recommendations</li>
                      <li>Improved clarity and resume impact</li>
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
