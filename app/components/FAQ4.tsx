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
                name: "What is the Vfound Chrome Extension?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "The Vfound Chrome Extension is an AI-powered smart study and resume assistance tool that helps users analyze content, simplify technical topics, and track usage credits directly inside their browser."
                }
              },
              {
                "@type": "Question",
                name: "Is the Vfound Chrome Extension free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, the Vfound Chrome Extension provides free credits for new users. Additional usage can be unlocked through recharge options inside the dashboard."
                }
              },
              {
                "@type": "Question",
                name: "How does the Vfound Chrome Extension use AI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "The extension uses advanced AI models to simplify study material, provide technical explanations, generate coding insights when required, and deliver concise responses for faster learning."
                }
              }
            ]
          }),
        }}
      />

      <section className="w-full py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-6xl font-bold text-center mb-10 text-gray-900">
            Frequently asked Question 
          </h1>

          <div className="space-y-6">

            <section>
              <FAQItem
                index={0}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="What is the Vfound Chrome Extension?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Vfound Chrome Extension</span> is an AI powered browser tool
                      designed to help students and developers simplify technical
                      content instantly. It works directly inside your browser
                      without switching tabs.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>AI powered <span className="bg-[#ffe8b1] px-2">smart study assistance</span></li>
                      <li>Instant <span className="bg-[#ffe8b1] px-2">technical explanations</span></li>
                      <li>Context aware coding insights</li>
                      <li>Secure API key based access</li>
                    </ul>
                  </>
                }
              />
            </section>

            <section>
              <FAQItem
                index={1}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Is the Vfound Chrome Extension free to use?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> the extension provides free credits
                      for new users so they can experience its features before
                      upgrading.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Free initial usage credits</li>
                      <li>No hidden background charges</li>
                      <li>Recharge option available when credits finish</li>
                      <li>Transparent usage tracking via dashboard</li>
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
                question="How do I activate the extension?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Activation is simple. After installing the extension,
                      you just need your <span className="bg-[#ffe8b1] px-2">unique API key</span>
                      from the Vfound dashboard.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Login to Vfound dashboard</li>
                      <li>Generate or copy your API key</li>
                      <li>Paste it inside the extension popup</li>
                      <li>Reload extension once after saving</li>
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
                question="Is my data secure while using the extension?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      <span className="bg-[#ffe8b1] px-2">Yes,</span> user privacy is a priority.
                      The extension processes content only to generate responses
                      and does not publicly store or share your data.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>No public data exposure</li>
                      <li>Secure API key authentication</li>
                      <li>Temporary session based history</li>
                      <li>Encrypted communication with backend</li>
                    </ul>
                  </>
                }
              />
            </section>

            <section>
              <FAQItem
                index={2}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="How are usage credits calculated?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Credits are deducted each time the extension processes
                      a smart study request. This ensures fair and optimized
                      usage across all users.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Each AI request consumes credits</li>
                      <li>Usage tracked in real time</li>
                      <li>Dashboard shows remaining balance</li>
                      <li>Recharge option available anytime</li>
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
                question="What makes this extension different from other AI tools?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Unlike generic AI chat tools, Vfound Chrome Extension
                      is built specifically for <span className="bg-[#ffe8b1] px-2">students and developers</span>
                      who need concise, focused explanations.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Short and optimized answers</li>
                      <li>Technical context aware responses</li>
                      <li>Developer focused assistant mode</li>
                      <li>Integrated usage credit system</li>
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
                question="Do I need an account to use the extension?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      Yes, an account is required to generate your API key
                      and track usage securely through the Vfound dashboard.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>Account based authentication</li>
                      <li>Secure API key generation</li>
                      <li>Usage monitoring and recharge</li>
                      <li>Personalized smart study experience</li>
                    </ul>
                  </>
                }
              />
            </section>

            <section>
              <FAQItem
                index={3}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="How does the extension use AI?"
                answer={
                  <>
                    <p className="mb-3 text-gray-700">
                      The extension uses advanced AI models to provide
                      <span className="bg-[#ffe8b1] px-2"> concise technical explanations</span>,
                      simplify study materials, and assist with coding when required.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                      <li>AI powered smart study responses</li>
                      <li>Context aware simplification</li>
                      <li>Code suggestions when necessary</li>
                      <li>Optimized short answers for productivity</li>
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
