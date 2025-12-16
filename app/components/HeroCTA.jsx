import React from 'react';
import Link from "next/link";

export default function HeroCTA() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
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
          Ready to Xplore?
        </h1>

        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto leading-relaxed mb-10 opacity-95">
          Trusted by hundreds of companies hiring fresh talent faster with{' '}
          <span className="font-bold text-white">Vfound.in</span>.
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-8 mb-6">
            <span className="px-5 py-3 bg-[#050c38]/90 backdrop-blur-sm rounded-full text-sm sm:text-base font-medium border border-white/20">
              1200+ Job Listings
            </span>
            <span className="px-5 py-3 bg-[#050c38]/90 backdrop-blur-sm rounded-full text-sm sm:text-base font-medium border border-white/20">
              2800+ Companies
            </span>
            <span className="px-5 py-3 bg-[#050c38]/90 backdrop-blur-sm rounded-full text-sm sm:text-base font-medium border border-white/20">
              1000+ Developers
            </span>
          </div>
        </div>

        <Link href="/ai-resume-analysis">
          <button className="bg-white text-purple-700 font-bold text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-2xl hover:shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all duration-300 min-w-[200px]">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}