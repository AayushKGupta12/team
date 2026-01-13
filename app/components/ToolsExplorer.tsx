'use client';

import { useState, useEffect } from 'react';
import { Search, FileText, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToolsExplorer() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const companies = [
    { name: 'Google', color: 'from-[#2A7B9B] to-[#57C785]' },
    { name: 'Microsoft', color: 'from-[#22C1C3] to-[#D8BC46]' },
    { name: 'Netflix', color: 'from-[#2A7B9B] to-[#57C785]' },
    { name: 'Walmart', color: 'from-[#22C1C3] to-[#D8BC46]' },
    { name: 'Zoho', color: 'from-[#2A7B9B] to-[#57C785]' },
    { name: 'TCS', color: 'from-[#22C1C3] to-[#D8BC46]' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % companies.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-3 py-6">

      {/* Resume Analysis */}
      <a
        href="/ai-resume-analysis"
        className="relative flex-1 bg-gradient-to-br from-[#E02F75] to-[#6700A3] rounded-md p-8 text-white shadow-lg overflow-hidden"
      >
        {/* Background Icon */}
        <FileText
          className="absolute right-6 bottom-22 w-50 h-50 text-white opacity-10"
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold mb-4">
            Advanced Resume Analysis
          </h2>
          <p className="text-base opacity-90 max-w-md">
            AI-powered resume analysis with actionable insights to improve shortlisting success.
          </p>
        </div>

        <div className="mt-10 sm:absolute sm:bottom-8 sm:left-12 sm:right-12 border-t border-white/20 pt-4">
          <div className="flex justify-between text-sm text-white/80">
            <span>ATS Score</span>
            <span>Skill Gap Analysis</span>
            <span>Role Match Insights</span>
          </div>
        </div>
      </a>

      {/* Cover Letter Generator */}
      <a
        href="/cover-letter-generator"
        className="relative flex-1 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-md p-8 text-white shadow-lg overflow-hidden"
      >
        {/* Background Icon */}
        <PenLine
          className="absolute right-6 bottom-22 w-50 h-50 text-white opacity-10"
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold mb-4">
            AI Cover Letter Generator
          </h2>
          <p className="text-base opacity-90 max-w-md">
            Generate personalized, role-specific cover letters in seconds optimized for recruiters.
          </p>
        </div>

        <div className="mt-10 sm:absolute sm:bottom-8 sm:left-12 sm:right-12 border-t border-white/20 pt-4">
          <div className="flex justify-between text-sm text-white/80">
            <span>Job-Based</span>
            <span>Recruiter Tone</span>
            <span>Instant Export</span>
          </div>
        </div>
      </a>

      {/* IT Jobs Explorer */}
      <div className="flex-1 bg-gradient-to-br from-[#E02F75] to-[#6700A3] rounded-md p-8 text-white shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">
          IT Jobs Explorer
        </h2>
        <p className="text-base opacity-90 mb-8 max-w-md">
          Discover relevant IT opportunities tailored to your profile and experience.
        </p>

        <div className="relative">
          <div className="w-full h-[64px] px-8 pr-32 bg-white rounded-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={companies[index].name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`text-2xl font-light bg-gradient-to-r ${companies[index].color} bg-clip-text text-transparent`}
              >
                {companies[index].name}
              </motion.span>
            </AnimatePresence>
          </div>

          <button
            onClick={() => router.push('/it-jobs')}
            className="absolute right-2 top-2 h-[48px] px-8 rounded-full bg-[#0d2440] text-white flex items-center gap-2"
          >
            Search <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}