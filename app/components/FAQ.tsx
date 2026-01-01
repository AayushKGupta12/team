"use client";

import { useState } from "react";
import Script from "next/script";
import Image from "next/image";
import img1 from '../imgs/img1.png';
import img2 from '../imgs/img2.png';
import img3 from '../imgs/img3.png';
import img4 from '../imgs/img4.png';
import img5 from '../imgs/img5.png';
import img6 from '../imgs/img6.png';

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
                name: "What Does this resume Scanner do ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "This resume scanner analyzes resumes to check how well they match a job or internship role. It scans skills, keywords, experience, and formatting, then highlights strengths, gaps, and areas for improvement—helping candidates optimize their resume to pass ATS filters and improve shortlisting chances."
                }
              },
              {
                "@type": "Question",
                name: "How is this Different from normal ATS Resume checker ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Unlike a normal ATS checker that only scores keyword matches, this scanner gives contextual insights. It evaluates relevance of skills, role alignment, clarity, and impact of experience, and provides actionable suggestions—focusing on why your resume works or doesn’t, not just how many keywords you used."
                }
              },
              {
                "@type": "Question",
                name: "Is it a Fresher Friendly ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes—it's fresher-friendly. It's designed to work even if you don't have full-time experience. Just upload your projects, internships, certifications, and volunteering experience. It guides you to build a strong CV."
                }
              },
              {
                "@type": "Question",
                name: "Why do thousand trust this Resume analyser ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Thousands trust this resume analyser because it goes beyond basic ATS scoring. It provides accurate, role-specific resume optimization suggestions, and fresher-friendly insights—taking real context into account, not just keywords."
                }
              },
              {
                "@type": "Question",
                name: "Why a strong Resume Matters ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "It clearly shows your skills, experience, and potential. Helps you pass ATS filters, and convinces recruiters you're worth shortlisting. In a competitive job market, a strong resume is essential."
                }
              },
              {
                "@type": "Question",
                name: "What is job Recommendation ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Job recommendation is a feature that suggests relevant jobs by matching your skills with live openings. Instead of endlessly scrolling, it matches you with fresher-friendly listings, saving you time and increasing your chances of getting shortlisted."
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

            {/* Question 1 */}
            <section>
              <FAQItem
                index={0}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="What Does this resume Scanner do ?"
                answer="This resume scanner analyzes resumes to check how well they match a job or internship role. It scans skills, keywords, experience, and formatting, then highlights strengths, gaps, and areas for improvement—helping candidates optimize their resume to pass ATS filters and improve shortlisting chances."
                imagePlaceholder={img1}
                imagePosition="right"
              />
            </section>

            {/* Question 2 */}
            <section>
              <FAQItem
                index={1}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="How is this Different from normal ATS Resume checker ?"
                answer="Unlike a normal ATS checker that only scores keyword matches, this scanner gives contextual insights. It evaluates relevance of skills, role alignment, clarity, and impact of experience, and provides actionable suggestions—focusing on why your resume works or doesn’t, not just how many keywords you used."
                imagePlaceholder={img2}
                imagePosition="left"
              />
            </section>
            
            {/* Question 3 */}
            <section>
              <FAQItem
                index={2}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Is it a Fresher Friendly ?"
                answer="Yes—it's fresher-friendly. It's designed to work even if you don't have full-time experience. Just upload your projects, internships, certifications, and volunteering experience. It guides you to build a strong CV without requiring full-time work history. Instead of punishing them for limited experience, it guides freshers to build a more robust resume effectively instead of pressuring them for limited experience."
                imagePlaceholder={img3}
                imagePosition="right"
              />
            </section>

            {/* Question 4 */}
            <section>
              <FAQItem
                index={3}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Why do thousand trust this Resume analyser ?"
                answer="Thousands trust this resume analyser because it goes beyond basic ATS scoring. It provides accurate, role-specific resume optimization suggestions, and fresher-friendly insights—taking real context into account, not just keywords."
                imagePlaceholder={img4}
                imagePosition="left"
              />
            </section>

            {/* Question 5 */}
            <section>
              <FAQItem
                index={4}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Why a strong Resume Matters ?"
                answer="It clearly shows your skills, experience, and potential. Helps you pass ATS filters, and convinces recruiters you're worth shortlisting. In a competitive job market, a strong resume is essential."
                imagePlaceholder={img5}
                imagePosition="right"
              />
            </section>

            {/* Question 6 */}
            <section>
              <FAQItem
                index={5}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="What is job Recommendation ?"
                answer="Job recommendation is a feature that suggests relevant jobs by matching your skills with live openings. Instead of endlessly scrolling, it matches you with fresher-friendly listings, saving you time and increasing your chances of getting shortlisted."
                imagePlaceholder= {img6}
                imagePosition="left"
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
  imagePlaceholder,
  imagePosition = "right",
}: {
  index: number;
  openIndex: number | null;
  toggleFAQ: (index: number) => void;
  question: string;
  answer: string;
  imagePlaceholder: string | any;
  imagePosition?: "left" | "right";
}) {
  // Alternate glow colors
  const glowColor = index % 2 === 0 ? "shadow-green-400/50" : "shadow-pink-400/50";
  
  return (
    <div className="border border-[#2E5E99]/70 rounded-xl shadow-sm hover:shadow-md transition-all bg-white">
      <button
        onClick={() => toggleFAQ(index)}
        className="w-full flex justify-between items-center px-4 md:px-6 py-4 text-left focus:outline-none"
      >
        <span className="text-base md:text-lg font-semibold text-gray-700 pr-4">
          {question}
        </span>
        <svg
          className={`h-5 w-5 md:h-6 md:w-6 text-gray-600 transition-transform duration-300 shrink-0 ${
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
            ? "max-h-[800px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <div className={`flex flex-col gap-4 md:gap-6 items-start md:items-center ${
            imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
          }`}>
            {/* Text Content */}
            <div className="flex-1 text-sm md:text-base text-gray-600 leading-relaxed">
              {answer}
            </div>
            
            {/* Image Placeholder */}
            <div className="w-full md:w-64 lg:w-80 flex-shrink-0">
              <div 
                className={`relative w-full aspect-square md:aspect-[4/3] rounded-lg border-2 overflow-hidden transition-all ${
                  index % 2 === 0 
                    ? "border-green-300 shadow-lg shadow-green-300/60" 
                    : "border-pink-300 shadow-lg shadow-pink-300/60"
                }`}
                style={{
                  boxShadow: index % 2 === 0 
                    ? "0 10px 25px -5px rgba(74, 222, 128, 0.4), 0 8px 10px -6px rgba(74, 222, 128, 0.3)"
                    : "0 10px 25px -5px rgba(244, 114, 182, 0.4), 0 8px 10px -6px rgba(244, 114, 182, 0.3)"
                }}
              >
                {typeof imagePlaceholder === 'string' ? (
                  // Placeholder when no image
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <div className="text-center p-4">
                      <svg
                        className="mx-auto h-12 w-12 md:h-16 md:w-16 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs md:text-sm text-gray-500 font-medium">
                        Image Placeholder
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {imagePlaceholder}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Actual image
                  <Image 
                    src={imagePlaceholder} 
                    alt={question}
                    className="w-full h-full object-cover"
                    width={500}
                    height={400}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
