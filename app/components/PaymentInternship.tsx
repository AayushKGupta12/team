"use client";

import { useState, useEffect } from "react";

interface Props {
  internId?: string;
  onSuccess?: () => void;
}

type PayState = "idle" | "loading" | "success" | "error";

// ── Human-readable labels for every check key ──────────────
const CHECK_LABELS: Record<string, string> = {
  registered:       "Automation Charges",
  status:           "Status",                          // value printed below
  within_due_date:  "Submission Deadline",             // date printed below
  project_link:     "Verified Project Submitted",
  validated:        "Project Validated",
  project_submitted:"Project Submitted",
  approved:         "Project Approved",
  active:           "Active Applicant",
  not_completed:    "Project Not Completed Yet",
};

// Preferred display order
const CHECK_ORDER = [
  "active",
  "registered",
  "validated",
  "project_submitted",
  "project_link",
  "approved",
  "not_completed",
  "within_due_date",
  "status",
];

interface CheckData {
  eligible: boolean;
  checks: Record<string, boolean>;
  amount: number;
  // extra fields — add these to your backend response too (see comment at bottom)
  status_raw?: string;   // raw status string from interns table
  due_date?: string;     // ISO date string
}

export default function PaymentInternship({ internId: propId, onSuccess }: Props) {
  const [state,    setState]    = useState<PayState>("idle");
  const [check,    setCheck]    = useState<CheckData | null>(null);
  const [checking, setChecking] = useState(true);
  const [apiErr,   setApiErr]   = useState("");
  const [copied,   setCopied]   = useState(false);
  const [internId, setInternId] = useState("");

  const platformFee  = 29;
  const baseAmount   = check?.amount ? check.amount - platformFee : 0;
  const totalAmount  = check?.amount ?? 0;

  // ── Resolve intern ID ────────────────────────────────────
  useEffect(() => {
    if (propId && propId.trim() !== "" && propId !== "undefined") {
      setInternId(propId); return;
    }
    try {
      const raw = localStorage.getItem("vf_session");
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.intern_id?.trim()) { setInternId(saved.intern_id); return; }
      }
    } catch {}
    setInternId("");
  }, [propId]);

  // ── Fetch eligibility ────────────────────────────────────
  useEffect(() => {
    if (!internId) return;
    setChecking(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/payment-check/${internId}`)
      .then(r => r.json())
      .then(d => setCheck(d))
      .catch(() => setCheck(null))
      .finally(() => setChecking(false));
  }, [internId]);

  const certUrl = `https://Tauzand.in/certificate/${internId}`;

  // ── Load Razorpay ────────────────────────────────────────
  const loadRazorpay = (): Promise<boolean> =>
    new Promise(resolve => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload  = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  // ── Pay handler ──────────────────────────────────────────
  const handleClick = async () => {
    if (!internId) return;
    setState("loading");
    try {
      const orderRes  = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/internship/cert/create-order/${internId}`,
        { method: "POST" }
      );
      const orderData = await orderRes.json();

      if (orderData.already_paid) { setState("success"); return; }
      if (!orderRes.ok) throw new Error(orderData.error);

      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay failed to load");

      const options = {
        key:         orderData.key_id,
        amount:      orderData.amount,
        currency:    orderData.currency,
        order_id:    orderData.order_id,
        name:        "Tauzand Internship",
        description: "Certificate Fee",
        handler: async (response: any) => {
          const verify = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/internship/cert/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                intern_id:           internId,
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
              }),
            }
          );
          const data = await verify.json();
          if (data.success) { setState("success"); onSuccess?.(); }
          else { setState("error"); setApiErr(data.error); }
        },
        modal: {
          ondismiss: () => setState("idle"),
        },
        theme: { color: "#111827" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setState("error");
      setApiErr(err.message);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(certUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const fmtDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : null;

  // ── Format status string nicely ──────────────────────────
  const fmtStatus = (raw?: string) => {
    if (!raw) return null;
    const map: Record<string, string> = {
      pending_validation:  "Pending Validation",
      validated:           "Validated ✓",
      project_submitted:   "Project Submitted",
      submission_approved: "Submission Approved ✓",
      approved:            "Project Approved ✓",
      payment_pending:     "Payment Pending",
      completed:           "Completed 🎉",
    };
    return map[raw] ?? raw.replace(/_/g, " ");
  };

  /* ══════════════════════════════════════════
     SUCCESS SCREEN
  ══════════════════════════════════════════ */
  if (state === "success") {
    return (
      <div className="w-full px-4 py-6 space-y-5">

        {/* Icon + heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Verification Complete</h2>
            <p className="text-sm text-gray-500 mt-1">Your internship certificate has been issued.</p>
          </div>
        </div>

        {/* Receipt */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Receipt</p>
          </div>
          <div className="divide-y divide-gray-100">
            <Row label="Intern ID" value={<span className="font-mono font-bold text-gray-900">{internId}</span>} />
            <Row label="Date"      value={<span className="font-semibold text-gray-900">{today}</span>} />
            <Row label="Status"    value={<span className="font-bold text-emerald-600">Paid · Verified</span>} />
          </div>
        </div>

        {/* Certificate link */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Certificate</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between bg-gray-50 border border-gray-100
              rounded-xl px-3.5 py-2.5 gap-2">
              <p className="font-mono text-xs text-gray-500 truncate flex-1">{certUrl}</p>
              <button
                onClick={copy}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700
                  shrink-0 transition-colors"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <a
              href={certUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600
                hover:bg-indigo-700 text-white text-sm font-semibold py-3 rounded-xl
                transition-colors"
            >
              View Certificate
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    );
  }

  /* ══════════════════════════════════════════
     MAIN PAYMENT UI
  ══════════════════════════════════════════ */
  return (
    <div className="w-full px-4 py-6 space-y-4">

      {/* Heading */}
      <div>
        <h2 className="text-base font-bold text-gray-900">Complete Verification</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Pay to unlock your official internship certificate.
        </p>
      </div>

      {/* Intern ID pill */}
      {internId ? (
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <span className="text-lg">🪪</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Intern ID</p>
            <p className="font-mono text-sm font-bold text-gray-900">{internId}</p>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm font-medium text-red-600">
          Intern ID not found. Please go back to Status and refresh.
        </div>
      )}

      {/* ── Eligibility checks ── */}
      {checking ? (
        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <svg className="animate-spin w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <p className="text-sm text-gray-500">Checking eligibility…</p>
        </div>
      ) : check ? (
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Eligibility Check</p>
          </div>

          <div className="divide-y divide-gray-100">
            {CHECK_ORDER.filter(k => k in check.checks).map(key => {
              const passed = check.checks[key];
              const label  = CHECK_LABELS[key] ?? key.replace(/_/g, " ");

              // Sub-value to show under label for special keys
              let sub: string | null = null;
              if (key === "status")          sub = fmtStatus(check.status_raw) ?? null;
              if (key === "within_due_date") sub = fmtDate(check.due_date) ?? null;

              return (
                <div key={key} className="flex items-center justify-between px-4 py-3 gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700 leading-snug">{label}</p>
                    {sub && (
                      <p className="text-xs font-semibold text-indigo-600 mt-0.5">{sub}</p>
                    )}
                  </div>
                  {passed ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600
                      bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 shrink-0">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-600
                      bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1 shrink-0">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Pending
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Overall eligibility banner */}
          <div className={`px-4 py-3 border-t ${
            check.eligible
              ? "bg-emerald-50 border-emerald-200"
              : "bg-amber-50 border-amber-200"
          }`}>
            <p className={`text-xs font-bold text-center uppercase tracking-widest ${
              check.eligible ? "text-emerald-700" : "text-amber-700"
            }`}>
              {check.eligible
                ? "✓ All checks passed — eligible to proceed"
                : "⚠ Complete all checks to unlock payment"}
            </p>
          </div>
        </div>
      ) : null}

      {/* ── Payment breakdown ── */}
      {check && (
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Payment Breakdown
            </p>
          </div>

          <div className="px-4 py-4 space-y-3">
            <Row
              label={<span className="text-sm font-medium text-gray-600">Maintenance Fee</span>}
              value={<span className="text-sm font-semibold text-gray-900">₹{baseAmount}</span>}
            />
            <Row
              label={<span className="text-sm font-medium text-gray-600">Platform Charges</span>}
              value={<span className="text-sm font-semibold text-gray-900">₹{platformFee}</span>}
            />
            <div className="border-t border-gray-100 pt-3">
              <Row
                label={<span className="text-sm font-bold text-gray-900">Total Payable</span>}
                value={<span className="text-xl font-bold text-gray-900">₹{totalAmount}</span>}
              />
            </div>
          </div>

          <div className="px-4 pb-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-500">Non-Refundable.</span>{" "}
              Certificate issued within 24 hours of successful payment. Check your registered email.{" "} <br />
              <a href="https://Tauzand.in/faq" target="_blank" rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium">FAQ</a>
              {" · "}
              <a href="https://www.Tauzand.in/contact" target="_blank" rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium">Support</a>
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {state === "error" && apiErr && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-sm font-medium">
          ⚠ {apiErr}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleClick}
        disabled={state === "loading" || !internId || !check?.eligible}
        className="w-full py-3.5 bg-gray-900 hover:bg-black active:scale-[0.98]
          text-white text-sm font-bold rounded-xl transition-all
          disabled:opacity-40 disabled:cursor-not-allowed
          flex items-center justify-center gap-2.5"
      >
        {state === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Processing…
          </>
        ) : (
          <>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            Proceed to Verification · ₹{totalAmount}
          </>
        )}
      </button>

    </div>
  );
}

/* ── Shared row layout ── */
function Row({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">{label}</div>
      <div className="shrink-0">{value}</div>
    </div>
  );
}
