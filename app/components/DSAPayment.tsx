'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs';

declare global {
  interface Window { Razorpay: any; }
}

export default function DSAPayment() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

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

      if (!user?.id) {
        openSignIn();
        return;
      }
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
  <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
    {/* Left Column - Light Green Context */}
    <div className="bg-green-100 p-5 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
      <div>
        <div className="flex justify-between items-center">
        {/* Left side */}
        <div className="inline-block bg-white text-emerald-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border border-emerald-100 w-fit">
          EARLY-BIRD-OFFER
        </div>

        {/* Right side */}
        <a
          href="/DSA"
          className="inline-block bg-white text-gray-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border border-gray-100 w-fit"
        >
          Go Back
        </a>
      </div>

        
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6 leading-tight">
          Accelerate Your<br className="hidden md:block" /> Problem Solving.
        </h2>

        <div>
          <p className="uppercase text-[10px] font-bold text-gray-800 mb-2.5 tracking-widest">PROGRAM FEATURES</p>
          <ul className="space-y-2 text-xs md:text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              800+ Real Company Interview Questions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              Pattern-First Learning Methodology
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              Topic-wise & Level-wise Practice
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              Hands-on Coding Projects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              Full Dashboard & Progress Analytics
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              Lifetime Access & Updates
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Right Column - Compact Razorpay Receipt Style */}
    <div className="p-5 md:p-8 bg-white flex flex-col justify-center">
      
      {/* Razorpay Sub-Receipt Container */}
      <div className="border border-gray-200 rounded-sm p-4 bg-gray-50/50 relative">
        
        {/* Receipt Header */}
        <div className="text-center pb-3 mb-4 border-b border-dashed border-gray-300">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-800">RAZORPAY INVOICE</p>
          <p className="text-[10px] text-gray-600 font-mono mt-0.5">REF: EARLY-BIRD-OFFER</p>
        </div>

        {/* Line Items */}
        <div className="space-y-2 text-xs md:text-sm mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Standard Program Fee</span>
            <span className="font-mono">₹399.00</span>
          </div>

          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Early Bird Waiver (78%)</span>
            <span className="font-mono">-₹310.00</span>
          </div>

          <div className="pt-3 border-t border-dashed border-gray-300 flex justify-between items-center text-base md:text-lg font-bold text-gray-900">
            <span>Total Payable</span>
            <span className="font-mono text-gray-900">₹89.00</span>
          </div>
        </div>

        {/* Status indicator / Meta updates */}
        <div className="text-center pt-1 space-y-0.5 border-t border-gray-100">
          <p className="text-[11px] text-gray-600">
            Includes lifetime access & global updates.
          </p>
          <p className="text-[10px] text-gray-800 underline decoration-gray-300">
            If already paid, you can ignore this.
          </p>
        </div>
      </div>

      {/* Button and Post-Action Details Outside Receipt Frame */}
      <div className="mt-4 space-y-3">
        <button
          onClick={handlePayment}
          className="w-full bg-gray-900 hover:bg-black text-white font-medium py-2.5 rounded-md text-sm transition-colors duration-150 active:scale-[0.99]"
        >
          Proceed to Payment
        </button>

        <p className="text-center text-[10px] text-gray-800 tracking-wide">
          Secure checkout via <span className='font-extrabold italic'>Razorpay</span> • Receipt sent instantly
        </p>
      </div>

    </div>

  </div>
);
}