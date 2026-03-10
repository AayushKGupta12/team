"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ─── Types ──────────────────────────────────────────── */
interface CertData {
  valid:               boolean;
  intern_id:           string;
  name:                string;
  university:          string;
  domain:              string;
  project_title:       string;
  project_description: string;
  completed_at?:       string;
}

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

/* ─── Verified seal ──────────────────────────────────── */
function VerifiedSeal() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full bg-green-200 rounded-full">
      <defs>
        <linearGradient id="sealGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#15803d"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" stroke="url(#sealGrad)" strokeWidth="2.5"
        fill="none" strokeDasharray="6 3"/>
      <path d="M60 8 L67 30 L90 22 L82 45 L105 52 L83 65 L95 88 L71 82 L60 103 L49 82 L25 88 L37 65 L15 52 L38 45 L30 22 L53 30 Z"
        fill="url(#sealGrad)" opacity="0.12"/>
      <circle cx="60" cy="60" r="36" fill="url(#sealGrad)"/>
      <path d="M44 60 L55 71 L76 49" stroke="white" strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Info block ─────────────────────────────────────── */
function InfoBlock({
  label, value, icon, mono = false,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center
        shrink-0 text-gray-400 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-0.5">
          {label}
        </p>
        <p className={`text-sm font-semibold text-gray-900 break-words
          ${mono ? "font-mono tracking-widest" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Social data ────────────────────────────────────── */
 const SOCIALS = [
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/company/career_intelligence",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href:  "https://www.instagram.com/vfound.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href:  "https://www.youtube.com/@vfond-d3r",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href:  "https://x.com/AayushKGupta",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function VerifyCertificate() {
  const [query,   setQuery]   = useState("");
  const [data,    setData]    = useState<CertData | null>(null);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const id = query.trim().toUpperCase();
    if (!id) { setError("Please enter an Intern ID."); return; }
    setLoading(true); setError(""); setData(null);
    try {
      const res  = await fetch(`${API}/api/certificate/verify/${id}`);
      const json = await res.json();
      if (!res.ok || !json.valid) setError(json.error || "No certificate found for this ID.");
      else setData(json);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">

      {/* ════════════════════════════════════════════════
          HERO — search section
      ════════════════════════════════════════════════ */}
      <div className="relative w-full h-[360px] bg-[url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba')] bg-cover bg-center">

  {/* gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

  {/* content */}
  <div className="absolute bottom-0 w-full pb-14 px-6">
    <div className="max-w-2xl mx-auto text-center text-white">

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-[32px] font-bold mb-3">
          Verify your Certificate
        </h1>

        <p className="text-gray-200 text-sm mb-10 max-w-md mx-auto">
          Enter the Intern ID printed on the certificate to confirm its authenticity instantly.
        </p>
      </motion.div>


      {/* search section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
      >

        {/* glass search box */}
        <div className={`flex-1 flex items-center gap-3 px-4 h-12
          bg-white/10 backdrop-blur-lg border rounded-xl shadow-lg
          transition-all duration-300
          ${error
            ? "border-red-400"
            : "border-white/20 focus-within:border-blue-400 focus-within:bg-white/20"
          }`}>

          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/>
          </svg>

          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value.toUpperCase()); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleVerify()}
            placeholder="e.g. VF2026DS15304"
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-300
            focus:outline-none font-mono tracking-widest"
          />

          {query && (
            <button
              onClick={() => { setQuery(""); setError(""); setData(null); }}
              className="text-gray-300 hover:text-white text-lg transition">
              ×
            </button>
          )}
        </div>


        {/* verify button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleVerify}
          disabled={loading}
          className="h-12 px-6 bg-blue-600 hover:bg-blue-700
          text-white text-sm font-semibold rounded-xl
          shadow-lg shadow-blue-900/30
          transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"/>
              </svg>
              Verifying
            </>
          ) : "Verify"}
        </motion.button>

      </motion.div>


      {/* error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-sm text-red-300 flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {error}
        </motion.p>
      )}

    </div>
  </div>
</div>

      {/* ════════════════════════════════════════════════
          CERTIFICATE RESULT
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-12"
          >

            {/* Validity banner */}
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200
              rounded-2xl px-5 py-4 mb-8">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-800">Certificate is valid</p>
                <p className="text-xs text-emerald-600 mt-0.5">
                  This certificate was issued by VFound and is authentic.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100
                border border-emerald-200 rounded-lg px-3 py-1.5 shrink-0 hidden sm:inline">
                {data.intern_id}
              </span>
            </div>

            {/* ── 2-column layout on large screens ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

              {/* ════════════════════════════
                  LEFT — Details
              ════════════════════════════ */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Details header */}
                <div className="px-8 pt-8 pb-5 border-b border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-1">
                    Certificate Details
                  </p>
                  <p className="text-lg font-bold text-gray-900">{data.name}</p>
                  {formatDate(data.completed_at) && (
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Issued on {formatDate(data.completed_at)}
                    </p>
                  )}
                </div>

                {/* Fields */}
                <div className="px-8 py-7 flex flex-col gap-5">
                  <InfoBlock
                    label="Recipient Name"
                    value={data.name}
                    icon={
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    }
                  />
                  <InfoBlock
                    label="University / Institution"
                    value={data.university}
                    icon={
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    }
                  />
                  <InfoBlock
                    label="Domain"
                    value={data.domain}
                    icon={
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    }
                  />
                  <InfoBlock
                    label="Certificate ID"
                    value={data.intern_id}
                    mono
                    icon={
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                      </svg>
                    }
                  />
                </div>

                {/* Project */}
                {(data.project_title || data.project_description) && (
                  <div className="px-8 pb-8">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">
                        Project Completed
                      </p>
                      <div className="flex gap-3 items-start">
                        <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100
                          flex items-center justify-center shrink-0">
                          <svg width="15" height="15" fill="none" viewBox="0 0 24 24"
                            stroke="#7c3aed" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                          </svg>
                        </div>
                        <div>
                          {data.project_title && (
                            <p className="text-sm font-bold text-gray-900 mb-1">
                              {data.project_title}
                            </p>
                          )}
                          {data.project_description && (
                            <p className="text-sm text-gray-500 leading-relaxed">
                              {data.project_description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card footer */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100
                  flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">VFound Internship Programme</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    Verified · vfound.in/verify
                  </div>
                </div>
              </div>

              {/* ════════════════════════════
                  RIGHT — Visual certificate
              ════════════════════════════ */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Gradient header */}
                <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-violet-900
                  px-8 pt-10 pb-12 overflow-hidden">
                  {/* Concentric rings */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(6)].map((_, i) => (
                      <div key={i}
                        className="absolute rounded-full border border-white"
                        style={{
                          width:     `${120 + i * 80}px`,
                          height:    `${120 + i * 80}px`,
                          top: "50%", left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                    <div className="w-24 h-24 shrink-0"><VerifiedSeal/></div>
                    <div className="text-center sm:text-left">
                      <p className="text-blue-200 text-xs font-semibold uppercase
                        tracking-[0.15em] mb-2">
                        Certificate of Validation
                      </p>
                      <p className="text-white text-3xl font-bold leading-tight mb-1">
                        {data.name}
                      </p>
                      <p className="text-blue-200 text-sm">
                        has successfully completed the internship programme
                      </p>
                      {formatDate(data.completed_at) && (
                        <p className="text-blue-300 text-xs mt-2">
                          Issued on {formatDate(data.completed_at)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certificate body */}
                <div className="px-8 py-8 flex flex-col gap-5">

                  {/* Decorative divider line */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-yellow-400"/>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300"/>
                      <div className="w-2 h-2 rounded-full bg-blue-500"/>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300"/>
                    </div>
                    <div className="flex-1 h-px bg-yellow-400"/>
                  </div>

                  {/* Certificate-style text */}
                  <div className="text-center py-4">
                    <p className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4">
                      This is to certify that
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{data.name}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      from <span className="font-semibold text-gray-700">{data.university}</span>
                    </p>
                    <p className="text-xs text-gray-700 max-w-xs mx-auto leading-relaxed">
                      has successfully completed the{" "}
                      <span className="font-semibold text-gray-600">
                        {data.domain}
                      </span>{" "}
                      internship programme at VFound
                      {data.project_title && (
                        <> and delivered the project{" "}
                          <span className="font-semibold text-gray-600 italic">
                            "{data.project_title}"
                          </span>
                        </>
                      )}.
                    </p>
                  </div>

                  {/* Decorative divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-yellow-400"/>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300"/>
                      <div className="w-2 h-2 rounded-full bg-blue-500"/>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300"/>
                    </div>
                    <div className="flex-1 h-px bg-yellow-400"/>
                  </div>

                  {/* Certificate ID stamp area */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.12em] mb-1">
                        Certificate ID
                      </p>
                      <p className="text-xs font-mono font-bold text-gray-600 tracking-widest">
                        {data.intern_id}
                      </p>
                    </div>
                    {/* Signature placeholder */}
                    <div className="text-right"> <div className="-mb-8 bungee-regular"> A. K. Gupta </div>
                      <div className="h-8 border-b border-gray-300 mb-1"/>
                      <p className="text-[10px] text-gray-600 uppercase tracking-[0.1em]">
                        Authorised Signatory
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* end 2-column */}

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Empty state ── */}
      {!data && (
        <div className="max-w-4xl mx-auto px-6 py-14">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[
      {
        icon: "🌍",
        title: "Globally Recognized",
        desc: "Our internship certifications are designed to be valid and verifiable across industries, helping candidates demonstrate real skills to recruiters worldwide."
      },
      {
        icon: "📈",
        title: "Industry-Driven Projects",
        desc: "We constantly update our internship projects to match current industry trends and technologies so interns gain relevant, practical experience."
      },
      {
        icon: "💼",
        title: "Real Work Opportunities",
        desc: "Companies collaborate with us to get real tasks completed. The most capable candidates are selected to work on these projects and can earn payments for their contributions."
      },
    ].map((s) => (
      <div
        key={s.title}
        className="bg-white border border-gray-100 rounded-2xl px-5 py-5 text-center shadow-sm"
      >
        <div className="text-2xl mb-3">{s.icon}</div>
        <p className="text-sm font-semibold text-gray-800 mb-1">{s.title}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
      </div>
    ))}
  </div>
</div>
      )}

      {/* ════════════════════════════════════════════════
          SOCIAL CTA
      ════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-12 mt-auto">
        <div className="relative bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#222222]
          rounded-3xl px-8 sm:px-12 py-10 overflow-hidden">

          {/* Yellow glow blobs */}
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-yellow-400 rounded-full
            opacity-[0.15] blur-3xl pointer-events-none"/>
          <div className="absolute -bottom-8 left-1/4 w-48 h-32 bg-yellow-300 rounded-full
            opacity-[0.08] blur-3xl pointer-events-none"/>
          <div className="absolute top-1/2 -translate-y-1/2 -left-8 w-32 h-32 bg-yellow-500
            rounded-full opacity-[0.07] blur-2xl pointer-events-none"/>

          <div className="relative z-10 flex flex-col lg:flex-row items-center
            justify-between gap-8">

            {/* Left text */}
            <div className="text-center lg:text-left">
              <span className="inline-block text-[10px] font-bold text-yellow-400 uppercase
                tracking-[0.2em] mb-3 bg-yellow-400/10 border border-yellow-400/20
                px-3 py-1 rounded-full">
                Stay Connected
              </span>
              <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-2">
                Follow VFound for updates,<br className="hidden sm:block"/>
                opportunities &amp; more
              </h2>
              <p className="text-gray-400 text-sm max-w-sm">
                Join our community across platforms and never miss an internship opportunity.
              </p>
            </div>

            {/* Right — social buttons */}
            <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[260px]">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl
                    bg-white/[0.06] hover:bg-yellow-400
                    border border-white/10 hover:border-yellow-400
                    text-white hover:text-black
                    transition-all duration-200 hover:scale-[1.02]
                    hover:shadow-xl hover:shadow-yellow-400/20"
                >
                  <span className="w-8 h-8 rounded-xl bg-white/10 group-hover:bg-black/10
                    flex items-center justify-center shrink-0 transition-colors">
                    {s.icon}
                  </span>
                  <span className="text-sm font-semibold flex-1">
                    Follow on {s.label}
                  </span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5
                      transition-all duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════ */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6
          flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400">
            <a href="/term-of-use"    className="hover:text-gray-600 transition-colors">Terms of Use</a>
            <a href="/term-of-use"  className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="/refund"   className="hover:text-gray-600 transition-colors">Refund Policy</a>
            <a href="/contact"  className="hover:text-gray-600 transition-colors">Contact Us</a>
            <a href="/faq"      className="hover:text-gray-600 transition-colors">FAQ</a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 shrink-0">
            © {new Date().getFullYear()} VFound. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}