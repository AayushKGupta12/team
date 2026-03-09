import React from 'react';
import Link from "next/link";

export default function HeroCTA() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden rounded-t-4xl">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 20% 40%, #ff5a57 10%, #e02f75 30%, #6700a3 70%, #050c38 110%)',
          filter: 'blur(2px)',
        }}
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 text-center text-white max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Ready to explore?
        </h1>

        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto leading-relaxed mb-10 opacity-95">
          Trusted by Thousands of developers by all over India
        </div>

        <Link href="/sign-up">
          <button className="bg-white text-purple-700 font-bold text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-2xl hover:shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all duration-300 min-w-[200px]">
            Sign up For <span className="bg-green-600 px-2 py-1 rounded-md text-white font-extrabold">FREE</span>
          </button>
        </Link>
      </div>
    </section>
  );
}