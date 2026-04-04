"use client";

import React from "react";
import { motion } from "framer-motion";

/* ─── Design tokens ─── */
const BLUE        = "#1d4ed8";
const BLUE_LIGHT  = "#eff6ff";
const BLUE_BORDER = "#dbeafe";
const BORDER      = "#e5e7eb";
const TEXT        = "#111827";
const MUTED       = "#4b5563";
const SUBTLE      = "#9ca3af";
const SURFACE     = "#f9fafb";
const CODE_BG     = "#f8fafc";

/* ─── JSON-LD structured data for Google + LLMs ─── */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "iATS – Intelligent and Predictive Applicant Tracking System",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://vfound.in/ai-resume-analysis",
      "description":
        "iATS by VFound is an AI-powered resume analysis engine trained on 3,00,000+ real Indian IT resumes. It evaluates resumes across 32+ hiring parameters and provides 8 distinct scores: iATS Score, Selection Score, Percentile Rank, Market Positioning, Career Health Score, Resume Quality Score, Experience Score, and Technical Compatibility Score all without requiring a job description.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "75 free lifetime credits" },
      "featureList": [
        "Word-by-word resume parsing",
        "ATS compatibility score with 99.99% accuracy",
        "No job description required",
        "Percentile rank against Indian IT candidate pool",
        "Monthly AI model updates",
        "32+ hiring parameters evaluated",
        "75 free lifetime credits"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I need to paste a job description to use iATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. iATS is pre-trained on 3,00,000+ real Indian IT resumes and benchmarks your resume against the entire IT industry no job description, job title, or company name required. Upload your resume and get all 8 scores immediately."
          }
        },
        {
          "@type": "Question",
          "name": "How is iATS different from ChatGPT resume analysis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChatGPT generates plausible-sounding feedback from internet text with no access to real hiring data. iATS scores your resume against 3,00,000+ real Indian IT candidate profiles using 32+ measured hiring parameters, giving concrete percentile ranks and scores not generated opinions."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is iATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The iATS Score predicts whether a real ATS will reject or shortlist your resume with 99.99% accuracy, calculated against the entire IT industry's current ATS logic and hiring parameters, updated every month."
          }
        },
        {
          "@type": "Question",
          "name": "What scores does iATS provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iATS provides 8 scores: iATS Score (ATS prediction), Selection Score, Percentile Rank, Market Positioning, Career Health Score, Resume Quality Score, Experience Score, and Technical Skills and Compatibility Score all displayed in an Intelligent Performance Tracking Dashboard."
          }
        },
        {
          "@type": "Question",
          "name": "Is iATS suitable for freshers and students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. iATS is built for students, freshers, and IT professionals at all career stages. It fairly evaluates academic projects, hackathons, certifications, and internships not just full-time work experience."
          }
        }
      ]
    }
  ]
};

/* ─── Animation preset ─── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ─── Score card h3 for SEO ─── */
const ScoreCard = ({ number, title, description }) => (
  <div className="bg-white p-6 flex flex-col gap-2">
    <span className="text-[12px] font-bold tracking-widest text-[#9ca3af]">{number}</span>
    <h3 className="text-[16px] font-bold text-[#1d4ed8] leading-tight m-0">{title}</h3>
    <p className="text-[15px] text-[#4b5563] leading-[1.7] m-0">{description}</p>
  </div>
);

