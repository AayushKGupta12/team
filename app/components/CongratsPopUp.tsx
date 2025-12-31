"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function CongratsPopup() {
  const { isSignedIn, isLoaded } = useUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    // show only once after login/signup
    const alreadyShown = localStorage.getItem("freeCoinsPopupShown");

    if (isSignedIn && !alreadyShown) {
      setShow(true);
      localStorage.setItem("freeCoinsPopupShown", "true");
    }
  }, [isSignedIn, isLoaded]);

  if (!show) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl mb-4 shadow-lg">
          ✓
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Congratulations!
        </h2>
      </div>

      {/* Message */}
      <div className="text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          You’ve successfully received <span className="font-semibold text-green-600">300 Free Coins</span>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Use them to access premium features.
        </p>
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShow(false)}
          className="border relative h-12 py-1 p-8 text-black text-2xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
          Start Using
        </button>
      </div>

      {/* Subtle footer note (optional) */}
      <p className="mt-6 text-xs text-gray-500 text-center">
        Coins are credited instantly and ready for use. <br/>T&C apply.
      </p>
    </div>
  </div>
);
}
