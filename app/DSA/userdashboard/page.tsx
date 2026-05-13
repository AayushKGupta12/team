'use client';

import React, { useEffect, useState } from 'react';

import { useUser } from '@clerk/nextjs';

import DSAQuestionsPage from '../../components/DSAQuestionsPage';
import DSAPayment from '../../components/DSAPayment';

const Page = () => {

  const [userPaid, setUserPaid] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(true);

  const { user, isLoaded } = useUser();

  // -----------------------------------
  // FETCH PAYMENT STATUS
  // -----------------------------------
  async function fetchPaymentStatus() {

    if (!user?.id) return;

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dsa/payment-status/${user.id}`
      );

      const data = await res.json();

      if (data.success) {
        setUserPaid(data.paid);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsCheckingPayment(false);
    }
  }

  // -----------------------------------
  // LOAD PAYMENT STATUS
  // -----------------------------------
  useEffect(() => {

    if (user?.id) {
      fetchPaymentStatus();
    }

  }, [user]);

  // -----------------------------------
  // CLERK LOADING
  // -----------------------------------
  if (!isLoaded) {
    return null;
  }

  // -----------------------------------
  // NOT LOGGED IN
  // -----------------------------------
  if (!user) {

   return (
  <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 relative overflow-hidden">
    {/* Subtle technical background decor */}
    <div className="absolute inset-0 z-0 opacity-40" 
         style={{ backgroundImage: `radial-gradient(#e2e8f0 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
    
    <div className="relative z-10 w-full max-w-md">
      <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        
        {/* Logo or Icon Placeholder */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
          <span className="font-mono text-xl font-bold">{"<>"}</span>
        </div>

        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          Welcome Back
        </h2>

        <p className="mt-3 text-center text-sm text-slate-500 leading-relaxed max-w-[240px]">
          Sign in to track your progress and access 800+ DSA problems.
        </p>

        <div className="mt-10 flex w-full flex-col gap-4">
          <a 
            href="https://www.tauzand.in/sign-in"
            className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-100 active:scale-[0.98]"
          >
            Sign In to Account
          </a>

          <div className="relative my-2 flex items-center justify-center">
            <div className="w-full border-t border-slate-300"></div>
            <span className="absolute bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              New Here?
            </span>
          </div>

          <a 
            href="https://www.tauzand.in/sign-up"
            className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
          >
            Create an Account
          </a>
        </div>

        <p className="mt-8 text-[11px] font-medium text-slate-400">
          Secure authentication by <span className="text-slate-600 font-bold uppercase tracking-tighter">Tauzand</span>
        </p>
      </div>
      
      {/* Footer link */}
      <div className="mt-6 text-center">
        <a href="/DSA" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
          ← Back to Home
        </a>
      </div>
    </div>
  </div>
);
  }

  // -----------------------------------
  // CHECKING PAYMENT — LOADING SCREEN
  // -----------------------------------
  if (isCheckingPayment) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">

       {/* Icon with a Soft Ripple Effect */}
      <div className="relative w-16 h-16 mx-auto mb-8">
        <div className="absolute inset-0 bg-blue-400 rounded-md animate-ping opacity-20"></div>
        <div className="relative w-16 h-16 rounded-md bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
      </div>
      </div>
    );
  }

  // -----------------------------------
  // MAIN PAGE
  // -----------------------------------
  return (

    <div className="relative">

      {/* LOCKED CONTENT */}
      <div
        className={
          !userPaid
            ? 'pointer-events-none blur-xs grayscale'
            : ''
        }
      >
        <DSAQuestionsPage />
      </div>

      {/* PAYMENT OVERLAY */}
      {!userPaid && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

          <div className="w-full max-w-md px-4">

            <DSAPayment />

          </div>

        </div>
      )}

    </div>
  );
};

export default Page;