/* ─── Main export ─── */
const QASection = () => {
  const scores = [
    { number: "01", title: "iATS Score ATS Compatibility", description: "Predicts with 99.99% accuracy whether a real ATS will reject or shortlist your resume, evaluated against the entire Indian IT industry." },
    { number: "02", title: "Technical Skills & Compatibility Score", description: "Detailed breakdown of your tech stack, frameworks, and tools scored against what Indian IT is actively hiring for right now." },
    { number: "03", title: "Market Positioning", description: "Identifies which roles you're competitive for today, your current market level (fresher / mid / senior), and what moves you into higher-demand positions." },
    { number: "04", title: "Career Health Score", description: "Long-term trajectory rating based on technical growth, skill relevance, depth of experience, and market alignment." },
    { number: "05", title: "Resume Quality Score", description: "Flags formatting issues, weak phrasing, missing sections, and structural problems that cause ATS rejection." },
    { number: "06", title: "Selection Score", description: "Predicted probability (out of 100) that a recruiter or hiring system will shortlist your resume based on skills, experience, and market alignment." },
    { number: "07", title: "Percentile Rank", description: "Shows exactly where your resume stands versus all other IT applicants in a similar profile pool a real competitive benchmark." },
    { number: "08", title: "Experience Score", description: "Assesses the depth, relevance, and impact of your work experience, internships, projects, and contributions scored against real hiring expectations for your career stage." },
  ];

  const comparison = [
    { criteria: "Training data",        ours: "3,00,000+ real Indian IT resumes",             theirs: "General internet text no real hiring data" },
    { criteria: "India-specific",       ours: "Calibrated for Indian IT market",             theirs: "Dominated by US/global context" },
    { criteria: "ATS rules",            ours: "Real ATS keyword & format logic",             theirs: "Inferred from general knowledge" },
    { criteria: "Hallucination risk",   ours: "None scores from measured data patterns",   theirs: "High generates plausible, not factual, feedback" },
    { criteria: "Tech recommendations", ours: "What Indian IT is actively hiring for now",   theirs: "Often suggests hyped / future tech not yet in demand" },
    { criteria: "JD required",          ours: "No model evaluates against full IT market", theirs: "Usually requires a JD to compare against" },
    { criteria: "Scores provided",      ours: "8 distinct, measurable scores",               theirs: "Single text response, no structured scoring" },
    { criteria: "Benchmarking",         ours: "Percentile rank vs. real Indian IT profiles", theirs: "No real benchmark subjective opinion" },
    { criteria: "Model updates",        ours: "Updated monthly",                             theirs: "Training data frozen at cutoff date" },
  ];

  return (
    <>
      {/* ── JSON-LD: injected for Google + LLM crawlers ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <main
        className="bg-white text-[#111827] font-sans"
        aria-label="iATS resume analysis features and comparison"
      >

        {/* ── SECTION 1: What is iATS ── */}
        <section className="py-16 px-6 border-b border-[#e5e7eb]">
          <div className="max-w-[960px] mx-auto flex flex-wrap gap-14 items-center">

            <motion.div {...fade(0)} className="flex-1 basis-[340px]">
              <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.15] text-[#111827] mb-5">
                India's only resume engine trained on real IT hiring data
              </h1>
              <p className="text-[clamp(16px,2vw,18px)] text-[#4b5563] leading-[1.85] mb-8">
                iATS the Intelligent and Predictive Applicant Tracking System is trained on
                3,00,000+ real Indian IT resumes across every career tier and domain.
                Not synthetic. Not scraped. Ground truth data, updated every month.
                It evaluates your resume across 32+ hiring parameters and gives you 8 distinct scores no job description needed.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { val: "3,00,000+",   sub: "Real IT resumes trained on" },
                  { val: "32+",       sub: "Hiring parameters" },
                  { val: "8 scores",  sub: "Distinct, measurable outputs", accent: true },
                  { val: "Monthly",   sub: "AI model updates" },
                ].map((s, i) => (
                  <div key={i} className="border border-[#e5e7eb] rounded-xl p-4 min-w-[130px]">
                    <p className={`text-2xl font-extrabold mb-1 ${s.accent ? 'text-[#1d4ed8]' : 'text-[#111827]'}`}>{s.val}</p>
                    <p className="text-[13px] text-[#9ca3af] m-0">{s.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.12)} className="flex-1 basis-[290px] bg-[#f8fafc] border border-[#e5e7eb] rounded-2xl p-7 text-sm leading-[2.3] font-mono text-[#374151]">
              <p className="text-[#9ca3af] text-xs mb-1.5">// iATS pipeline</p>
              <p className="m-0">Input  <span className="text-[#9ca3af]">→</span> <span className="text-[#1d4ed8]">Your resume (PDF)</span></p>
              <p className="m-0">Parse  <span className="text-[#9ca3af]">→</span> Word-by-word analysis</p>
              <p className="m-0">Data   <span className="text-[#9ca3af]">→</span> 3,00,000+ IT resume patterns</p>
              <p className="m-0">Params <span className="text-[#9ca3af]">→</span> 32+ hiring parameters</p>
              <p className="m-0">Output <span className="text-[#9ca3af]">→</span> <span className="text-[#1d4ed8]">8 scores + best-fit roles</span></p>
              <p className="m-0">JD     <span className="text-[#9ca3af]">→</span> <span className="text-[#16a34a]">Not required</span></p>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: 8 Scores ── */}
        <section className="py-16 px-6 border-b border-[#e5e7eb]">
          <div className="max-w-[960px] mx-auto">
            <motion.div {...fade(0)}>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold text-[#111827] mb-2.5">
                8 precision scores. One performance dashboard.
              </h2>
              <p className="text-[clamp(15px,2vw,17px)] text-[#4b5563] mb-9 max-w-[560px] leading-[1.8]">
                Every dimension a real IT recruiter and a real ATS system evaluates. Each score is measurable, benchmarked, and tracked over time as you improve your resume.
              </p>
            </motion.div>

            <motion.div
              {...fade(0.1)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-[#e5e7eb] rounded-2xl overflow-hidden bg-[#e5e7eb]"
            >
              {scores.map((s, i) => <ScoreCard key={i} {...s} />)}
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: No JD Required ── */}
        <section className="py-16 px-6 border-b border-[#e5e7eb]">
          <div className="max-w-[960px] mx-auto flex flex-wrap gap-14 items-start">

            <motion.div {...fade(0)} className="flex-1 basis-[320px]">
              <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-[#111827] leading-tight mb-4">
                The model already knows what recruiters want
              </h2>
              <p className="text-[clamp(15px,2vw,17px)] text-[#4b5563] leading-[1.85] mb-4">
                Most tools compare your resume against a single job description. iATS is different
                because it was trained on 3,00,000+ real Indian IT resumes and benchmarks your profile
                against the entire IT industry. It doesn't need a JD to evaluate you.
              </p>
              <p className="text-[clamp(15px,2vw,17px)] text-[#4b5563] leading-[1.85]">
                It predicts your best-fit role, market level, and skill tier from your resume alone
                word by word, parameter by parameter, in seconds.
              </p>
            </motion.div>

            <motion.div {...fade(0.12)} className="flex-1 basis-[290px] flex flex-col gap-4 pt-1.5">
              <div className="border border-[#e5e7eb] border-l-[3px] border-l-[#dc2626] rounded-r-2xl p-5">
                <p className="text-xs font-bold tracking-[0.05em] uppercase text-[#dc2626] mb-1.5">Traditional tools</p>
                <p className="text-[15px] text-[#4b5563] leading-[1.7]">Paste a job description → get a match % against that single post. Change roles, start over.</p>
              </div>
              <div className="border border-[#dbeafe] border-l-[3px] border-l-[#1d4ed8] rounded-r-2xl p-5 bg-[#f8fafc]">
                <p className="text-xs font-bold tracking-[0.05em] uppercase text-[#1d4ed8] mb-1.5">iATS approach</p>
                <p className="text-[15px] text-[#4b5563] leading-[1.7]">Upload your resume → model benchmarks against 3,00,000 profiles and the full IT market. 8 scores. No JD. No guesswork.</p>
              </div>
              <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-5">
                <p className="text-[15px] font-bold text-[#111827] mb-1">75 free lifetime credits</p>
                <p className="text-sm text-[#4b5563]">Re-analyse as you improve your resume. Track all 8 scores over time in your dashboard.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 4: vs ChatGPT ── */}
        <section className="py-16 px-6 border-b border-[#e5e7eb]">
          <div className="max-w-[960px] mx-auto">
            <motion.div {...fade(0)}>
              <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-[#111827] mb-3">
                Why ChatGPT resume analysis gets it wrong
              </h2>
              <p className="text-[clamp(15px,2vw,17px)] text-[#4b5563] max-w-[620px] leading-[1.85] mb-2.5">
                ChatGPT is a language model it predicts the next likely word, not real hiring outcomes.
                It has no access to actual recruiter decisions, Indian market data, or real ATS logic.
              </p>
              <p className="text-[clamp(15px,2vw,17px)] text-[#4b5563] max-w-[620px] leading-[1.85] mb-8">
                Its feedback sounds confident but it's generated, not measured. It often recommends
                trending or upcoming technologies not yet in active demand misleading candidates about
                what actually gets them shortlisted today.
              </p>
            </motion.div>

            {/* Semantic comparison table */}
            <motion.div {...fade(0.1)} className="border border-[#e5e7eb] rounded-2xl overflow-hidden">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                    <th scope="col" className="p-3 px-4.5 text-left text-xs font-bold text-[#9ca3af] uppercase tracking-widest w-[26%]">Criteria</th>
                    <th scope="col" className="p-3 px-4.5 text-left text-[13px] font-bold text-[#1d4ed8] w-[37%]">iATS by VFound</th>
                    <th scope="col" className="p-3 px-4.5 text-left text-[13px] font-bold text-[#737881] w-[37%]">ChatGPT / Other Models</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className={`border-b border-[#f3f4f6] last:border-none bg-white`}>
                      <td className="p-3.5 px-4.5 text-[#374151] font-medium">{row.criteria}</td>
                      <td className="p-3.5 px-4.5 text-[#111827]">
                        <span className="text-[#16a34a] font-bold mr-1.5">✓</span>{row.ours}
                      </td>
                      <td className="p-3.5 px-4.5 text-[#9ca3af]">
                        <span className="text-[#dc2626] mr-1.5">✕</span>{row.theirs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 5: FAQ (schema-backed) ── */}
        <section className="py-16 px-6">
          <div className="max-w-[960px] mx-auto">
            <motion.div {...fade(0)}>
              <span className="block text-xs font-bold tracking-[0.2em] uppercase text-[#1d4ed8] mb-3.5">Frequently asked questions</span>
              <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-[#111827] mb-8">
                Common questions about iATS
              </h2>
            </motion.div>

            <div className="flex flex-col gap-px border border-[#e5e7eb] rounded-2xl overflow-hidden bg-[#e5e7eb]">
              {JSON_LD["@graph"][1].mainEntity.map((faq, i, arr) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.07)}
                  className="bg-white p-6 last:border-b-0 border-b border-[#e5e7eb]"
                >
                  <h3 className="text-[16px] font-bold text-[#111827] mb-2.5 leading-tight">{faq.name}</h3>
                  <p className="text-[15px] text-[#4b5563] leading-[1.8]">{faq.acceptedAnswer.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default QASection;