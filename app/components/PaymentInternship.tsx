"use client";

// Payment ko Verification se change karrha hun. jab account ban jaega tho wapas se verrification ko payment kardena

import { useState, useEffect } from "react";

interface Props {
  internId?: string;
  onSuccess?: () => void;
}

type PayState = "idle" | "confirming" | "loading" | "success" | "error";

export default function PaymentInternship({ internId: propId, onSuccess }: Props) {
  const [state, setState]   = useState<PayState>("idle");
  const [apiErr, setApiErr] = useState("");
  const [copied, setCopied] = useState(false);

  // Resolve internId with 3-level fallback so it's NEVER undefined:
  // 1. Use prop if valid
  // 2. Read intern_id from localStorage
  // 3. Empty string → show warning, disable button
  const [internId, setInternId] = useState<string>("");

  useEffect(() => {
    if (propId && propId !== "undefined" && propId.trim() !== "") {
      setInternId(propId);
      return;
    }
    try {
      const raw = localStorage.getItem("vf_session");
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.intern_id && saved.intern_id !== "undefined") {
          setInternId(saved.intern_id);
          return;
        }
      }
    } catch {}
    setInternId("");
  }, [propId]);

  const certUrl = `https://vfound.in/certificate/${internId}`;

  const handleClick = async () => {
    // Hard guard — never call the API with a missing/undefined intern_id
    if (!internId || internId === "undefined" || internId.trim() === "") {
      setApiErr("Intern ID is missing. Go back to the Status step and refresh.");
      setState("error");
      return;
    }

    if (state === "idle")       { setState("confirming"); return; }
    if (state !== "confirming") return;

    setState("loading"); setApiErr("");

    try {
      const res  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/internship/payment-success/${internId}`,
        { method: "POST" }
      );
      const data = await res.json();

      if (res.ok) {
        setState("success");
        setTimeout(() => onSuccess?.(), 1600);
      } else {
        setState("error");
        setApiErr(data.error || "Verification failed. Please try again.");
      }
    } catch {
      setState("error");
      setApiErr("Network error. Please check your connection.");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(certUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  /* ── Success ── */
  if (state === "success") {
    return (
      <div className="w-full p-8 space-y-5">
        <div className="flex flex-col items-center text-center gap-3 pb-2">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">Verification Successful!</p>
            <p className="text-sm text-gray-400 mt-1">Your certificate has been generated.</p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Receipt</p>
          </div>
          <div className="divide-y divide-gray-100">
            <ReceiptRow label="Intern ID" value={internId || "—"} mono />
            <ReceiptRow label="Date"      value={today} />
            <ReceiptRow label="Status"    value="Paid ✓" green />
          </div>
        </div>

        <div className="border border-indigo-100 bg-indigo-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Your Certificate</p>
              <p className="text-sm font-semibold text-indigo-800">Internship Completion Certificate</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-indigo-100 rounded-lg px-3 py-2">
            <span className="text-xs font-mono text-gray-500 truncate flex-1">{certUrl}</span>
            <button onClick={copy}
              className="shrink-0 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <a href={certUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600
              hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            View Certificate
          </a>
        </div>
      </div>
    );
  }

  /* ── Verification form ── */
  return (
    <div className="w-full p-8 space-y-5">

      {/* Intern ID badge — or warning if missing */}
      {internId ? (
        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-mono font-bold text-indigo-700">{internId}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <span className="text-red-500 mt-0.5">⚠</span>
          <div>
            <p className="text-sm font-semibold text-red-700">Intern ID not loaded</p>
            <p className="text-xs text-red-500 mt-1">
              Go back to the <strong>Status</strong> step, check your application status, then return here.
            </p>
          </div>
        </div>
      )}

      {/* Order summary */}
      <div className="bg-gray-50 border border-gray-400 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-400">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Order Summary</p>
        </div>
        <div className="divide-y divide-gray-100">
          <ReceiptRow label="Item"         value="Internship Certificate" />
          <ReceiptRow label="Verification Mode" value="Simulated Gateway" />
          <ReceiptRow label="Amount"       value="Test Verification" />
        </div>
      </div>

      {/* Simulation warning */}
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
        <span className="text-amber-500 text-base mt-0.5">⚠</span>
        <p className="text-xs text-amber-700 leading-relaxed">
          This is a <span className="font-semibold">simulated payment</span> for development/testing. No real transaction will occur.
        </p>
      </div>

      {/* Confirm nudge */}
      {state === "confirming" && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-center">
          <p className="text-sm font-semibold text-indigo-700">Are you sure?</p>
          <p className="text-xs text-indigo-500 mt-0.5">Click "Confirm Verification" below to proceed.</p>
        </div>
      )}

      {/* Error */}
      {state === "error" && apiErr && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <span className="text-red-400">⚠</span>
          <p className="text-sm text-red-600">{apiErr}</p>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleClick}
        disabled={state === "loading" || !internId}
        className={`w-full py-3 text-sm font-medium rounded-xl transition-all shadow-sm
          disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
          ${state === "confirming"
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}>
        {state === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Processing…
          </>
        ) : state === "confirming" ? (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Confirm Verification
          </>
        ) : !internId ? "Waiting for Intern ID…" : "Simulate Verification →"}
      </button>

      {state === "confirming" && (
        <button onClick={() => setState("idle")}
          className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors text-center py-1">
          ← Cancel
        </button>
      )}
    </div>
  );
}

function ReceiptRow({ label, value, mono, green }: {
  label: string; value: string; mono?: boolean; green?: boolean;
}) {
  return (
    <div className="flex justify-between items-center px-4 py-2.5">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-semibold text-right
        ${green ? "text-emerald-600" : "text-gray-700"}
        ${mono  ? "font-mono"        : ""}`}>
        {value}
      </span>
    </div>
  );
}