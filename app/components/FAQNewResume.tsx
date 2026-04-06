"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Can I use Vfound after ChatGPT or other AI tools?",
    answer:
      "Yes. Vfound is specifically designed to be used after tools like ChatGPT, Gemini, or Claude. While these AI tools help you write and optimize your resume, Vfound analyzes it using real ATS scoring logic, keyword matching, and recruiter-level evaluation to ensure it performs well in actual hiring systems.",
  },
  {
    id: 2,
    question: "Why should I not rely only on ChatGPT for resume optimization?",
    answer:
      "ChatGPT is excellent for generating and improving resume content, but it does not simulate real Applicant Tracking Systems (ATS). Vfound bridges this gap by providing ATS score, keyword gap analysis, and domain-specific recommendations, making your resume job-ready for real-world screening.",
  },
  {
    id: 3,
    question: "What makes Vfound different from other AI resume analyzers?",
    answer:
      "Vfound is built for students and early professionals preparing for internships and placements. It combines AI-based resume analysis with ATS scoring, recruiter insights, and domain-specific evaluation, making it more practical than generic resume tools.",
  },
  {
    id: 4,
    question: "What is an ATS score and why is it important?",
    answer:
      "An ATS (Applicant Tracking System) score represents how well your resume matches job requirements based on keywords, formatting, and structure. Recruiters use ATS software to filter resumes, and Vfound helps you optimize your resume to pass these filters effectively.",
  },
  {
    id: 5,
    question: "Is Vfound a good resume analyzer for students and freshers?",
    answer:
      "Yes. Vfound is one of the best resume analyzers for students and freshers, especially for campus placements and internships. It focuses on improving shortlist chances by aligning resumes with industry expectations and recruiter behavior.",
  },
  {
    id: 6,
    question: "How does Vfound improve my chances of getting shortlisted?",
    answer:
      "Vfound identifies missing keywords, weak project descriptions, formatting issues, and skill gaps. By fixing these based on ATS and recruiter standards, users typically see higher visibility and better shortlist rates in job applications.",
  },
  {
    id: 7,
    question: "When should I use Vfound in my resume preparation workflow?",
    answer:
      "The ideal workflow is: first use an AI tool like ChatGPT to draft or optimize your resume, and then use Vfound as the final validation step to check ATS score and real-world effectiveness before applying to jobs.",
  },
  {
    id: 8,
    question: "Can Vfound help with internship and placement preparation?",
    answer:
      "Yes. Vfound is designed for internship and placement preparation. It provides insights tailored for software engineering roles, technical internships, and entry-level positions, helping you stand out among thousands of applicants.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        
        {/* SEO Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          AI Resume Analysis & ATS Optimization – FAQs
        </h2>

        <p className="text-slate-600 mb-10">
          Learn how to use Vfound as the final ATS validation step after using AI tools like ChatGPT for resume optimization.
        </p>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-slate-900 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-slate-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 JSON-LD for SEO + LLM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}