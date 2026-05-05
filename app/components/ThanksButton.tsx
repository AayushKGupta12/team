"use client";
import { AnimatePresence, motion } from "framer-motion";
// components/ThanksButton.tsx
// Usage: <ThanksButton /> anywhere in your app
import { Check, Coffee, ChevronRight, Sparkles } from "lucide-react";

import { useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

// ── Load Razorpay script once ──────────────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ThanksButton() {
  const [step, setStep] = useState<"idle" | "donate" | "success">("idle");
  const [amount, setAmount] = useState(30);
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay. Please check your internet connection.");
      setLoading(false);
      return;
    }

    // Create order on server
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (!data.orderId) {
      alert("Could not initiate payment. Try again.");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // set in .env.local
      amount: amount * 100,
      currency: "INR",
      name: "Tauzand.in",
      description: "Appreciation Token for Tauzand",
      order_id: data.orderId,
      theme: { color: "#6366f1" },
      modal: {
        ondismiss: () => setLoading(false),
      },
      handler: () => {
        setLoading(false);
        setStep("success");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  }

  return (
  <section className="relative overflow-hidden bg-white border-y border-slate-100 py-16 md:py-28 lg:py-32">
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

    <div className="container mx-auto max-w-6xl px-6 relative z-10">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        
        {/* Left Side: Editorial Content */}
        <div className="space-y-8 text-center lg:text-left">
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl leading-[1.1]">
              Fuel the code <br />
              <span className="text-emerald-600 italic font-serif">behind Tauzand</span>
            </h2>
            <p className="mx-auto text-lg leading-relaxed text-slate-500 lg:mx-0 lg:max-w-md font-light">
              We provide advanced career tools to thousands of students for free. 
              Small contributions help us cover GPU costs and high-performance indexing.
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 pt-4">
            {['Cloud Hosting', 'AI Inference', 'API Costs'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <div className="h-1 w-1 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: The Contribution Terminal */}
        <div className="relative group">
          {/* Soft Glow Ambient Elevation */}
          <div className="absolute -inset-2 rounded-[40px] bg-gradient-to-tr from-emerald-50 to-slate-100 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] md:p-12">
            <AnimatePresence mode="wait">
              {step !== "success" ? (
                <motion.div
                  key="donate-flow"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-10"
                >
                  <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-200">
                      <Coffee size={20} strokeWidth={2.5} />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Secure UPI</p>
                      <p className="text-sm font-bold text-slate-900">Appreciation</p>
                    </div>
                  </div>

                  <div className="space-y-8 py-4 text-center">
                    <div className="flex flex-col gap-1">
                      <motion.span 
                        key={amount}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-7xl font-bold text-slate-900 tracking-tighter"
                      >
                        ₹{amount}
                      </motion.span>
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter">Adjust contribution</span>
                    </div>
                    
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={10}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-100 accent-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[ 40, 60, 80, 100].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(v)}
                        className={`rounded-xl border py-3 text-sm font-bold transition-all active:scale-95 ${
                          amount === v
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                            : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                        }`}
                      >
                        ₹{v}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-70 active:scale-[0.98] shadow-xl shadow-slate-200"
                  >
                    {loading ? "Initializing..." : "Buy me a coffee"}
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-10 text-center space-y-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-200 blur-3xl opacity-30 animate-pulse" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Check size={36} strokeWidth={3} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-slate-900 font-serif italic tracking-tight">Magnificent!</h3>
                    <p className="text-slate-400 max-w-[260px] text-sm font-medium leading-relaxed">
                      You are officially a patron of Tauzand. Your support keeps us online.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setStep("idle")}
                    className="rounded-full bg-slate-100 px-10 py-3 text-xs font-black uppercase tracking-widest text-slate-900 hover:bg-slate-200 transition-colors"
                  >
                    Back to Terminal
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  </section>
);
}

// ── Reusable Modal wrapper ─────────────────────────────────────────────────
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}