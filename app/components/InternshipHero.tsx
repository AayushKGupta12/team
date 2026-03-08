"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InternshipHero() {
  const router = useRouter();
  const [certId, setCertId] = useState("");
  const [focused, setFocused] = useState(false);

  const handleVerify = () => {
    if (certId.trim()) {
      router.push(`/internship/validate`);
    }
  };

  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.7,
        }}
      />

      {/* Yellow glow top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(250,204,21,0.18) 0%, transparent 70%)",
          top: "-80px",
          right: "-80px",
        }}
      />

      {/* Blue glow bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(46,94,153,0.08) 0%, transparent 70%)",
          bottom: "-60px",
          left: "-60px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center gap-5">

        {/* Badge */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
          <span className="text-xs font-semibold text-amber-700 tracking-wider uppercase">
            Now accepting applications · Batch 2025
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
          Internships that
          <span className="relative inline-block mx-3">
            <span className="relative z-10 text-[#2E5E99]">prove</span>
            <span
              className="absolute bottom-1 left-0 w-full h-3 rounded-sm -z-0"
              style={{ background: "rgba(250,204,21,0.45)" }}
            />
          </span>
          <br className="hidden sm:block" />
          your skills
        </h1>

        {/* ── Action Cards ──────────────────────────────────────── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">

          {/* Card 1 — Apply */}
          <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 text-left shadow-sm hover:shadow-lg hover:border-[#2E5E99]/30 transition-all duration-300 overflow-hidden">
            {/* Faint yellow corner accent */}
            <div
              className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-bl-full opacity-40"
              style={{ background: "radial-gradient(circle at top right, rgba(250,204,21,0.35), transparent 70%)" }}
            />

            <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#2E5E99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-base">Apply for Internship</h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Free</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pick a 30, 45, or 60-day track. Get assigned a real industry project, complete it under mentor guidance, and earn a verified certificate.
              </p>
              <div className="mt-3 flex flex-col gap-1">
                {["Industry-level project assigned", "Reviewed by domain mentor", "Certificate on approval"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#2E5E99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => router.push("/internship/userdashboard")}
              className="w-full bg-[#2E5E99] hover:bg-[#24508a] text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              View Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Card 2 — Verify */}
          <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 text-left shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 overflow-hidden">
            {/* Faint green corner accent */}
            <div
              className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, rgba(16,185,129,0.08), transparent 70%)" }}
            />

            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-base">Verify a Certificate</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">Instant</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Recruiter or employer? Paste a VFound certificate ID to instantly confirm its authenticity and see the intern's project evaluation.
              </p>
              <div className="mt-3 flex flex-col gap-1">
                {["Real-time certificate lookup", "View project details & score", "Mentor sign-off confirmed"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div
                className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  focused
                    ? "border-emerald-400 bg-white ring-2 ring-emerald-100"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter Certificate ID  e.g. VF-2025-XXXX"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={!certId.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                Verify Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Yellow CTA Banner ─────────────────────────────────── */}
        <div
          className="w-full mt-2 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, #fefce8 0%, #fef9c3 50%, #fef08a 100%)",
            border: "1.5px solid #fde047",
          }}
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Top performers get hired</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/internship/userdashboard")}
            className="shrink-0 bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            Apply Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}