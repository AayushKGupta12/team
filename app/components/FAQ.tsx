"use client";

import { useState } from "react";
import Script from "next/script";
import Image, { StaticImageData } from "next/image";


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
                intro="It analyzes how recruiters and ATS systems read your resume in seconds.
You get:"
bullets={[
  "Clear strengths and weaknesses",
  "Skill relevance feedback",
  "Project and experience evaluation",
  "Resume structure and clarity insights",
  "Designed for real hiring scenarios in India, not generic templates."
]}
                
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
                intro="Most tools only check keyword matching.
This resume analyzer goes beyond ATS by evaluating:"
                bullets={[
                  "Skill relevance for specific job roles",
                  "Project depth and real-world applicability",
                  "Internships, academics, and hands-on experience",
                  "Alignment with current Indian hiring trends"
                ]}
                end={["Result: A resume that works for both machines and recruiters."]}
                
                imagePosition="left"
              />
            </section>
            
            {/* Question 3 */}
            <section>
              <FAQItem
                index={2}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Who Is This Resume Analyzer For?"
                intro="Ideal for:"
                bullets={[
                  "Students and fresh graduates",
                  "Internship applicants",
                  "Entry-level IT and software roles",
                  "Early-career professionals",
                  "Even without full-time experience, your projects, skills, and training are properly recognized."
                ]}
                
                imagePosition="right"
              />
            </section>

            {/* Question 4 */}
            <section>
              <FAQItem
                index={3}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Is It Fresher-Friendly?"
                intro="Yes. Freshers are evaluated differently and fairly.
The system understands:"
                bullets={[
                  "College and academic projects",
                  "Internships and training programs",
                  "Hackathons and certifications",
                  "Practical tools and tech stacks",
                  "Your strengths are highlighted, not ignored."
                ]}
                
                imagePosition="left"
              />
            </section>

            {/* Question 5 */}
            <section>
              <FAQItem
                index={4}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="What Insights Do You Get After Uploading?"
                intro="In under 10 seconds, you receive:"
                bullets={[
                  "Resume strengths and weak points",
                  "Skill gap analysis",
                  "Project improvement suggestions",
                  "Resume clarity and structure feedback",
                  "Your resume remains secure and private and is never shared."
                ]}
                
                imagePosition="right"
              />
            </section>

            {/* Question 6 */}
            <section>
              <FAQItem
                index={5}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Why Do Thousands Trust This Resume Analyzer?"
                intro="Trained on 60,000+ real Indian resumes. More than basic ATS keyword scanning, it is more about:-"
                bullets={[
                  "Optimized for students and freshers",
                  "Updated with current industry hiring trends",
                  "Simple, fast, and easy to use",
                  "Over 7000 resumes scanned with a 4.4 user rating."
                ]}
                
                imagePosition="left"
              />
            </section>

            <section>
              <FAQItem
                index={6}
                openIndex={openIndex}
                toggleFAQ={toggleFAQ}
                question="Why A Strong Resume Matters?"
                intro="Recruiters spend only a few seconds on each resume.
A well-structured, relevant resume:"
                bullets={[
                  "Increases interview calls",
                  "Improves shortlist chances",
                  "Helps you stand out in competitive hiring",
                  "This platform helps you identify what is holding your resume back and how to fix it."
                ]}
                
                imagePosition="right"
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
  intro,
  bullets,
  end,
  imagePlaceholder,
  imagePosition = "right",
}: {
  index: number;
  openIndex: number | null;
  toggleFAQ: (index: number) => void;
  question: string;
  intro: string;
  bullets: string[];
  end: string[];
  imagePlaceholder?: string | StaticImageData;
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
            ? "max-h-200px opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <div className={`flex flex-col gap-4 md:gap-6 items-start md:items-center ${
            imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
          }`}>
            {/* Text Content */}
            <div className="flex-1 text-sm md:text-base text-gray-600 leading-relaxed">
              <p className="mb-4">{intro}</p>
              <ul className="space-y-2 list-disc list-inside">
                {bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
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
                {!imagePlaceholder || typeof imagePlaceholder === 'string' ? (
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
                    src={imagePlaceholder as any} 
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
