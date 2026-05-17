"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function CongratsPopup() {
  const { isSignedIn, isLoaded } = useUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const alreadyShown = localStorage.getItem("freeCoinsPopupShown");

    if (isSignedIn && !alreadyShown) {
      setShow(true);
      localStorage.setItem("freeCoinsPopupShown", "true");
    }
  }, [isSignedIn, isLoaded]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-inner">
            ✓
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Congratulations
          </h2>
          <p className="text-gray-400 mt-2 text-lg">Account successfully activated</p>
        </div>

        {/* Message */}
        <div className="text-center bg-[#111111] border border-gray-800 rounded-2xl p-6 mb-8">
          <p className="text-2xl font-semibold text-white">
            You’ve received <span className="text-emerald-400">75 Coins</span>
          </p>
          <p className="text-gray-400 mt-2 text-[15px]">
            These coins can be used to unlock premium AI features and priority tools.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => setShow(false)}
          className="w-full h-14 bg-white text-black font-semibold text-lg rounded-2xl 
                     hover:bg-gray-200 active:scale-[0.985] transition-all duration-200"
        >
          Explore Premium Features
        </button>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Coins credited instantly • T&C apply
        </p>
      </div>
    </div>
  );
}