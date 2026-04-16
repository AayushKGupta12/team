"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";

const InputField = ({
  name, label, type = "text", value, onChange, disabled = false,
}: {
  name: string; label: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => (
  <div className="relative w-full">
    <input
      type={type} name={name} id={name} value={value}
      onChange={onChange} placeholder=" " disabled={disabled}
      className={`peer w-full px-4 pt-6 pb-2 border rounded-xl
        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
        transition-all text-gray-900 text-sm
        ${disabled ? "bg-gray-100 border-gray-200 cursor-not-allowed" : "bg-gray-50 border-gray-200"}`}
    />
    <label htmlFor={name}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400
        pointer-events-none transition-all
        peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:translate-y-0
        peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500">
      {label}
    </label>
  </div>
);

interface Props {
  onSuccess?: (intern_id: string) => void;
}

const FORM_STEPS = [
  { id: 1, title: "Personal Info",  subtitle: "Tell us about yourself" },
  { id: 2, title: "Education",      subtitle: "Your academic background" },
  { id: 3, title: "Preferences",    subtitle: "Duration & performance" },
  { id: 4, title: "Domain",         subtitle: "Choose your area of interest" },
];

const DOMAINS = [
  "Data Science", "Machine Learning", "UI/UX", "DevOps", "Backend - Java", "Backend - Flask","Backend - Django",
  "Data Analyst", "MLOps", "Frontend", "SDE Projects",
];

const DURATIONS = [
  { value: "30_days", label: "30 Days" },
  { value: "45_days", label: "45 Days" },
  { value: "60_days", label: "60 Days" },
];

const CURRENT_YEAR = new Date().getFullYear();
const MIN_GRAD_YEAR = CURRENT_YEAR - 3;
const MAX_GRAD_YEAR = CURRENT_YEAR + 3;
const API = process.env.NEXT_PUBLIC_API_URL;

const isValidIndianPhone = (p: string) => /^[6-9]\d{9}$/.test(p);
const isValidCGPA        = (c: string) => /^([0-9](\.\d{1,2})?|10(\.0{1,2})?)$/.test(c);

type Screen = "checking" | "existing" | "form";

export default function ApplyInternship({ onSuccess }: Props) {
  const { user, isLoaded } = useUser();

  const [screen,       setScreen]       = useState<Screen>("checking");
  const [step,         setStep]         = useState(1);
  const [direction,    setDirection]    = useState(1);
  const [error,        setError]        = useState("");
  const [submitting,   setSubmitting]   = useState(false);

  // Existing record info
  const [existingInternId, setExistingInternId] = useState("");
  const [existingDomain,   setExistingDomain]   = useState("");
  const [isCompleted,      setIsCompleted]      = useState(false); // ← key flag
  const [isLocked,         setIsLocked]         = useState(false);

  // ── Registration state ──
  const [isRegistered,    setIsRegistered]    = useState<boolean | null>(null); // null = not checked yet
  const [regChecking,     setRegChecking]     = useState(false);
  const [regLoading,      setRegLoading]      = useState(false);
  const [regError,        setRegError]        = useState("");
  const [pendingInternId,    setPendingInternId]    = useState("");
  const [showPaymentPrompt,  setShowPaymentPrompt]  = useState(false);

  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    university: "", course: "", graduation_year: "",
    cgpa: "", duration: "", domain: "",
  });

  /* ── Check DB on mount ── */
  useEffect(() => {
    if (!isLoaded) return;
    const check = async () => {
      if (!user?.id) { setScreen("form"); return; }

      if (user.primaryEmailAddress?.emailAddress)
        setForm(prev => ({ ...prev, email: user.primaryEmailAddress!.emailAddress }));

      try {
        const res = await fetch(`${API}/api/internship/by-clerk/${user.id}`);
        if (res.status === 404 || !res.ok) { setScreen("form"); return; }

        const data = await res.json();

        if (data?.intern_id) {
          const completed = data.is_completed === true;

          setExistingInternId(data.intern_id);
          setExistingDomain(data.domain || "");
          setIsCompleted(completed);
          setIsLocked(
            data.is_project_submitted === true ||
            data.is_approved          === true ||
            completed
          );

          // If completed → show existing screen with "Apply for More Skills" option
          // If active → show existing screen with "Start Over" option
            const paid = await checkRegistration();
            setIsRegistered(paid);
          setScreen("existing");
        } else {
          setScreen("form");
        }
      } catch { setScreen("form"); }
    };
    check();
  }, [isLoaded, user?.id]);

  /* ── Start Over — Deactivate application ── */
  const handleStartOver = async () => {
    if (!user?.id) return;
    setSubmitting(true);
    try {
      await fetch(`${API}/api/internship/restart/${existingInternId}`, { method: "DELETE" });
      setExistingInternId(""); setExistingDomain("");
      setIsCompleted(false); setIsLocked(false);
      setStep(1); setError(""); setScreen("form");
    } catch { setError("Network error. Try again."); }
    finally   { setSubmitting(false); }
  };

  /* ── Apply for More — no deletion, just go to fresh form ── */
  const handleApplyMore = () => {
    // Don't delete anything. Backend allows new insert Deactivate it
    // when existing record is_completed = true.
    setExistingInternId(""); setExistingDomain("");
    setStep(1); setError(""); setScreen("form");
  };

  /* ── Full form helpers ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    if (name === "phone")           value = value.replace(/\D/g, "").slice(0, 10);
    if (name === "cgpa")            value = value.replace(/[^\d.]/g, "");
    if (name === "graduation_year") value = value.replace(/\D/g, "").slice(0, 4);
    setForm(p => ({ ...p, [name]: value }));
  };


  /* ── Check if user already paid registration ── */
const checkRegistration = async (): Promise<boolean> => {
  if (!user?.id) return false;
  try {
    const res  = await fetch(`${API}/api/registration/status/${user.id}`);
    const data = await res.json();
    const paid = data.already_registered || data.is_registered === true;
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
      onSuccess?.(pendingInternId); // ← already paid, just advance
      return;
    }
    if (!orderRes.ok || !orderData.order_id) {
      setRegError(orderData.error || "Failed to create order.");
      setRegLoading(false);
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded) { setRegError("Payment gateway failed to load. Try again."); setRegLoading(false); return; }

    const options = {
      key:         orderData.key_id,
      amount:      orderData.amount,
      currency:    orderData.currency,
      order_id:    orderData.order_id,
      name:        "VFound.in",
      description: "Internship Registration Fee (One-time, Non-refundable)",
      prefill: {
        email:   user.primaryEmailAddress?.emailAddress || "",
        name:    `${form.first_name} ${form.last_name}`.trim() || "",
        contact: form.phone || "",
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
            intern_id:           pendingInternId, // ← pass intern_id
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
          }),
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          setIsRegistered(true);
          setRegLoading(false);
          setShowPaymentPrompt(false);
          onSuccess?.(pendingInternId); // ← advance dashboard AFTER payment confirmed
        } else {
          setRegError(verifyData.error || "Payment verification failed.");
          setRegLoading(false);
        }
      },

      modal: {
        ondismiss: () => {
          // Don't block — data is already saved. User can pay later.
          setRegError("Payment cancelled. Your application is saved — complete payment to activate.");
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

  const validateStep = (): boolean => {
    const msgs: Record<number, () => string | null> = {
      1: () => {
        if (!form.first_name || !form.last_name || !form.phone)
          return "Please fill in all personal details.";
        if (!isValidIndianPhone(form.phone))
          return "Enter a valid 10 digit Indian phone number.";
        return null;
      },
      2: () => {
        if (!form.university || !form.course || !form.graduation_year)
          return "Please complete your education details.";
        const year = Number(form.graduation_year);
        if (year < MIN_GRAD_YEAR || year > MAX_GRAD_YEAR)
          return `Graduation year must be between ${MIN_GRAD_YEAR} and ${MAX_GRAD_YEAR}`;
        return null;
      },
      3: () => {
        if (!form.cgpa || !form.duration) return "Please enter CGPA and select a duration.";
        if (!isValidCGPA(form.cgpa))      return "Enter valid CGPA (0 - 10)";
        return null;
      },
      4: () => (!form.domain ? "Please select a domain." : null),
    };
    const msg = msgs[step]?.();
    if (msg) { setError(msg); return false; }
    setError(""); return true;
  };

  const next = () => { if (!validateStep()) return; setDirection(1); setStep(p => Math.min(p + 1, 4)); };
  const prev = () => { setError(""); setDirection(-1); setStep(p => Math.max(p - 1, 1)); };



 const handleSubmit = async () => {
  if (!validateStep()) return;
  if (!user?.id) { setError("Authentication error. Please login."); return; }

  // No registration gate here — submit first, pay after
  setSubmitting(true); setError("");

  try {
    const res = await fetch(`${API}/api/internship/apply`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form, clerk_id: user.id,
        graduation_year: parseInt(form.graduation_year) || form.graduation_year,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      // ✅ Data stored. Now check if already registered.
      const paid = await checkRegistration();
      if (paid) {
        // Already registered — advance immediately
        onSuccess?.(data.intern_id);
      } else {
        // Store intern_id and trigger payment
        setPendingInternId(data.intern_id);
        setShowPaymentPrompt(true);
      }
    } else {
      setError(data.error || "Submission failed. Please try again.");
    }
  } catch { setError("Network error. Please check your connection."); }
  finally   { setSubmitting(false); }
};

  /* ══════════════════════════════════
     SCREEN: checking
  ══════════════════════════════════ */
  if (screen === "checking" || !isLoaded) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-3">
        <svg className="animate-spin w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
        <p className="text-sm text-gray-400">Checking your application…</p>
      </div>
    );
  }

  /* ══════════════════════════════════
     SCREEN: existing
     Two variants:
     A) is_completed = true  → "Apply for More Skills" (green, non-destructive)
     B) is_completed = false → "Start Over" (rose, destructive)
  ══════════════════════════════════ */
  if (screen === "existing") {

    /* ── VARIANT A: Completed internship ── */
    if (isCompleted) {
      return (
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Internship Completed 🎉
              </h2>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Congratulations! You can now apply for a new domain to keep building skills.
              </p>
            </div>
          </div>

          {/* Completed record pill */}
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{existingDomain}</p>
              <p className="font-mono text-[11px] text-gray-400">{existingInternId}</p>
            </div>
            <span className="ml-auto text-[10px] font-bold uppercase tracking-wider
              bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
              Completed
            </span>
          </div>

          {/* Apply for More Skills */}
          <button
            onClick={handleApplyMore}
            className="w-full flex items-center gap-4 p-5 bg-blue-50 border-2 border-blue-200
              hover:border-blue-400 rounded-2xl transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0
              group-hover:scale-105 transition-transform">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-800">Apply for More Skills</p>
              <p className="text-xs text-blue-500 mt-0.5 leading-relaxed">
                Start a new internship in a different domain. Your certificate is safe.
              </p>
            </div>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#3b82f6"
              strokeWidth={2} className="ml-auto shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-3">
              ⚠ {error}
            </p>
          )}
        </div>
      );
    }

    /* ── VARIANT B: Active (non-completed) internship ── */
    return (
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">You already have an active application</h2>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              Only 1 active application is allowed at a time.
            </p>
          </div>
        </div>

        {/* Active Record */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{existingDomain}</p>
            <p className="font-mono text-[11px] text-gray-600">{existingInternId}</p>
          </div>
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
            ACTIVE
          </span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left - Payment Section */}
          <div className="p-2">
            {isRegistered === false && (
              <button
                onClick={handleRegisterAndPay}
                disabled={regLoading}
                className="w-full flex items-center gap-4 p-5 bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {regLoading ? (
                    <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-800">Pay One Time Registration Fee</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Complete your payment.</p>
                </div>
              </button>
            )}

            {isRegistered === true && (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-4 rounded-2xl">
                <svg width="50" height="50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Registration Completed
              </div>
            )}
          </div>

          {/* Right - Start Over */}
          <div className="p-2">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to start over?\n\nThis will permanently deactivate your current application and cannot be undone.")) {
                  handleStartOver();
                }
              }}
              disabled={submitting}
              className="w-full flex items-center gap-4 p-5 bg-rose-50 border-2 border-rose-200 hover:border-rose-400 rounded-2xl transition-all text-left group disabled:opacity-60"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {submitting ? (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-rose-800">Start Over</p>
                <p className="text-xs text-rose-500 mt-0.5 leading-relaxed">
                  Permanently deactivate this application.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Lock Notice */}
        {isLocked && (
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-6">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Domain and duration cannot be changed after project submission or approval.
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-4">
            ⚠ {error}
          </p>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════
     SCREEN: form (new apply)
  ══════════════════════════════════ */
  const renderStepContent = () => {
    switch (step) {
      case 1: return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField name="first_name" label="First Name" value={form.first_name} onChange={handleChange} />
            <InputField name="last_name"  label="Last Name"  value={form.last_name}  onChange={handleChange} />
          </div>
          <InputField name="email" label="Registered Email" type="email"
            value={form.email} onChange={handleChange} disabled />
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm text-gray-500">
              🇮🇳 +91
            </div>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder=" "
              className="peer w-full pl-16 pr-4 pt-6 pb-2 border rounded-xl focus:outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all
                text-gray-900 text-sm bg-gray-50 border-gray-200"/>
            <label className="absolute left-16 top-1/2 -translate-y-1/2 text-sm text-gray-400
              pointer-events-none transition-all
              peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-500
              peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:translate-y-0
              peer-[&:not(:placeholder-shown)]:text-xs">
              Phone Number
            </label>
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-4">
          <InputField name="university"      label="University / College" value={form.university}      onChange={handleChange} />
          <InputField name="course"          label="Course / Major"       value={form.course}          onChange={handleChange} />
          <InputField name="graduation_year"
            label={`Expected Graduation Year (${MIN_GRAD_YEAR}-${MAX_GRAD_YEAR})`}
            value={form.graduation_year} onChange={handleChange} />
        </div>
      );
      case 3: return (
        <div className="space-y-4">
          <InputField name="cgpa" label="CGPA / Percentage" value={form.cgpa} onChange={handleChange} />
          <div className="relative">
            <select name="duration" value={form.duration} onChange={handleChange}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-gray-900
                appearance-none cursor-pointer transition-all">
              <option value="">Select Internship Duration</option>
              <option value="30_days">30 Days</option>
              <option value="45_days">45 Days</option>
              <option value="60_days">60 Days</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Which domain excites you most?</p>
          <div className="grid grid-cols-2 gap-2.5">
            {DOMAINS.map(d => (
              <button key={d} type="button" onClick={() => setForm(p => ({ ...p, domain: d }))}
                className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all
                  ${form.domain === d
                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300 hover:bg-blue-50/40"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-100">
        {FORM_STEPS.map(s => (
          <div key={s.id} className={`flex-1 px-2 py-3 text-center border-b-2 transition-all
            ${step === s.id ? "border-blue-500" : "border-transparent"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider
              ${step === s.id ? "text-blue-600" : step > s.id ? "text-emerald-500" : "text-gray-300"}`}>
              {step > s.id ? "✓" : s.id}. {s.title}
            </p>
          </div>
        ))}
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{FORM_STEPS[step - 1].title}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{FORM_STEPS[step - 1].subtitle}</p>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step} custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}>
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-sm text-red-500 bg-red-50
            border border-red-100 rounded-lg px-3 py-2">
            <span>⚠</span> {error}
          </div>
        )}
      </div>

      <div className="px-8 pb-8 flex items-center justify-between">
        <div className="flex gap-1.5">
          {FORM_STEPS.map(s => (
            <div key={s.id} className={`rounded-full transition-all duration-300
              ${step === s.id ? "w-6 h-2 bg-blue-500" : step > s.id ? "w-2 h-2 bg-emerald-400" : "w-2 h-2 bg-gray-200"}`}/>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={prev} disabled={step === 1}
            className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-800
              disabled:opacity-0 transition-colors rounded-xl hover:bg-gray-50">
            ← Back
          </button>
          {step < 4 ? (
                <button onClick={next}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm
                    font-medium rounded-xl transition-colors shadow-sm">
                  Continue →
                </button>
              ) : showPaymentPrompt ? (
                // ── Payment prompt — shown after form submitted but not yet paid ──
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Application saved : </span>
                  <button
                    onClick={handleRegisterAndPay}
                    disabled={regLoading}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold
                      rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {regLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Processing…
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                        </svg>
                        Pay ₹110 to Activate
                      </>
                    )}
                  </button>
                </div>
              ) : (
                // ── Normal step 4 footer ──
                <div className="flex items-center gap-2">
                  {isRegistered && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600
                      bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      Registered
                    </span>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
                      rounded-xl transition-colors shadow-sm disabled:opacity-60 flex items-center gap-2"
                  >
                    {submitting && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                    )}
                    {submitting ? "Submitting…" : "Submit Application"}
                  </button>
                </div>
              )}

            {/* Registration error — shown only on step 4 */}
            {step === 4 && regError && (
              <div className="mt-3 flex items-center gap-2 text-sm text-rose-500 bg-rose-50
                border border-rose-100 rounded-lg px-3 py-2">
                <span>⚠</span> {regError}
                <button onClick={() => setRegError("")} className="ml-auto text-rose-400 hover:text-rose-600">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}