"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import ApplyInternship from "../../components/ApplyInternship";
import InternshipStatus from "../../components/InternshipStatus";
import ProjectSelector from "../../components/ProjectSelector";
import SubmitInternship from "../../components/SubmitInternship";
import PaymentInternship from "../../components/PaymentInternship";
import CertificateGot from "../../components/CertificateGot";
import UpdateInternDetails from "../../components/UpdateInternDetails";

// ── Payment Safety Bottom Sheet ──────────────────────────
const PaymentSafetySheet = ({
  onProceed,
  onClose,
  loading,
}: {
  onProceed: () => void;
  onClose: () => void;
  loading: boolean;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => { onClose(); }, 25000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return(
  <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Window */}
        <motion.div
          key="modal"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 350 }}
          className="relative w-full max-w-[440px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Countdown Bar */}
          <div className="absolute top-0 left-0 h-1 bg-gray-100 w-full" />
          <div className="absolute top-0 left-0 h-1 bg-emerald-500 w-full origin-left animate-[progress_25s_linear_forwards]" />

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-50 mb-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-gray-900">Secure Payment</h2>
              <p className="text-xs text-gray-400 mt-1">
                Please follow these instructions carefully
              </p>
            </div>

            {/* Instruction Checklist */}
            <div className="space-y-2 mb-6">
              {[
                { icon: "📶", text: "Stable internet required" },
                { icon: "📸", text: "Save payment screenshots" },
                { icon: "⏳", text: "Wait 30s after paying" },
                { icon: "📋", text: "Note your Transaction ID" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <span className="text-base shrink-0 grayscale">{item.icon}</span>
                  <p className="text-sm font-normal text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={onProceed}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Proceed to Pay ₹269"
                )}
              </button>
              
              <p className="text-center text-[11px] text-gray-400">
                This window will automatically close in 25s
              </p>
            </div>

            {/* Gateway Verification footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 grayscale opacity-50">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Secured by</span>
              <span className="font-semibold text-sm text-gray-800 tracking-tight">razorpay</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Embedded Animation Styles */}
      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </AnimatePresence>
  );
};
// ─────────────────────────────────────────────────────────

type StepId = "apply" | "project" | "status" | "submit" | "payment";

interface InternRecord {
  intern_id: string;
  user_id: string;
  status: string;
  domain: string;
  due_date?: string;
  is_validated: boolean;
  is_project_submitted: boolean;
  is_approved: boolean;
  is_paid: boolean;
  is_completed: boolean;
  is_registered: boolean;
  assigned_projects?: unknown;
}

