"use client";

import { useEffect, useState, useRef } from "react";

const isValidProjectLink = (url: string) => {
  const u = url.trim();
  return (
    /^https:\/\/(drive|docs)\.google\.com\//.test(u) ||
    /^https:\/\/github\.com\//.test(u)
  );
};

interface Props {
  internId?: string;
  onSuccess?: () => void;
}

interface TimeLeft {
  d: number; h: number; m: number; s: number; expired: boolean;
}

function calcTimeLeft(dueDateStr: string): TimeLeft {
  const due  = new Date(dueDateStr + "T23:59:59Z");
  const diff = due.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

const LINKEDIN_URL  = "https://www.linkedin.com/company/career_intelligence";
const INSTAGRAM_URL = "https://www.instagram.com/Tauzand.in?utm_source=qr&igsh=bXMyM2p0eTcwZHZs";

export default function SubmitInternship({ internId, onSuccess }: Props) {
  const [link,       setLink]       = useState("");
  const [linkErr,    setLinkErr]    = useState("");
  const [apiErr,     setApiErr]     = useState("");
  const [loading,    setLoading]    = useState(false);
  const [done,       setDone]       = useState(false);
  const [dueDate,    setDueDate]    = useState<string | null>(null);
  const [timeLeft,   setTimeLeft]   = useState<TimeLeft | null>(null);
  const [liFollowed, setLiFollowed] = useState(false);
  const [igFollowed, setIgFollowed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Fetch due date via status endpoint ── */
  useEffect(() => {
    if (!internId) return;
    const load = async () => {
      try {
        const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/status/${internId}`);
        const data = await res.json();
        if (res.ok && data.due_date) setDueDate(data.due_date);
      } catch {}
    };
    load();
  }, [internId]);

  const isExpired = timeLeft?.expired ?? false;

  const validate = (): boolean => {
    if (!link.trim())              { setLinkErr("Project link is required."); return false; }
    if (!isValidProjectLink(link)) { setLinkErr("Enter a valid Google Drive or GitHub link."); return false; }
    setLinkErr(""); return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (!internId) { setApiErr("Intern ID is missing. Please go back and reapply."); return; }
    if (isExpired) { setApiErr("The submission deadline has passed."); return; }

    setLoading(true); setApiErr("");
    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/submit/${internId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ google_drive_link: link.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        setTimeout(() => onSuccess?.(), 25000);
      } else {
        setApiErr(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setApiErr("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success state ── */
  if (done) {
    return (
      <div className="w-full p-8">
        <div className="flex flex-col items-center text-center py-6 gap-4">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">Project Submitted!</p>
            <p className="text-sm text-gray-400 mt-1">Moving you to the next step…</p>
          </div>
          <div className="w-full bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-left">
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-1">Submitted Link</p>
            <a href={link} target="_blank" rel="noopener noreferrer"
              className="text-xs text-emerald-700 hover:underline break-all font-mono">{link}</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-8 space-y-5">

      {/* ── Split row: Intern ID (left) + Deadline (right) ── */}
      {internId && (
        <div className="flex items-stretch rounded-xl border border-gray-200 overflow-hidden">

          {/* Left — Intern ID */}
          <div className="flex items-center gap-3 px-4 py-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-indigo-400 uppercase tracking-widest">Intern ID</p>
              <p className="font-semibold text-indigo-500">{internId}</p>
            </div>
          </div>

          {/* Right — Deadline */}
          <div className="flex items-center gap-3 px-4 py-3 bg-red-50 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-red-400 uppercase tracking-widest">Deadline</p>
              {dueDate ? (
                <p className={`font-semibold ${isExpired ? "text-red-600" : "text-red-500"}`}>
                  {isExpired
                    ? "Expired"
                    : new Date(dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              ) : (
                <p className="text-sm text-red-300">-</p>
              )}
            </div>

            {isExpired && (
              <span className="ml-auto text-xs font-semibold text-red-500 bg-red-100 px-2 py-0.5 rounded-full shrink-0">
                Closed
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Drive link input ── */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Google Drive Link
        </label>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 transition-all
          ${linkErr
            ? "border-red-300 ring-2 ring-red-100"
            : "border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100"}`}>

          {/* Platform icons */}
          <div className="flex items-center gap-1 shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 87.3 78" fill="none">
              <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5L6.6 66.85z" fill="#0066DA"/>
              <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.5C.4 49.9 0 51.45 0 53h27.5l16.15-28z" fill="#00AC47"/>
              <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 11.2L73.55 76.8z" fill="#EA4335"/>
              <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2L43.65 25z" fill="#00832D"/>
              <path d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2L59.8 53z" fill="#2684FC"/>
              <path d="M73.4 26.5L60.7 4.5C59.9 3.1 58.75 2 57.4 1.2L43.65 25l16.15 28H87.3c0-1.55-.4-3.1-1.2-4.5L73.4 26.5z" fill="#FFBA00"/>
            </svg> <span className="text-gray-900">/</span>
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.65.5.75 5.4.75 11.75c0 5.1 3.3 9.43 7.9 10.96.58.1.79-.25.79-.55v-2.02c-3.21.7-3.89-1.37-3.89-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.85 1.19 3.11 0 4.44-2.71 5.41-5.29 5.7.41.36.77 1.07.77 2.16v3.2c0 .3.21.66.8.55 4.59-1.53 7.89-5.86 7.89-10.96C23.25 5.4 18.35.5 12 .5z"/>
            </svg>
          </div>

          <input
            type="url" value={link}
            onChange={e => { setLink(e.target.value); setLinkErr(""); }}
            onBlur={() => link && !isValidProjectLink(link) && setLinkErr("Enter a valid project link (Google Drive, GitHub, or PDF).")}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Google Drive / GitHub Repo"
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none min-w-0"
          />
          {link && (
            <button onClick={() => { setLink(""); setLinkErr(""); }}
              className="shrink-0 text-gray-300 hover:text-gray-500 transition-colors text-lg leading-none">
              ×
            </button>
          )}
        </div>
        {linkErr && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">⚠ {linkErr}</p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          Make sure sharing is set to{" "}
          <span className="font-medium text-gray-600">"Anyone with the link / Public repository"</span>{" "}
          before submitting.
        </p>
      </div>

      {/* ── Social follow checkboxes — sleek, inline ── */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Follow us (required)</p>

        {[
          {
            label: "Follow on LinkedIn",
            url: LINKEDIN_URL,
            checked: liFollowed,
            set: setLiFollowed,
            icon: (
              <svg className="w-3.5 h-3.5 shrink-0" fill="#0077b5" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            ),
          },
          {
            label: "Follow on Instagram",
            url: INSTAGRAM_URL,
            checked: igFollowed,
            set: setIgFollowed,
            icon: (
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433"/>
                    <stop offset="100%" stopColor="#bc1888"/>
                  </linearGradient>
                </defs>
                <path fill="url(#igGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            ),
          },
        ].map((s) => (
          <label key={s.label} className="flex items-center gap-2.5 cursor-pointer group select-none">
            <input type="checkbox" checked={s.checked} onChange={e => s.set(e.target.checked)} className="sr-only"/>
            {/* Custom checkbox */}
            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all
              ${s.checked
                ? "bg-indigo-600 border-indigo-600"
                : "bg-white border-gray-300 group-hover:border-indigo-400"}`}>
              {s.checked && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              )}
            </div>
            {s.icon}
            <span className="text-sm text-gray-600">{s.label}</span>
            <a
              href={s.url} target="_blank" rel="noopener noreferrer"
              className="mr-auto text-indigo-400 hover:text-indigo-600 transition-colors"
              onClick={e => e.stopPropagation()}
            >
              Visit ↗
            </a>
          </label>
        ))}
      </div>

      {/* ── Instructions Dropdown ── */}
<details className="bg-gray-50 border border-gray-200 rounded-xl p-4">
  <summary className="cursor-pointer text-xs font-semibold text-blue-700 uppercase tracking-widest">
    Guidelines
  </summary>

  <div className="mt-2 space-y-2 text-xs text-gray-800">
    <p>
      Our mentor will carefully go through your project, so make sure it is well‑structured and easy to evaluate.
    </p>
    <ol className="space-y-1 list-decimal list-inside">
      <li>Upload your project to <strong>GitHub</strong> or <strong>Google Drive</strong>.</li>
      <li>If using GitHub:
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>The repository <strong>must be public</strong>.</li>
          <li>Include a <strong>deployment/demo link</strong> inside the README.</li>
          <li>Your README should contain clear details about your project (features, setup, usage).</li>
        </ul>
      </li>
      <li>If using Google Drive:
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Ensure access is set to <strong>"Anyone with the link"</strong>.</li>
          <li>Include a <strong>README PDF</strong> explaining your project so the content can be correctly evaluated.</li>
        </ul>
      </li>
      <li>You may also upload a PDF separately explaining the project.</li>
      <li>A <strong>screenshot of the working code</strong> is mandatory.</li>
      <li>Make sure your project files are organized and named properly.</li>
      <li>Provide any additional notes (dependencies, environment setup, special instructions) inside the README or PDF.</li>
    </ol>
    <p className="text-red-400 text-md font-semibold">
      ⚠️ Remember: A well‑structured submission makes evaluation smoother and increases your chances of positive feedback. <br/> It may take up to 3 business days for the mentor to review your project, so please be patient after submission. Good luck!
    </p>
  </div>
</details>

      {/* ── API error ── */}
      {apiErr && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <span className="text-red-400 mt-0.5">⚠</span>
          <p className="text-sm text-red-600">{apiErr}</p>
        </div>
      )}

      {/* ── Submit button ── */}
      <button
        onClick={handleSubmit}
        disabled={loading || !link.trim() || isExpired}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
          rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Submitting…
          </>
        ) : isExpired ? "Deadline Passed" : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Submit Project
          </>
        )}
      </button>

    </div>
  );
}