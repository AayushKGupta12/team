"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Terminal, 
  Award, 
  Briefcase,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface Feature {
  label: string;
}

interface Goal {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: React.ReactNode;
  bgClass: string;
  hoverBgClass: string;
  tagColor: string;
  stats: string[];
  features: Feature[];
  outcomes: string[];
  journey: string[];
  cta: string;
  path: string;
}

const GOALS: Goal[] = [
  {
    id: "resume",
    title: "Get More Interview Calls",
    tag: "INTELLIGENCE",
    description: "Optimize your standing with iATS—the engine trained on 300k+ Indian IT resumes.",
    icon: <FileText className="w-5 h-5 text-[#E02F75]" />,
    bgClass: "bg-rose-300/90",
    hoverBgClass: "hover:bg-rose-100/40",
    tagColor: "text-[#E02F75]",
    stats: ["32+ Parameters", "300k+ Benchmarks", "8 Scores"],
    features: [
      { label: "iATS Analysis" },
      { label: "Cover Letter" },
      { label: "Resume Insights" },
    ],
    outcomes: [
      "Improve ATS Compatibility",
      "Identify Weak Sections",
      "Increase Shortlisting",
      "40 seconds edits"
    ],
    journey: ["Upload", "iATS Audit", "Fix Gaps", "Apply"],
    cta: "Analyze My Resume",
    path: "/ai-resume-analyser",
  },
  {
    id: "internship",
    title: "Get My First Internship",
    tag: "EXPERIENCE",
    description: "Build recruiter-trusted skills with mentor-vetted projects and verified certifications.",
    icon: <Award className="w-5 h-5 text-indigo-600" />,
    bgClass: "bg-indigo-300/90",
    hoverBgClass: "hover:bg-indigo-100/40",
    tagColor: "text-indigo-600",
    stats: ["Mentor Verified", "QR Secured", "Live Projects"],
    features: [
      { label: "Verified Internship" },
      { label: "Resume Review" },
      { label: "Certificate" },
    ],
    outcomes: [
      "Build Experience",
      "Strengthen Resume",
      "Earn QR Certificate",
      "D-30, D-45, D-60"
    ],
    journey: ["Project", "Tasks", "Review", "Certify"],
    cta: "Start Journey",
    path: "/internship",
  },
  {
    id: "dsa",
    title: "Crack Coding Interviews",
    tag: "PREPARATION",
    description: "Master company-specific patterns with PYQs curated by FAANG engineers.",
    icon: <Terminal className="w-5 h-5 text-emerald-600" />,
    bgClass: "bg-yellow-300/90",
    hoverBgClass: "hover:bg-emerald-100/40",
    tagColor: "text-emerald-600",
    stats: ["800+ PYQs", "70+ Companies", "Dashboard"],
    features: [
      { label: "Company DSA" },
      { label: "Pattern PYQs" },
      { label: "Progress Tracker" },
    ],
    outcomes: [
      "Solve Real Patterns",
      "Improve OA Scores",
      "Track Readiness",
      "D-1 prepare"
    ],
    journey: ["Practice", "Track", "Mock Prep", "Crack OA"],
    cta: "Start DSA Practice",
    path: "/DSA",
  },
];

export default function GoalExplorer() {
  const router = useRouter();

  return (
    <section className="w-full py-20 px-4 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col mb-8 max-w-xl">
          <div className="border-yellow-400 bg-yellow-50 self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-2 text-xs font-semibold tracking-wide mb-8 shadow-3xs">
            <span >8000+ Engineering Students Enrolled</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-3">
            Choose Your Goal
          </h2>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOALS.map((goal) => (
            <div
              key={goal.id}
              className="group relative h-[470px] w-full bg-white rounded-2xl border border-neutral-400 shadow-xs overflow-hidden transition-all duration-500"
            >
              
              {/* ── TOP LAYER: INITIAL VIEW ── */}
              <div className={`w-full h-full p-6 flex flex-col justify-between transition-all duration-500 ${goal.bgClass}`}>
                <div>
  {/* Card Integrated Meta Header */}
  <div className="flex items-center justify-between gap-3 mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-xl shadow-xs border border-neutral-200/60 transition-transform duration-300 group-hover:scale-105 shrink-0">
        {goal.icon}
      </div>
      <span className={`font-bold text-[10px] tracking-widest ${goal.tagColor} uppercase bg-white/70 px-2 py-1 rounded-md border border-neutral-100 shadow-3xs`}>
        {goal.tag}
      </span>
    </div>
  </div>

  {/* Typography Suite */}
  <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug mb-2 group-hover:text-neutral-950 transition-colors">
    {goal.title}
  </h3>
  <p className="text-[13px] text-neutral-800 leading-relaxed font-medium mb-6">
    {goal.description}
  </p>

  {/* Micro-Metrics Performance Metrics */}
  <div className="flex flex-wrap gap-2 pt-1">
    {goal.stats.map((stat, sIdx) => (
      <div 
        key={sIdx} 
        className="inline-flex items-center text-[10px] font-bold bg-white/90 border border-neutral-200/50 px-2.5 py-1 rounded-lg text-neutral-700 shadow-xs backdrop-blur-xs transition-colors group-hover:border-neutral-200"
      >
        <span className="w-1 h-1 rounded-full bg-neutral-400 mr-1.5 shrink-0" />
        {stat}
      </div>
    ))}
  </div>
</div>

                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 group-hover:opacity-0 transition-opacity duration-300">
                  <span>Explore Outcomes</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* ── BOTTOM LAYER: HOVER DRAWER (With Outcomes & Visual Journey Map) ── */}
              <div className="rounded-t-3xl absolute inset-x-0 -bottom-[335px] h-[385px] w-full bg-white border-t border-neutral-300 p-6 flex flex-col justify-between transition-all duration-500 group-hover:bottom-0">
                
                <div className="flex flex-col gap-5 pt-1">
                  {/* Visual Pathway Map */}
                  <div>
                    <span className="text-[12px] font-bold tracking-wider uppercase block mb-2">
                      Roadmap Journey
                    </span>
                    <div className="flex flex-wrap items-center gap-y-1 text-[11px] font-semibold text-neutral-700">
                      {goal.journey.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="bg-neutral-50 border border-neutral-400 px-3 py-1 rounded text-neutral-800">
                            {step}
                          </span>
                          {sIdx < goal.journey.length - 1 && (
                            <ArrowRight className="w-3 h-3 mx-1 text-neutral-600" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes Checklist Split */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[12px] font-bold tracking-wider uppercase">
                      Expected Outcomes
                    </span>
                    <div className="space-y-2">
                      {goal.outcomes.map((outcome, oIdx) => (
                        <div key={oIdx} className="flex gap-2 items-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <p className="text-xs font-medium text-neutral-800 truncate">
                            {outcome}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Navigation Trigger */}
                <button 
                  onClick={() => router.push(goal.path)}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span>{goal.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}