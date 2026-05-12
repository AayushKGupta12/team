'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

declare global {
  interface Window { Razorpay: any; }
}

export default function DSAPayment() {
  const { user } = useUser();

  // Load Razorpay SDK once
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  async function handlePayment() {
    try {
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dsa/create-order`, { method: 'POST' });
      const { order } = await orderRes.json();

      new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Tauzand',
        description: 'Company Wise DSA',
        order_id: order.id,
        handler: async (response: any) => {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dsa/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clerk_user_id: user?.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          window.location.reload();
        },
        theme: { color: '#111827' },
      }).open();
    } catch (error) {
      console.error(error);
    }
  }

  return (
  <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
    {/* Subtle Background Accent */}
    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-50/50 blur-3xl" />
    
    {/* Go Back Link - Polished Position */}
    <a 
      href="/DSA" 
      className="absolute top-6 right-6 flex items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-100 hover:text-slate-900 transition-all z-20"
    >
      ← Go Back
    </a>

    <div className="relative z-10">
      {/* Badge with subtle pulse */}
      <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 border border-amber-100 mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        Limited Time Offer
      </div>
      
      <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-[1.1]">
        Unlock Company's DSA Secrets.
      </h2>
      
      <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-[320px]">
        Master patterns used by <span className="text-slate-900 font-semibold">FAANG</span>. 
        Instant access to <span className="text-slate-900 font-semibold">800+ questions</span> from 
        <span className="text-slate-900 font-semibold"> 70+ companies</span>.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {/* Main CTA - Cleaned up text for better readability */}
        <button 
          onClick={handlePayment} 
          className="group relative flex items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 px-6 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100 active:scale-[0.97]"
        >
          <span>Get Full Access — ₹89</span>
          <span className="text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all">→</span>
        </button>

        {/* Value Props & Trust Labels */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600">
             <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
             One-time payment • Lifetime Validity
          </div>
          
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-center text-[10px] font-medium leading-relaxed text-slate-400">
              Secure checkout. A digital money receipt will be <br /> 
              sent to your <span className="text-slate-600">registered email ID</span> instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}