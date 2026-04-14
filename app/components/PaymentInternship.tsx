"use client";

import { useState, useEffect } from "react";

interface Props {
  internId?: string;
  onSuccess?: () => void;
}

type PayState = "idle" | "confirming" | "loading" | "success" | "error";

export default function PaymentInternship({ internId: propId, onSuccess }: Props) {
  const [state, setState] = useState<PayState>("idle");
  const [check, setCheck] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [apiErr, setApiErr] = useState("");
  const [copied, setCopied] = useState(false);
  const baseAmount = check?.amount ? check.amount - 29 : 0;
  const platformFee = 29;
  const totalAmount = check?.amount || 0;

  const [internId, setInternId] = useState<string>("");

  // Resolve Intern ID
  useEffect(() => {
    if (propId && propId.trim() !== "" && propId !== "undefined") {
      setInternId(propId);
      return;
    }
    try {
      const raw = localStorage.getItem("vf_session");
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.intern_id?.trim()) {
          setInternId(saved.intern_id);
          return;
        }
      }
    } catch {}
    setInternId("");
  }, [propId]);

  // Fetch eligibility
  useEffect(() => {
    if (!internId) return;

    setChecking(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/payment-check/${internId}`)
      .then(res => res.json())
      .then(data => setCheck(data))
      .catch(() => setCheck(null))
      .finally(() => setChecking(false));
  }, [internId]);

  const certUrl = `https://vfound.in/certificate/${internId}`;

  
  
  const handleClick = async () => {
  if (!internId) return;

  setState("loading");

  try {
    // 1. Create order
    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/internship/cert/create-order/${internId}`,
      { method: "POST" }
    );

    const orderData = await orderRes.json();

    if (orderData.already_paid) {
      setState("success");
      return;
    }

    if (!orderRes.ok) throw new Error(orderData.error);

    // 2. Load Razorpay
    const loaded = await loadRazorpay();
    if (!loaded) throw new Error("Razorpay failed to load");

    // 3. Open payment
    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.order_id,

      name: "VFound Internship",
      description: "Certificate Fee",

      handler: async (response: any) => {
        const verify = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/internship/cert/verify-payment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              intern_id: internId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }
        );

        const data = await verify.json();

        if (data.success) {
          setState("success");
        } else {
          setState("error");
          setApiErr(data.error);
        }
      },

      theme: { color: "#111827" }
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



  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  const loadRazorpay = (): Promise<boolean> =>
  new Promise(resolve => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  // Success State
  if (state === "success") {
    return (
      <div className="w-full p-8 space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-9 h-9 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Verification Complete</h2>
          <p className="text-gray-500 mt-2">Your internship certificate has been issued.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <table className="w-full">
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 text-sm text-gray-500">Intern ID</td>
                <td className="py-3 text-right font-mono font-medium text-gray-900">{internId}</td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-500">Date</td>
                <td className="py-3 text-right text-sm font-medium text-gray-900">{today}</td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-500">Status</td>
                <td className="py-3 text-right text-emerald-600 font-semibold">Paid • Verified</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Your Certificate</p>
          
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-4">
            <p className="font-mono text-sm text-gray-600 truncate pr-2">{certUrl}</p>
            <button
              onClick={copy}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <a
            href={certUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 rounded-2xl transition-colors"
          >
            View Certificate
          </a>
        </div>
      </div>
    );
  }

  // Main Payment UI
  return (
    <div className="w-full p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Complete Verification</h2>
        <p className="text-gray-500 mt-1">Pay to unlock your official internship certificate</p>
      </div>

      {/* Intern ID */}
      {internId ? (
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4">
          <div className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-indigo-600 text-xl">🪪</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">INTERN ID</p>
            <p className="font-mono text-lg font-bold text-gray-900 tracking-tight">{internId}</p>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-red-700 text-sm">
          Intern ID not found. Please go back to Status page and refresh.
        </div>
      )}

      {/* Eligibility Check - Clean Table Style */}
      {check && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6">
          <p className="uppercase text-xs tracking-widest text-gray-700 mb-5">Eligibility Check</p>
          
          <table className="w-full">
            <tbody className="divide-y divide-gray-300 text-sm">
              {Object.entries(check.checks || {}).map(([key, value]) => (
                <tr key={key}>
                  <td className="py-3 text-gray-600 capitalize">
                    {key.replace(/_/g, " ")}
                  </td>
                  <td className="py-3 text-right font-medium">
                    {value ? (
                      <span className="text-emerald-600">✓ Verified</span>
                    ) : (
                      <span className="text-rose-500">✕ Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Breakdown */}
{check && (
  <div className="bg-white border border-gray-200 rounded-3xl p-6">
    <p className="uppercase text-xs tracking-widest text-gray-700 mb-5">
      Payment Breakdown
    </p>

    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Internship Fee</span>
        <span className="text-gray-900 font-medium">₹{baseAmount}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Platform Charges</span>
        <span className="text-gray-900 font-medium">₹{platformFee}</span>
      </div>

      <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
        <span className="font-semibold text-gray-900">Total Payable</span>
        <span className="text-xl font-bold text-gray-900">
          ₹{totalAmount}
        </span>
      </div>
    </div>

    {/* Trust Note */}
    <p className="text-xs text-gray-500 mt-4 leading-relaxed">
      <span className="font-bold underline-offset-2">Non-Refundable</span>. By proceeding, you agree to our <span className="font-bold">Terms of Service</span>. Your certificate will be issued within 2 Hours after successful payment. For any queries, Please visit our <a href="https://vfound.in/faq" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">FAQ</a> or <a href="https://www.vfound.in/contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">contact support</a>.
    </p>
  </div>
)}

      {/* Error */}
      {state === "error" && apiErr && (
        <div className="bg-red-50 border border-red-100 text-red-700 rounded-2xl p-4 text-sm">
          {apiErr}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleClick}
        disabled={state === "loading" || !internId || !check?.eligible}
        className="w-full py-4 bg-gray-900 hover:bg-black text-white font-medium rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {state === "loading" ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Processing...
          </>
        ) : state === "confirming" ? (
          "Confirm & Pay ₹" + (check?.amount || "")
        ) : (
          "Proceed to Verification"
        )}
      </button>

      {state === "confirming" && (
        <button
          onClick={() => setState("idle")}
          className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}