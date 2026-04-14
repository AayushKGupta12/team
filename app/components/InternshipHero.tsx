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
    <section className="w-full min-h-[90vh] bg-white flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2E5E99 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 blur-[100px] rounded-full -z-10" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">

        {/* 🔥 HEADLINE (POSITIONED) */}
        <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 leading-tight tracking-tight text-center mb-6">
          Build real skills.{" "}
          <span className="text-blue-600">Get verified.</span>
          <br />
          Not just another internship certificate.
        </h1>

        {/* 🔥 TRUST STRIP */}
        <div className="flex flex-wrap justify-center gap-4 mb-14 text-xs md:text-sm text-slate-500">
          <span>✔ 100% Verified</span>
          <span>✔ Accepted Across India</span>
          <span>✔ 2-Year Validity</span>
          <span>✔ Mentor Evaluated</span>
        </div>

        {/* GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 🟢 CARD 1 — APPLY */}
          <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-8 transition-all hover:border-slate-300 shadow-sm hover:shadow-md">

            <div className="mb-6 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <span className="px-3 py-1 text-[10px] font-bold text-blue-700 bg-blue-50 rounded-md uppercase tracking-wider">
                Project Based
              </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Build & Prove Your Skills
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Work on real-world projects, get evaluated by mentors, and earn a certificate only after proof of work — not participation.
            </p>

            {/* 🔥 DIFFERENTIATION */}
            <ul className="text-xs text-slate-500 mb-8 space-y-1">
              <li>• Minimum 60% working code required</li>
              <li>• Project proof (video + GitHub mandatory)</li>
              <li>• Certificate only after mentor verification</li>
            </ul>

            <button
              onClick={() => router.push("/internship/userdashboard")}
              className="mt-auto w-full bg-slate-900 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition-all hover:scale-[1.02]"
            >
              Start Verified Internship →
            </button>
          </div>

          {/* 🔵 CARD 2 — VERIFY */}
          <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-8 transition-all hover:border-slate-300 shadow-sm hover:shadow-md">

            <div className="mb-6 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <span className="px-3 py-1 text-[10px] font-bold text-slate-500 bg-slate-100 rounded-md uppercase tracking-wider">
                Verification
              </span>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Verify Any Certificate Instantly
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Every certificate comes with a unique QR and ID. Validate authenticity, project proof, and evaluation details instantly.
            </p>

            <div className="mt-auto space-y-3">
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all ${
                  focused
                    ? "border-blue-400 ring-2 ring-blue-50"
                    : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <input
                  type="text"
                  placeholder="Certificate ID (e.g. VF2026...)"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none"
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={!certId.trim()}
                className="w-full bg-blue-600 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Verify Certificate →
              </button>
            </div>
          </div>
        </div>

        {/* 🔥 SOCIAL PROOF */}
        <p className="mt-12 text-center text-sm text-slate-400">
          Trusted by 70+ experts • 76K+ student interactions in 2026
        </p>
      </div>
    </section>
  );
}