const STEPS: { id: StepId; label: string; sublabel: string; icon: React.ReactNode }[] = [
  {
    id: "apply",
    label: "Apply",
    sublabel: "Submit application",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "project",
    label: "Project",
    sublabel: "Choose your project",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "status",
    label: "Status",
    sublabel: "Track progress",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "submit",
    label: "Submit Now",
    sublabel: "Upload project",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    id: "payment",
    label: "Payment",
    sublabel: "Get certificate",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

const STEP_ORDER: StepId[] = ["apply", "project", "status", "submit", "payment"];
const API = process.env.NEXT_PUBLIC_API_URL;

function resolveFromBooleans(data: InternRecord): {
  activeStep: StepId;
  completed: Set<StepId>;
} {
  const projectSelected = Array.isArray(data.assigned_projects)
    ? data.assigned_projects.length > 0
    : data.assigned_projects != null;

  if (data.is_completed || data.is_paid) {
    return { activeStep: "payment", completed: new Set<StepId>(STEP_ORDER) };
  }
  if (data.is_approved) {
    return { activeStep: "payment", completed: new Set<StepId>(["apply", "project", "status", "submit"]) };
  }
  if (data.is_project_submitted) {
    return { activeStep: "submit", completed: new Set<StepId>(["apply", "project", "status", "submit"]) };
  }
  if (data.is_validated) {
    return { activeStep: "submit", completed: new Set<StepId>(["apply", "project", "status"]) };
  }
  if (projectSelected) {
    return { activeStep: "status", completed: new Set<StepId>(["apply", "project"]) };
  }
  if (data.intern_id) {
    return { activeStep: "project", completed: new Set<StepId>(["apply"]) };
  }
  return { activeStep: "apply", completed: new Set<StepId>() };
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════ */
export default function InternshipDashboard() {
  const { user, isLoaded } = useUser();

  const [activeStep,  setActiveStep]  = useState<StepId>("apply");
  const [completed,   setCompleted]   = useState<Set<StepId>>(new Set());
  const [direction,   setDirection]   = useState(1);
  const [internId,    setInternId]    = useState("");
  const [domain,      setDomain]      = useState("");
  const [intern,      setIntern]      = useState<InternRecord | null>(null);
  const isFullyDone = intern?.is_completed && intern?.is_paid;
  const [restoring,   setRestoring]   = useState(true);
  const [greeting,    setGreeting]    = useState("Good morning");
  const [dueDate,     setDueDate]     = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDelete,  setShowDelete]  = useState(false);
  const [deleting,    setDeleting]    = useState(false);

  // ── Registration / Payment states ──────────────────────
  const [isRegistered,     setIsRegistered]     = useState<boolean | null>(null);
  const [regLoading,       setRegLoading]       = useState(false);
  const [regError,         setRegError]         = useState("");
  const [showSafetySheet,  setShowSafetySheet]  = useState(false);
  const [pendingPayAction, setPendingPayAction] = useState<(() => void) | null>(null);
  // ───────────────────────────────────────────────────────

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 17) setGreeting("Good afternoon");
    else if (h >= 17)       setGreeting("Good evening");
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const restore = async () => {
      if (!user?.id) { setRestoring(false); return; }

      try {
        const res = await fetch(`${API}/api/internship/by-clerk/${user.id}`);
        if (res.status === 404 || !res.ok) { setRestoring(false); return; }

        const data: InternRecord = await res.json();

        if (data.is_completed) {
          setIntern(null);
          setInternId("");
          setDomain("");
          setDueDate(null);
          setCompleted(new Set());
          setActiveStep("apply");
          setRestoring(false);
          return;
        }

        const { activeStep: step, completed: done } = resolveFromBooleans(data);
        setIntern(data);
        setInternId(data.intern_id || "");
        setDomain(data.domain || "");
        if (data.due_date) setDueDate(data.due_date);
        setActiveStep(step);
        setCompleted(done);

        // ── Seed registration status from the record ──
        setIsRegistered(data.is_registered === true);

      } catch (err) {
        console.error(err);
      } finally {
        setRestoring(false);
      }
    };

    restore();
  }, [isLoaded, user?.id]);

  /* ── Polling ── */
  useEffect(() => {
    const pollId = intern?.intern_id;
    if (!pollId) return;
    const pollableStatuses = ["pending_validation", "project_submitted"];
    if (!pollableStatuses.includes(intern?.status ?? "")) return;

    const interval = setInterval(async () => {
      try {
        const res  = await fetch(`${API}/api/internship/status/${pollId}`);
        const data = await res.json();
        if (!res.ok || data.status === intern?.status) return;

        const updated: InternRecord = { ...intern!, ...data };
        const { activeStep: step, completed: done } = resolveFromBooleans(updated);

        setIntern(updated);
        setCompleted(done);
        setActiveStep(step);
      } catch {}
    }, 15_000);

    return () => clearInterval(interval);
  }, [intern?.status, intern?.intern_id]);

  /* ── Check registration status from interns table ── */
  const checkRegistration = async (): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const res  = await fetch(`${API}/api/registration/status/${user.id}`);
      const data = await res.json();
      const paid = data.is_registered === true;
      setIsRegistered(paid);
      return paid;
    } catch {
      return false;
    }
  };

  /* ── Load Razorpay script dynamically ── */
  const loadRazorpay = (): Promise<boolean> =>
    new Promise(resolve => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const s   = document.createElement("script");
      s.src     = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload  = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  /* ── Full registration + payment flow ── */
  const handleRegisterAndPay = async () => {
    if (!user?.id) { setRegError("Please login first."); return; }
    setRegLoading(true); setRegError("");

    try {
      const orderRes  = await fetch(`${API}/api/registration/create-order`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ clerk_user_id: user.id }),
      });
      const orderData = await orderRes.json();

      if (orderData.already_registered) {
        setIsRegistered(true);
        setRegLoading(false);
        return;
      }
      if (!orderRes.ok || !orderData.order_id) {
        setRegError(orderData.error || "Failed to create order.");
        setRegLoading(false);
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        setRegError("Payment gateway failed to load. Try again.");
        setRegLoading(false);
        return;
      }

      const options = {
        key:         orderData.key_id,
        amount:      orderData.amount,
        currency:    orderData.currency,
        order_id:    orderData.order_id,
        name:        "VFound.in",
        description: "Internship Registration Fee (One-time, Non-refundable)",
        prefill: {
          email:   user.primaryEmailAddress?.emailAddress || "",
          name:    user.fullName || "",
          contact: "",
        },
        theme: { color: "#2563eb" },

        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes  = await fetch(`${API}/api/registration/verify-payment`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              clerk_user_id:       user.id,
              intern_id:           internId,
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            setIsRegistered(true);
            setRegLoading(false);
          } else {
            setIsRegistered(true);
            setRegLoading(false);
            alert("Payment received. Verifying in background…");
          }
        },

        modal: {
          ondismiss: () => {
            setRegError("Payment cancelled. Complete payment to activate your certificate.");
            setRegLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch {
      setRegError("Something went wrong. Try again.");
      setRegLoading(false);
    }
  };

  /* ── Safety sheet helpers ── */
  const openSafetySheetThen = (payAction: () => void) => {
    setPendingPayAction(() => payAction);
    setShowSafetySheet(true);
  };
  const handleSheetProceed = () => {
    setShowSafetySheet(false);
    if (pendingPayAction) pendingPayAction();
  };
  const handleSheetClose = () => {
    setShowSafetySheet(false);
    setPendingPayAction(null);
  };

  /* ── Navigation ── */
  const goToStep = (id: StepId) => {
    if (isFullyDone && id !== "apply") return;

    const currentIndex = STEP_ORDER.indexOf(activeStep);
    const targetIndex  = STEP_ORDER.indexOf(id);

    if (targetIndex > currentIndex) {
      if (!completed.has(activeStep)) return;
    }

    setDirection(targetIndex > currentIndex ? 1 : -1);
    setActiveStep(id);
    setSidebarOpen(false);
  };

  const goToNextStep = () => {
    const currentIdx = STEP_ORDER.indexOf(activeStep);
    if (currentIdx >= STEPS.length - 1 || !completed.has(activeStep)) return;
    setDirection(1);
    setActiveStep(STEP_ORDER[currentIdx + 1]);
  };

  /* ── Mark Step as Done ── */
  const markDone = (current: StepId) => {
    setCompleted(prev => new Set([...prev, current]));
  };

  /* ── Called when ApplyInternship submits a NEW application ── */
  const onApplied = async (intern_id: string) => {
    setInternId(intern_id);
    if (!user?.id) return;

    try {
      const res = await fetch(`${API}/api/internship/by-clerk/${user.id}`);
      if (res.ok) {
        const data: InternRecord = await res.json();
        if (!data.is_completed) {
          const { activeStep: step, completed: done } = resolveFromBooleans(data);
          setIntern(data);
          setDomain(data.domain || "");
          if (data.due_date) setDueDate(data.due_date);
          setActiveStep(step);
          setCompleted(done);
          // Also seed registration status from the new record
          setIsRegistered(data.is_registered === true);
        }
      }
    } catch (err) {
      console.error(err);
    }

    markDone("apply");
  };

  /* ── Delete application ── */
  const handleDelete = async () => {
    if (!user?.id) return;
    setDeleting(true);
    try {
      await fetch(`${API}/api/internship/restart/${internId}`, { method: "DELETE" });
      setIntern(null);
      setInternId("");
      setDomain("");
      setDueDate(null);
      setCompleted(new Set());
      setActiveStep("apply");
      setDirection(1);
      setIsRegistered(null);
      setRegError("");
      setShowDelete(false);
    } catch {}
    finally { setDeleting(false); }
  };

  /* ── Loading ── */
  if (restoring || !isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center w-full max-w-xs">
          <div className="relative w-16 h-16 mx-auto mb-8">
            <div className="absolute inset-0 bg-blue-400 rounded-md animate-ping opacity-20"></div>
            <div className="relative w-16 h-16 rounded-md bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Preparing your Workspace</h3>
            <div className="h-1 w-32 bg-slate-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-loading-bar origin-left"></div>
            </div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest animate-pulse">
              Verifying Proof of Work…
            </p>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px]"></div>
          </div>
          <style jsx>{`
            @keyframes loading-bar {
              0%   { transform: scaleX(0); }
              50%  { transform: scaleX(0.7); }
              100% { transform: scaleX(1); }
            }
            .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
          `}</style>
        </div>
      </div>
    );
  }

  const currentIdx  = STEP_ORDER.indexOf(activeStep);
  const progressPct = (completed.size / STEPS.length) * 100;

  const dueDateFormatted = dueDate
    ? new Date(dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;

  const canGoNext = completed.has(activeStep) && currentIdx < STEPS.length - 1;

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

  // ── Sidebar shared content ────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-gray-200 rounded-md p-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em] px-2 pt-1 pb-3">
          Steps
        </p>
        <nav className="flex flex-col gap-0.5">
          {STEPS.map((step, i) => {
            const isDone      = completed.has(step.id);
            const isActive    = activeStep === step.id;
            const isLocked    = !isDone && !isActive && (i === 0 ? false : !completed.has(STEP_ORDER[i - 1]));
            const isClickable = isFullyDone ? step.id === "apply" : true;

            return (
              <button
                key={step.id}
                onClick={() => isClickable && goToStep(step.id)}
                disabled={!isClickable}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-none text-left
                  transition-colors duration-150
                  ${isActive  ? "bg-blue-600"
                  : isLocked  ? "opacity-30 cursor-not-allowed"
                  :             "hover:bg-gray-50 cursor-pointer"}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                  ${isActive ? "bg-white/20 text-white"
                  : isDone   ? "bg-green-100 text-green-600"
                  :            "bg-gray-100 text-gray-500"}`}>
                  {isDone ? (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-semibold leading-none mb-0.5
                    ${isActive ? "text-white" : isDone ? "text-green-700" : "text-gray-700"}`}>
                    {step.label}
                  </p>
                  <p className={`text-[11px] truncate ${isActive ? "text-white/60" : "text-gray-400"}`}>
                    {isDone ? "Completed" : step.sublabel}
                  </p>
                </div>
                {(isLocked || isDone) && !isActive && (
                  <svg width="1" height="1" fill="none" viewBox="0 0 24 24"
                    stroke={isDone ? "#86efac" : "#d1d5db"} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Progress */}
      <div className="bg-white border border-gray-200 rounded-md px-4 py-4">
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
      <div className="border border-gray-400 rounded-md px-4 py-4">
  <p className="text-[13px] font-semibold text-gray-800 mb-1.5">Need Support ? </p>
  <p className="text-xs text-gray-600 leading-relaxed">
    When contacting support, include the following: 
    <li className="list-disc list-inside text-gray-600 mt-1">
      <span className="font-semibold text-gray-800">Email ID:</span> [Your Email ID]
    </li>
    <li className="list-disc list-inside text-gray-600 mt-1">
      <span className="font-semibold text-gray-800">Intern ID:</span> [Your Intern ID]
    </li>
    <li className="list-disc list-inside text-gray-600 mt-1">
      <span className="font-semibold text-gray-800">Issue Description:</span> A clear and concise explanation of the problem you're facing.
    </li> 

    <br />
    Send these details to <a href="mailto:avishikta.vfound@diaghan.resend.app" className="font-semibold text-blue-800 underline">Us At Here</a>.
  </p>
</div>



      {/* ── Registration section — shown only when there's an active (non-completed) internship ── */}
      {internId && !intern?.is_completed && (
        <>
          {/* Not yet paid → show Pay button */}
          {isRegistered === false && (
            <button
              onClick={() => openSafetySheetThen(handleRegisterAndPay)}
              disabled={regLoading}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md
                border border-emerald-300 bg-emerald-50 text-xs font-semibold text-emerald-700
                hover:bg-emerald-100 transition-colors disabled:opacity-50"
            >
              {regLoading ? (
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )}
              {regLoading ? "Processing…" : "One time Automation Fee"}
            </button>
          )}

          {/* Already paid → show badge */}
          {isRegistered === true && (
            <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md
              border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-600">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Registration Complete
            </div>
          )}

          {/* Registration error */}
          {regError && (
            <div className="flex items-start gap-2 text-[11px] text-rose-500 bg-rose-50
              border border-rose-100 rounded-lg px-3 py-2 leading-relaxed">
              <span className="shrink-0 mt-0.5">⚠</span>
              <span className="flex-1">{regError}</span>
              <button
                onClick={() => setRegError("")}
                className="shrink-0 text-rose-400 hover:text-rose-600 mt-0.5"
              >
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      <div className="border border-rose-200 rounded-md p-3 w-full hover:bg-rose-50">
        <details className="w-full">
          <summary className="text-[12px] font-semibold text-rose-500 cursor-pointer">
            if <span className="font-semibold">Status :</span> <span className="font-semibold underline text-rose-500"> Submission Approved</span> ?
          </summary>
          <p className="text-xs text-gray-600 leading-relaxed mt-2">
            You have <span className="font-semibold">3 days</span> from <span className="font-semibold">Status :</span> <span className="font-semibold underline text-blue-600"> Submission Approved</span> to complete payment for Automation and Maintenance charges. 
            <span className="font-semibold">Failure to pay within this period</span> may result in automatic deactivation of your application. 
            If charges are already paid, please ignore this message. <a href="/term-of-use" className="underline text-blue-600 text-xs">T&C</a>
          </p>
        </details>
      </div>

      {/* Permanently Deactivate — only for active (non-completed) internships */}
      {internId && !intern?.is_completed && (
        <button
          onClick={() => setShowDelete(true)}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md
            border border-rose-200 text-xs font-semibold text-rose-500
            hover:bg-rose-50 transition-colors"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Permanently Deactivate Application
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Payment Safety Sheet ── */}
      {showSafetySheet && (
        <PaymentSafetySheet
          onProceed={handleSheetProceed}
          onClose={handleSheetClose}
          loading={regLoading}
        />
      )}

      {/* ── Permanently Deactivate confirm popup ── */}
      <AnimatePresence>
        {showDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !deleting && setShowDelete(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full pointer-events-auto">
                <div className="w-12 h-12 rounded-md bg-rose-100 flex items-center justify-center mx-auto mb-5">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#e11d48" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  Permanently Deactivate Application?
                </h3>
                <p className="text-sm text-gray-500 text-left leading-relaxed mb-1">
                  This will permanently deactivate your internship application for{" "}
                  <span className="font-semibold text-gray-800">{domain || "this domain"}</span>.
                </p>
                <p className="text-xs text-rose-500 font-semibold text-center mb-7">
                  ⚠ This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDelete(false)}
                    disabled={deleting}
                    className="flex-1 py-3 rounded-md border border-gray-200 text-sm
                      font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 py-3 rounded-md bg-rose-600 hover:bg-rose-700 text-white
                      text-sm font-semibold transition-colors disabled:opacity-60
                      flex items-center justify-center gap-2"
                  >
                    {deleting && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    )}
                    {deleting ? "Deactivating…" : "Yes, Deactivate"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MOBILE sidebar drawer ── */}
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm text-gray-900">Steps</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── PAGE ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-26 lg:py-10">

        {/* Heading */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm text-gray-700 mb-1">{greeting}</p>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Internship Dashboard</h1>
            <p className="text-sm text-gray-700 mt-1.5">
              {intern
                ? "Welcome back : your progress has been restored."
                : "Get started by applying to an internship and following the steps to earn your certificate."}
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-emerald-100 border border-emerald-400
              rounded-md text-sm font-medium hover:bg-emerald-200 transition-colors shrink-0 mt-1"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Payment's & More
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${s.bg} rounded-md px-4 py-4`}
              style={{ border: `1px solid ${s.borderHex}33` }}
            >
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-[0.06em] mb-2">{s.label}</p>
              <p className={`font-bold mb-0.5 truncate ${s.textColor} ${(s as { mono?: boolean }).mono ? "font-mono text-xs" : "text-lg"}`}>
                {s.value}
              </p>
              <p className="text-[11.5px] text-gray-500">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] gap-5 lg:gap-6 items-start">

          {/* Sidebar desktop */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-6">
            <SidebarContent />
          </div>

          {/* Main content */}
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

            {/* Mobile step pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4 lg:hidden no-scrollbar">
              {STEPS.map((step, i) => {
                const isDone   = completed.has(step.id);
                const isActive = activeStep === step.id;
                const isLocked = !isDone && !isActive && (i === 0 ? false : !completed.has(STEP_ORDER[i - 1]));
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    disabled={!completed.has(step.id) && activeStep !== step.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                      whitespace-nowrap shrink-0 border transition-colors
                      ${isActive  ? "bg-blue-600 text-white border-blue-600"
                      : isDone    ? "bg-green-50 text-green-600 border-green-200 opacity-60 cursor-not-allowed"
                      : isLocked  ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                      :             "bg-white text-gray-500 border-gray-200"}`}
                  >
                    {isDone && (
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {step.label}
                  </button>
                );
              })}
            </div>

            {/* Component card */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
              <div className="h-[3px] bg-gray-100">
                <div
                  className="h-full bg-blue-600 transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(progressPct, 4)}%` }}
                />
              </div>

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
                      onSuccess={() => markDone("project")}
                    />
                  )}
                  {activeStep === "status" && (
                    <InternshipStatus
                      internId={internId}
                      onValidated={() => markDone("status")}
                    />
                  )}
                  {activeStep === "submit" && (
                    <SubmitInternship
                      internId={internId}
                      onSuccess={() => markDone("submit")}
                    />
                  )}
                  {activeStep === "payment" && (
                    internId ? (
                      <PaymentInternship
                        internId={internId}
                        onSuccess={() => setCompleted(prev => new Set([...prev, "payment" as StepId]))}
                      />
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm text-red-500">⚠ Intern ID not found.</p>
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom nav */}
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-1.5 items-center">
                {STEPS.map(s => (
                  <div
                    key={s.id}
                    className={`rounded-full transition-all duration-300 h-2
                      ${activeStep === s.id
                        ? "w-5 bg-blue-600"
                        : completed.has(s.id) ? "w-2 bg-green-300" : "w-2 bg-gray-200"}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNextStep}
                disabled={!canGoNext}
                className={`flex items-center gap-1.5 text-sm bg-transparent border-none
                  p-0 font-[inherit] transition-all
                  ${canGoNext
                    ? "text-blue-600 cursor-pointer hover:text-blue-800 font-semibold"
                    : "text-gray-300 cursor-not-allowed"}`}
              >
                Next
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        <div className="mt-20">
          <UpdateInternDetails />
          <CertificateGot />
        </div>

      </div>
    </div>
  );
}