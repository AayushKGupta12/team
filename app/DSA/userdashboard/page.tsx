'use client';

import React, { useEffect, useState } from 'react';

import {
  useUser,
  SignIn,
} from '@clerk/nextjs';

import DSAQuestionsPage from '../../components/DSAQuestionsPage';
import DSAPayment from '../../components/DSAPayment';

const Page = () => {

  const [userPaid, setUserPaid] =
    useState(false);

  const {
    user,
    isLoaded,
  } = useUser();

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
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">

        <SignIn />

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