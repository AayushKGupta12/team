'use client';

import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

interface BannerProps {
  isPositive: boolean;
  message: string;
}

function Banner({ isPositive, message }: BannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-center
        px-4 py-1 shadow-md
        ${isPositive
          ? 'bg-green-300 text-[#1F2933]'
          : 'bg-red-400 text-white'
        }`}
    >
      {/* Message */}
      <p className="text-center text-sm sm:text-base font-semibold tracking-wide max-w-4xl px-6">
        {message}
      </p>

      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Close banner"
        className="absolute right-4 flex items-center justify-center cursor-pointer"
      >
        <RxCross2 className="w-5 h-5 font-bold opacity-90 hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}

export default Banner;
