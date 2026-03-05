"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApplyInternship   from "../components/ApplyInternship";
import ProjectSelector   from "../components/ProjectSelector";
import InternshipStatus  from "../components/InternshipStatus";
import SubmitInternship  from "../components/SubmitInternship";
import PaymentInternship from "../components/PaymentInternship";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type StepId = "apply" | "project" | "status" | "submit" | "payment";

interface Session {
  intern_id: string;
  user_id:   string;
  status:    string;
  domain:    string;
}

/* ─────────────────────────────────────────
   Step definitions
───────────────────────────────────────── */
const STEPS: { id: StepId; label: string; sublabel: string; icon: React.ReactNode }[] = [
  {
    id: "apply", label: "Apply", sublabel: "Submit application",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    id: "project", label: "Project", sublabel: "Choose your project",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
  },
  {
    id: "status", label: "Status", sublabel: "Track progress",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
  },
  {
    id: "submit", label: "Submit", sublabel: "Upload project",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
      </svg>
    ),
  },
  {
    id: "payment", label: "Payment", sublabel: "Get certificate",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
  },
];

const STEP_ORDER: StepId[] = ["apply", "project", "status", "submit", "payment"];
const API = process.env.NEXT_PUBLIC_API_URL;

function resolveFromStatus(status: string): { activeStep: StepId; completed: Set<StepId> } {
  switch (status) {
    case "pending_validation":
      return { activeStep: "status",  completed: new Set<StepId>(["apply", "project"]) };
    case "validated":
      return { activeStep: "submit",  completed: new Set<StepId>(["apply", "project", "status"]) };
    case "project_submitted":
      return { activeStep: "submit",  completed: new Set<StepId>(["apply", "project", "status"]) };
    case "approved":
    case "payment_pending":
      return { activeStep: "payment", completed: new Set<StepId>(["apply", "project", "status", "submit"]) };
    case "completed":
      return { activeStep: "payment", completed: new Set<StepId>(["apply", "project", "status", "submit", "payment"]) };
    default:
      return { activeStep: "apply",   completed: new Set<StepId>() };
  }
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════ */
export default function InternshipDashboard() {
  const [activeStep,    setActiveStep]    = useState<StepId>("apply");
  const [completed,     setCompleted]     = useState<Set<StepId>>(new Set());
  const [direction,     setDirection]     = useState(1);
  const [internId,      setInternId]      = useState("");
  const [domain,        setDomain]        = useState("");
  const [session,       setSession]       = useState<Session | null>(null);
  const [restoring,     setRestoring]     = useState(true);
  const [greeting,      setGreeting]      = useState("Good morning");
  const [dueDate,       setDueDate]       = useState<string | null>(null);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 17) setGreeting("Good afternoon");
    else if (h >= 17)       setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const restore = async () => {
      const raw = localStorage.getItem("vf_session");
      if (!raw) { setRestoring(false); return; }

      let saved: { user_id?: string; intern_id?: string; domain?: string } | null = null;
      try { saved = JSON.parse(raw); } catch {}

      const lookupId = saved?.user_id || saved?.intern_id;
      if (!lookupId) { setRestoring(false); return; }

      if (saved?.intern_id) setInternId(saved.intern_id);
      if (saved?.domain)    setDomain(saved.domain);

      try {
        const res  = await fetch(`${API}/api/internship/status/${lookupId}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          localStorage.removeItem("vf_session");
        } else {
          const { activeStep: step, completed: done } = resolveFromStatus(data.status);
          const resolvedInternId = data.intern_id || saved?.intern_id || "";
          const resolvedUserId   = data.user_id   || saved?.user_id   || "";
          const resolvedDomain   = data.domain    || saved?.domain    || "";
          setSession({ user_id: resolvedUserId, intern_id: resolvedInternId, status: data.status, domain: resolvedDomain });
          setInternId(resolvedInternId);
          setDomain(resolvedDomain);
          if (data.due_date) setDueDate(data.due_date);
          setActiveStep(step);
          setCompleted(done);
          localStorage.setItem("vf_session", JSON.stringify({
            user_id:   resolvedUserId,
            intern_id: resolvedInternId,
            domain:    resolvedDomain,
          }));
        }
      } catch {}
      finally { setRestoring(false); }
    };
    restore();
  }, []);

  useEffect(() => {
    const pollId = session?.user_id || session?.intern_id;
    if (!pollId) return;
    if (!["pending_validation", "project_submitted"].includes(session?.status ?? "")) return;

    const interval = setInterval(async () => {
      try {
        const res  = await fetch(`${API}/api/internship/status/${pollId}`);
        const data = await res.json();
        if (!res.ok || data.status === session?.status) return;
        const { activeStep: step, completed: done } = resolveFromStatus(data.status);
        setSession(s => s ? { ...s, status: data.status } : s);
        setCompleted(done);
        setDirection(1);
        setActiveStep(step);
      } catch {}
    }, 15_000);

    return () => clearInterval(interval);
  }, [session?.status, session?.user_id, session?.intern_id]);

  const goToStep = (id: StepId) => {
    const curr = STEP_ORDER.indexOf(activeStep);
    const next = STEP_ORDER.indexOf(id);
    setDirection(next >= curr ? 1 : -1);
    setActiveStep(id);
    setSidebarOpen(false);
  };

  const markDoneAndNext = (current: StepId, next: StepId) => {
    setCompleted(prev => new Set([...prev, current]));
    setDirection(1);
    setActiveStep(next);
  };

  const onApplied = async (intern_id: string) => {
    setInternId(intern_id);
    localStorage.setItem("vf_session", JSON.stringify({ intern_id }));
    try {
      const res  = await fetch(`${API}/api/internship/status/${intern_id}`);
      const data = await res.json();
      if (res.ok && !data.error) {
        const resolvedUserId = data.user_id || "";
        const resolvedDomain = data.domain  || "";
        setSession({ intern_id, user_id: resolvedUserId, status: "pending_validation", domain: resolvedDomain });
        setDomain(resolvedDomain);
        localStorage.setItem("vf_session", JSON.stringify({ user_id: resolvedUserId, intern_id, domain: resolvedDomain }));
      } else {
        setSession({ intern_id, user_id: "", status: "pending_validation", domain: "" });
      }
    } catch {
      setSession({ intern_id, user_id: "", status: "pending_validation", domain: "" });
    }
    markDoneAndNext("apply", "project");
  };

  /* ── Loading ── */
  if (restoring) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-5">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Loading session</p>
          <p className="text-sm text-gray-400">Fetching your latest progress…</p>
        </div>
      </div>
    );
  }

  /* ── Derived values ── */
  const currentIdx  = STEP_ORDER.indexOf(activeStep);
  const progressPct = (completed.size / STEPS.length) * 100;

  const dueDateFormatted = dueDate
    ? new Date(dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;

  const statCards = [
    {
      label: "Current Stage",
      value: STEPS.find(s => s.id === activeStep)?.label ?? "—",
      sub: `Step ${currentIdx + 1} of ${STEPS.length}`,
      bg: "bg-blue-50", textColor: "text-blue-600", borderHex: "#2563eb",
    },
    {
      label: "Progress",
      value: `${Math.round(progressPct)}%`,
      sub: `${completed.size} of ${STEPS.length} done`,
      bg: "bg-violet-50", textColor: "text-violet-600", borderHex: "#7c3aed",
    },
    {
      label: "Intern ID",
      value: internId || "Pending",
      sub: internId ? "Active" : "Complete step 1",
      mono: true,
      bg: "bg-sky-50", textColor: "text-sky-700", borderHex: "#0369a1",
    },
    {
      label: "Deadline",
      value: dueDateFormatted || "—",
      sub: dueDate ? "Project due date" : "Not assigned",
      bg: dueDate ? "bg-amber-50" : "bg-gray-50",
      textColor: dueDate ? "text-amber-700" : "text-gray-400",
      borderHex: dueDate ? "#b45309" : "#e5e7eb",
    },
    {
      label: "Status",
      value: completed.size === STEPS.length ? "Complete" : "In Progress",
      sub: completed.size === STEPS.length ? "Certificate ready" : "Keep going",
      bg: completed.size === STEPS.length ? "bg-green-50" : "bg-amber-50",
      textColor: completed.size === STEPS.length ? "text-green-600" : "text-amber-700",
      borderHex: completed.size === STEPS.length ? "#16a34a" : "#b45309",
    },
  ];

  /* ── Sidebar content (shared between desktop + mobile drawer) ── */
  const SidebarContent = () => (
    <div className="flex flex-col gap-4">

      {/* Steps nav */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em] px-2 pt-1 pb-3">
          Steps
        </p>
        <nav className="flex flex-col gap-0.5">
          {STEPS.map((step, i) => {
            const isDone   = completed.has(step.id);
            const isActive = activeStep === step.id;
            const isLocked = !isDone && i > 0 && !completed.has(STEP_ORDER[i - 1]);

            return (
              <button
                key={step.id}
                onClick={() => !isLocked && goToStep(step.id)}
                disabled={isLocked}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-none text-left
                  transition-colors duration-150
                  ${isActive  ? "bg-blue-600"
                  : isDone    ? "hover:bg-gray-50 cursor-pointer"
                  : isLocked  ? "opacity-35 cursor-not-allowed"
                  :             "hover:bg-gray-50 cursor-pointer"}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                  ${isActive ? "bg-white/20 text-white"
                  : isDone   ? "bg-green-100 text-green-600"
                  :            "bg-gray-100 text-gray-500"}`}>
                  {isDone ? (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  ) : step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-semibold leading-none mb-0.5
                    ${isActive ? "text-white" : isDone ? "text-green-700" : "text-gray-700"}`}>
                    {step.label}
                  </p>
                  <p className={`text-[11px] truncate
                    ${isActive ? "text-white/60" : "text-gray-400"}`}>
                    {step.sublabel}
                  </p>
                </div>
                {isLocked && (
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Progress */}
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-semibold text-gray-700">Overall Progress</p>
          <span className="text-xs font-bold text-blue-600">{Math.round(progressPct)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.max(progressPct, 4)}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-2">{completed.size}/{STEPS.length} steps done</p>
      </div>

      {/* Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-4">
        <p className="text-[13px] font-semibold text-blue-800 mb-1.5">Need help?</p>
        <p className="text-xs text-blue-500 leading-relaxed">
          Email your internship coordinator at{" "}
          <a href="mailto:intern.coordinator@vfound.in" className="font-semibold text-blue-800 underline">
            intern.coordinator@vfound.in
          </a>.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── MOBILE: step drawer backdrop ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed top-0 left-0 h-full w-72 bg-gray-50 z-50 p-5 overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-sm text-gray-900">Steps</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── PAGE ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* ── PAGE HEADING ── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm text-gray-400 mb-1">{greeting}</p>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Internship Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1.5">
              {session
                ? "Welcome back — your progress has been restored."
                : "Complete all 5 steps to receive your verified certificate."}
            </p>
          </div>

          {/* Mobile: hamburger to open steps drawer */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-gray-200
              rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shrink-0 mt-1"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            Steps
          </button>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${s.bg} rounded-2xl px-4 py-4`}
              style={{ border: `1px solid ${s.borderHex}33` }}
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.06em] mb-2">
                {s.label}
              </p>
              <p className={`font-bold mb-0.5 truncate ${s.textColor} ${(s as any).mono ? "font-mono text-xs" : "text-lg"}`}>
                {s.value}
              </p>
              <p className="text-[11px] text-gray-400">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] gap-5 lg:gap-6 items-start">

          {/* ── SIDEBAR — desktop only ── */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-6">
            <SidebarContent />
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="w-full min-w-0">

            {/* Content header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                  {STEPS.find(s => s.id === activeStep)?.icon}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 leading-none mb-0.5">
                    {STEPS.find(s => s.id === activeStep)?.label}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {STEPS.find(s => s.id === activeStep)?.sublabel}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium bg-white border border-gray-200 rounded-lg px-3 py-1.5 shrink-0">
                {currentIdx + 1} / {STEPS.length}
              </span>
            </div>

            {/* Mobile: horizontal step pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4 lg:hidden no-scrollbar">
              {STEPS.map((step, i) => {
                const isDone   = completed.has(step.id);
                const isActive = activeStep === step.id;
                const isLocked = !isDone && i > 0 && !completed.has(STEP_ORDER[i - 1]);
                return (
                  <button
                    key={step.id}
                    onClick={() => !isLocked && goToStep(step.id)}
                    disabled={isLocked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                      whitespace-nowrap shrink-0 border transition-colors
                      ${isActive  ? "bg-blue-600 text-white border-blue-600"
                      : isDone    ? "bg-green-50 text-green-700 border-green-200"
                      : isLocked  ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                      :             "bg-white text-gray-500 border-gray-200"}`}
                  >
                    {isDone && !isActive && (
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    )}
                    {step.label}
                  </button>
                );
              })}
            </div>

            {/* Component card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

              {/* Top progress bar */}
              <div className="h-[3px] bg-gray-100">
                <div
                  className="h-full bg-blue-600 transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(progressPct, 4)}%` }}
                />
              </div>

              {/* Animated component swap */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -20 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                >
                  {activeStep === "apply" && (
                    <ApplyInternship onSuccess={onApplied} />
                  )}
                  {activeStep === "project" && (
                    <ProjectSelector
                      internId={internId}
                      domain={domain}
                      onSuccess={() => markDoneAndNext("project", "status")}
                    />
                  )}
                  {activeStep === "status" && (
                    <InternshipStatus
                      internId={internId}
                      onValidated={() => markDoneAndNext("status", "submit")}
                    />
                  )}
                  {activeStep === "submit" && (
                    <SubmitInternship
                      internId={internId}
                      onSuccess={() => markDoneAndNext("submit", "payment")}
                    />
                  )}
                  {activeStep === "payment" && (
                    internId ? (
                      <PaymentInternship
                        internId={internId}
                        onSuccess={() =>
                          setCompleted(prev => new Set([...prev, "payment" as StepId]))
                        }
                      />
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm text-red-500">
                          ⚠ Intern ID not found. Please go back to Status and refresh.
                        </p>
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom navigation */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => currentIdx > 0 && goToStep(STEP_ORDER[currentIdx - 1])}
                disabled={currentIdx === 0}
                className={`flex items-center gap-1.5 text-sm text-gray-500 bg-transparent border-none
                  p-0 font-[inherit] transition-opacity
                  ${currentIdx === 0 ? "opacity-0 cursor-default" : "cursor-pointer hover:text-gray-700"}`}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Previous
              </button>

              {/* Step dots */}
              <div className="flex gap-1.5 items-center">
                {STEPS.map(s => (
                  <div
                    key={s.id}
                    className={`rounded-full transition-all duration-300 h-2
                      ${activeStep === s.id
                        ? "w-5 bg-blue-600"
                        : completed.has(s.id)
                          ? "w-2 bg-green-300"
                          : "w-2 bg-gray-200"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => currentIdx < STEPS.length - 1 && goToStep(STEP_ORDER[currentIdx + 1])}
                disabled={currentIdx === STEPS.length - 1 || !completed.has(activeStep)}
                className={`flex items-center gap-1.5 text-sm text-gray-500 bg-transparent border-none
                  p-0 font-[inherit] transition-opacity
                  ${(currentIdx === STEPS.length - 1 || !completed.has(activeStep))
                    ? "opacity-30 cursor-not-allowed"
                    : "cursor-pointer hover:text-gray-700"}`}
              >
                Next
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}