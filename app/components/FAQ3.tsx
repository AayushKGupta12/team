"use client";

import { useState } from "react";
import Script from "next/script";

type FAQData = {
  question: string;
  answer: string;
  intro?: string;
  bullets?: string[];
};

const FAQS: FAQData[] = [
  {
    question: "What does this AI cover letter generator do?",
    answer:
      "It generates ATS-friendly, human-sounding cover letters tailored specifically for Indian IT job roles. Using our fine-tuned Large Language Model trained on over 2.1 billion parameters and real Indian IT cover letters, it creates professional content that recruiters actually want to read.",
    intro: "You get:",
    bullets: [
      "Cover letters optimized for ATS and recruiter screening",
      "Human-written language that doesn’t sound robotic",
      "Industry-specific tone for Indian IT roles",
      "Professional structure recruiters expect"
    ]
  },
  {
    question: "How is this different from normal AI cover letter tools?",
    answer:
      "Unlike generic AI tools that generate vague or repetitive content, our system uses a fine-tuned Large Language Model trained specifically on Indian IT cover letters. It understands how recruiters evaluate candidates and writes role-focused content instead of generic paragraphs.",
    intro: "This cover letter generator focuses on:",
    bullets: [
      "Indian IT hiring expectations",
      "ATS-friendly wording and formatting",
      "Human-like phrasing instead of AI buzzwords",
      "Clear alignment with job descriptions"
    ]
  },
  {
    question: "Is it fresher friendly?",
    answer:
      "Yes. The system is designed to highlight skills, projects, internships, certifications, and practical experience instead of focusing only on full-time work history. This helps freshers compete fairly in the hiring process.",
    intro: "The generator highlights:",
    bullets: [
      "Academic and personal projects",
      "Internships and training experience",
      "Technical skills and tools",
      "Learning mindset and growth potential"
    ]
  },
  {
    question: "How does it improve ATS visibility?",
    answer:
      "The cover letters are structured and worded to align with how modern ATS systems scan applications. Relevant keywords, role-specific phrasing, and clean formatting help increase shortlisting chances.",
    intro: "ATS optimization includes:",
    bullets: [
      "Role-specific keywords",
      "Clear professional structure",
      "Readable formatting for ATS parsing",
      "Balanced keyword density without stuffing"
    ]
  },
  {
    question: "How does this strengthen my resume and profile?",
    answer:
      "A strong cover letter complements your resume by clearly explaining your intent, skills, and role fit. It helps recruiters understand your profile faster and increases your chances of interview shortlisting.",
    intro: "A strong cover letter:",
    bullets: [
      "Supports your resume with context",
      "Highlights your strengths clearly",
      "Improves recruiter engagement",
      "Increases interview call chances"
    ]
  },
  {
    question: "What details do I need to provide?",
    answer:
      "You only need to provide the company name and job profile. The system automatically generates a tailored cover letter aligned with the role and hiring expectations.",
    intro: "You only enter:",
    bullets: [
      "Company name",
      "Job profile",
      "No long forms or extra inputs required"
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })
        }}
      />

      <section className="w-full py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#0d2440]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="border border-[#2E5E99] rounded-xl bg-white transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
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
                    openIndex === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-800 text-sm md:text-base">
                    <p className="mb-3">{faq.answer}</p>
                    <ul className="list-disc list-inside space-y-2 text-[#0d2440]">
                      {faq.bullets?.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-12 bg-gradient-to-b from-white to-[#f8fbff]">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="bg-[#e6a520] rounded-xl overflow-hidden">
          <div className="px-6 py-12 lg:py-20 lg:px-20 text-center text-white">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight ">
            Land your dream job with<br />a cover letter that <span className='bg-[#7b7f85]/90 px-2'>stands out</span>
            </h2>

            <div className="mt-10 flex gap-6 items-center justify-center">
              <a
                href="#1"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                Create My Cover Letter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
