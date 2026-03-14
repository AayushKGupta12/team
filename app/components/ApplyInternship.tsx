"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { ACTION_HMR_REFRESH } from "next/dist/client/components/router-reducer/router-reducer-types";

/* ─────────────────────────────────────────
   InputField defined OUTSIDE parent
   so React never remounts it on re-render
───────────────────────────────────────── */
const InputField = ({
  name, label, type = "text", value, onChange, disabled = false,
}: {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => (
  <div className="relative w-full">
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      disabled={disabled}
      className={`peer w-full px-4 pt-6 pb-2 border rounded-xl
        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
        transition-all text-gray-900 text-sm
        ${disabled
          ? "bg-gray-100 border-gray-200 cursor-not-allowed"
          : "bg-gray-50 border-gray-200"}`}
    />
    <label
      htmlFor={name}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400
        pointer-events-none transition-all
        peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-500
        peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:translate-y-0
        peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500">
      {label}
    </label>
  </div>
);

/* ─────────────────────────────────────────
   Props — onSuccess fires after submission
   so the parent dashboard can advance.
   Only intern_id is passed back; the dashboard
   fetches user_id + domain from the API.
───────────────────────────────────────── */
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
  "Data Science", "Machine Learning", "Web Development",
  "Mobile Development", "UI/UX Design", "DevOps",
  "Cloud Computing","Backend - Java","Backend - Flask","Data Analyst","MLOps", "Frontend", "Other",
];

const CURRENT_YEAR = new Date().getFullYear();
const MIN_GRAD_YEAR = CURRENT_YEAR - 3;
const MAX_GRAD_YEAR = CURRENT_YEAR + 3;

const isValidIndianPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
const isValidCGPA = (cgpa: string) => /^([0-9](\.\d{1,2})?|10(\.0{1,2})?)$/.test(cgpa);

export default function ApplyInternship({ onSuccess }: Props) {
  const { user, isLoaded } = useUser();

  const [step, setStep]             = useState(1);
  const [direction, setDirection]   = useState(1);
  const [error, setError]           = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    university: "",
    course: "",
    graduation_year: "",
    cgpa: "",
    duration: "",
    domain: "",
  });

  /* ── Autofill Email From Clerk ── */
  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      setForm(prev => ({
        ...prev,
        email: user.primaryEmailAddress!.emailAddress
      }));
    }
  }, [isLoaded, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  let { name, value } = e.target;

  if (name === "phone") {
    value = value.replace(/\D/g, "").slice(0, 10); // only digits, max 10
  }

  if (name === "cgpa") {
    value = value.replace(/[^\d.]/g, "");
  }

  if (name === "graduation_year") {
    value = value.replace(/\D/g, "").slice(0, 4);
  }

  setForm(p => ({ ...p, [name]: value }));
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
      if (!form.cgpa || !form.duration)
        return "Please enter CGPA and select a duration.";

      if (!isValidCGPA(form.cgpa))
        return "Enter valid CGPA (0 - 10)";

      return null;
    },

    4: () => (!form.domain ? "Please select a domain." : null),
  };

  const msg = msgs[step]?.();
  if (msg) {
    setError(msg);
    return false;
  }

  setError("");
  return true;
};

  const next = () => {
    if (!validateStep()) return;
    setDirection(1);
    setStep(p => Math.min(p + 1, 4));
  };

  const prev = () => {
    setError("");
    setDirection(-1);
    setStep(p => Math.max(p - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    if (!user?.id) {
      setError("Authentication error. Please Login or Create Account.");
      return;
    }

    

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/internship/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            clerk_id: user.id,
            graduation_year: parseInt(form.graduation_year) || form.graduation_year,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        onSuccess?.(data.intern_id);
      } else {
        setError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField name="first_name" label="First Name"  value={form.first_name}  onChange={handleChange} />
            <InputField name="last_name"  label="Last Name"   value={form.last_name}   onChange={handleChange} />
          </div>
          <InputField
            name="email"
            label="Registered Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled
          />
         <div className="relative w-full">
  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm text-gray-500">
    🇮🇳 +91
  </div>

  <input
    type="tel"
    name="phone"
    value={form.phone}
    onChange={handleChange}
    placeholder=" "
    className="peer w-full pl-16 pr-4 pt-6 pb-2 border rounded-xl
      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
      transition-all text-gray-900 text-sm bg-gray-50 border-gray-200"
  />

  <label
    className="absolute left-16 top-1/2 -translate-y-1/2 text-sm text-gray-400
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
          <InputField name="university"      label="University / College"     value={form.university}      onChange={handleChange} />
          <InputField name="course"          label="Course / Major"           value={form.course}          onChange={handleChange} />
        <InputField
  name="graduation_year"
  label={`Expected Graduation Year (${MIN_GRAD_YEAR}-${MAX_GRAD_YEAR})`}
  value={form.graduation_year}
  onChange={handleChange}
/>
        </div>
      );
      case 3: return (
        <div className="space-y-4">
          <InputField name="cgpa" label="CGPA / Percentage" value={form.cgpa} onChange={handleChange} />
          <div className="relative">
            <select name="duration" value={form.duration} onChange={handleChange}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                text-sm text-gray-900 appearance-none cursor-pointer transition-all">
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
              <button key={d} type="button"
                onClick={() => setForm(p => ({ ...p, domain: d }))}
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
      {/* Step tabs */}
      <div className="flex border-b border-gray-100">
        {FORM_STEPS.map(s => (
          <div key={s.id}
            className={`flex-1 px-2 py-3 text-center border-b-2 transition-all
              ${step === s.id ? "border-blue-500" : "border-transparent"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider
              ${step === s.id ? "text-blue-600" : step > s.id ? "text-emerald-500" : "text-gray-300"}`}>
              {step > s.id ? "✓" : s.id}. {s.title}
            </p>
          </div>
        ))}
      </div>

      {/* Body */}
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

      {/* Footer */}
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
          ) : (
            <button onClick={handleSubmit} disabled={submitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm
                font-medium rounded-xl transition-colors shadow-sm disabled:opacity-60
                flex items-center gap-2">
              {submitting && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              )}
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}