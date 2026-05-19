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
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-md p-6 md:p-8 shadow-sm">
      
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center pb-4 mb-6 border-b border-dashed border-gray-300">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-1 text-xs text-gray-500 max-w-[240px]">
          Sign in to track your progress and access 800+ DSA problems.
        </p>
      </div>

      {/* Action Forms / Buttons */}
      <div className="space-y-3">
        <a 
          href="https://www.tauzand.in/sign-in"
          className="flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white tracking-wide border border-gray-900 hover:bg-black transition-colors duration-150 text-center"
        >
          Sign In to Account
        </a>

        {/* Divider Row */}
        <div className="relative py-2 flex items-center justify-center">
          <div className="w-full border-t border-gray-200"></div>
          <span className="absolute bg-white px-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
            New Here?
          </span>
        </div>

        <a 
          href="https://www.tauzand.in/sign-up"
          className="flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 tracking-wide hover:bg-gray-50 transition-colors duration-150 text-center"
        >
          Create an Account
        </a>
      </div>

      {/* Footer Meta Details */}
      <div className="mt-6 pt-4 border-t border-gray-100 text-center space-y-3">
        <p className="text-[10px] text-gray-400 font-medium tracking-wide">
          Secure authentication system managed by <span className="text-gray-600 font-semibold">TAUZAND</span>
        </p>
        
        <div className="block">
          <a 
            href="/DSA" 
            className="inline-block text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
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

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs">

          <div className="w-full max-w-4xl px-4">

            <DSAPayment />

          </div>

        </div>
      )}

    </div>
  );
};

export default Page;