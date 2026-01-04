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
  question: "What does this resume scanner do?",
  answer:
    "It evaluates how modern ATS systems and recruiters read your resume in seconds. The scanner analyzes skill relevance, experience depth, project quality, and overall resume clarity to show how well your profile matches current hiring expectations.",
  intro: "You get:",
  bullets: [
    "Clear strengths and weaknesses in your resume",
    "Skill relevance feedback based on job roles",
    "Project and experience quality evaluation",
    "Resume structure and clarity insights"
  ]
},
{
  question: "How is this different from normal ATS resume checkers?",
  answer:
    "Unlike basic ATS tools that only check keywords, formatting, and sections, this advanced resume analyzer evaluates your resume on real-world parameters. It analyzes skills, projects, tech stack, internships, and experience quality, and compares your profile with over 60,000 Indian resumes aligned to current hiring trends.",
  intro: "This resume analyzer goes beyond ATS by evaluating:",
  bullets: [
    "Skill relevance for specific job roles",
    "Project depth and real-world applicability",
    "Internship experience and hands-on work",
    "Alignment with current Indian hiring trends"
  ]
},
{
  question: "Who is this resume analyzer for?",
  answer:
    "This resume analyzer is designed for students, fresh graduates, internship applicants, entry-level IT roles, and early-career professionals who want to understand how recruiters evaluate their profiles.",
  intro: "Ideal for:",
  bullets: [
    "Students and fresh graduates",
    "Internship applicants",
    "Entry-level IT and software roles",
    "Early-career professionals"
  ]
},
{
  question: "Is it fresher friendly?",
  answer:
    "Yes. The system is built to fairly evaluate freshers by focusing on academic projects, skills, internships, certifications, hackathons, and practical tools used, instead of relying only on full-time work experience.",
  intro: "The system understands:",
  bullets: [
    "College and academic projects",
    "Internships and training programs",
    "Hackathons and recognized certifications",
    "Practical tools and technology stacks"
  ]
},
{
  question: "What insights do you get after uploading?",
  answer:
    "Within 10 seconds, you receive a detailed breakdown of your resume, including strengths, weaknesses, skill gaps, and actionable suggestions to improve your chances of shortlisting.",
  intro: "You receive:",
  bullets: [
    "Experience score and technical depth required for today’s job market",
    "Percentile score among 60,000+ Indian resumes",
    "Best-matching job roles based on your profile",
    "Detailed scoring across skills, experience, projects, and ATS readiness"
  ]
},
{
  question: "Why do thousands trust this resume analyzer?",
  answer:
    "The resume analyzer is trained on more than 60,000 real Indian resumes and is optimized for students and freshers. It delivers accurate, practical insights that reflect real hiring patterns, earning the trust of over 7,000 users.",
  intro: "Why users trust it:",
  bullets: [
    "Trained on 60,000+ real Indian resumes",
    "Optimized specifically for students and freshers",
    "Continuously updated with current hiring trends",
    "Simple, fast, and easy to use"
  ]
},
{
  question: "Why does a strong resume matter?",
  answer:
    "Recruiters spend only a few seconds reviewing each resume. A strong, well-structured resume increases your chances of shortlisting, improves interview calls, and helps you stand out in competitive hiring processes.",
  intro: "A strong resume:",
  bullets: [
    "Increases interview call chances",
    "Improves shortlisting potential",
    "Helps you stand out in competitive hiring"
  ]
},{
  question: "What is job recommendation?",
  answer:
    "Our job recommendation feature analyzes your resume to suggest job roles that best match your skills and experience. It helps you identify suitable positions in the IT industry, increasing your chances of landing interviews.",
  intro: "A strong resume:",
  bullets: [
    "Identifies job roles aligned with your profile",
    "Increases chances of landing interviews",
    "Saves time in job search by focusing on relevant openings"
  ]
}


];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* ✅ SEO FAQ Schema */}
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
    </>
  );
}
