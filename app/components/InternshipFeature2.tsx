"use client";
import { useState } from "react";

const tabs = [
  {
    id: "apply",
    label: "Apply Now",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    description: "Apply for a verified internship. Choose your domain and track (30, 45, or 60 days) and get matched with a real industry project.",
    accentColor: "#2E5E99",
    lightAccent: "#EEF4FF",
    imagePlaceholder: "./screenshotApply.png",
  },
  {
    id: "status",
    label: "Application Status",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description: "Track your application status in real-time. Once approved, get assigned a real project and connect with your dedicated mentor.",
    accentColor: "#0EA47A",
    lightAccent: "#EDFAF5",
    imagePlaceholder: "./screenshotStatus.png",
  },
  {
    id: "submission",
    label: "Project Submission",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    description: "Submit your completed project for mentor review. Your work must meet industry standards to receive final approval.",
    accentColor: "#D97706",
    lightAccent: "#FFFBEB",
    imagePlaceholder: "./screenshotSubmit.png",
  },
  {
    id: "certificate",
    label: "Certificate Issued",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 0118 0z" />
      </svg>
    ),
    description: "After successful mentor review and all necessary formalities, your verified internship certificate will be issued with a unique verification ID.",
    accentColor: "#2563EB",
    lightAccent: "#DBEAFE",
    imagePlaceholder: "./screenshotComplete.png",
  },
];

export default function InternshipShowcase() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-6xl font-bold tracking-tighter leading-[0.9]">
            Build. Review.
            <span className="italic font-light text-slate-400"> Verify.</span>
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                active === i
                  ? "shadow-sm border-transparent"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
              style={active === i ? { background: t.lightAccent, color: t.accentColor, borderColor: `${t.accentColor}40` } : {}}
            >
              <span style={{ color: active === i ? t.accentColor : "#9CA3AF" }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Image area */}
        <div
          key={active}
          className="rounded-3xl border border-gray-200 overflow-hidden shadow-xl shadow-gray-100"
          style={{ transition: "all 0.7s ease" }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-300" />
              <div className="w-3 h-3 rounded-full bg-amber-300" />
              <div className="w-3 h-3 rounded-full bg-green-300" />
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-400 w-44 justify-center">
              Tauzand.in/dashboard
            </div>
            <div className="w-20" />
          </div>

          <div className="w-full bg-gray-50 overflow-hidden" style={{ minHeight: 420 }}>
            <img
              src={tab.imagePlaceholder}
              alt={tab.label}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Stats + Original CTA */}
        <div className="mt-16">
          {/* Stats grid and original CTA remain the same */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { val: "70+", label: "Domain Mentors", sub: "Across Dev, Design & Data", cls: "fade-up-1" },
              { val: "3", label: "Internship Tracks", sub: "30 · 45 · 60 day programs", cls: "fade-up-2" },
              { val: "100%", label: "Verified Certificates", sub: "Mentor-reviewed, not just issued", cls: "fade-up-4" },
            ].map((s) => (
              <div key={s.label} className={`${s.cls} group rounded-2xl bg-[#0d2440] border border-gray-100 px-6 py-7 flex flex-col gap-1 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300`}>
                <div className="text-5xl font-bold text-[#e7f0fa] tracking-tight">{s.val}</div>
                <div className="text-sm font-semibold text-[#e7f0fa] mt-1">{s.label}</div>
                <div className="text-xs text-[#e7f0fa] leading-relaxed">{s.sub}</div>
                <div className="mt-3 w-8 h-0.5 bg-gray-200 group-hover:w-full group-hover:bg-[#2E5E99] transition-all duration-300 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border border-slate-300 rounded-[2.5rem] p-10 bg-white relative overflow-hidden">
  {/* Ambient Glows */}
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 blur-[120px] rounded-full opacity-60"></div>
  <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-slate-50 blur-[100px] rounded-full opacity-60"></div>

  <div className="relative z-10 max-w-3xl">
    
    {/* Badge */}
    <div className="mb-8 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 tracking-[0.2em] uppercase inline-block">
      VERIFIED CERTIFICATION
    </div>

    {/* Heading */}
    <h3 className="text-5xl font-bold text-slate-950 tracking-tighter leading-[1.05] mb-10">
      Build real skills.<br />
      <span className="italic font-light text-yellow-600">Earn a credential that matters.</span>
    </h3>

    {/* CTA Button */}
    <a
      href="https://www.tauzand.in/certificate/VF2026DO00001"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-slate-900 text-white font-bold text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all hover:bg-blue-600 hover:-translate-y-1 shadow-lg"
    >
      View Sample Certificate
      <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>

    {/* Trust Indicators */}
    <div className="flex items-center gap-12 pt-10">
      <div className="flex flex-col">
        <span className="text-slate-950 font-bold text-2xl">70+</span>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">Industry Mentors</span>
      </div>
      
      <div className="w-px h-11 bg-slate-200"></div>
      
      <div className="flex flex-col">
        <span className="text-slate-950 font-bold text-2xl">700+</span>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">Students Engaged</span>
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
}