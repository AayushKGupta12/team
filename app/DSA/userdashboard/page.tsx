'use client';

import React, { useEffect, useState } from 'react';
import DSAQuestionsPage from '../../components/DSAQuestionsPage';
import DSAPayment from '../../components/DSAPayment';
import { useUser } from '@clerk/nextjs';

const page = () => {

  const [userPaid, setUserPaid] = useState(false);

  const { user } = useUser();

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

  useEffect(() => {

    if (user?.id) {
      fetchPaymentStatus();
    }

  }, [user]);

  return (
    <div className="relative">

      <div
        className={
          !userPaid
            ? 'pointer-events-none blur-xs grayscale'
            : ''
        }
      >
        <DSAQuestionsPage />
      </div>

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

export default page;