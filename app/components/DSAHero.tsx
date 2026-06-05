"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InternshipHero() {
  const router = useRouter();

  const companies = [
    "Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix", "Adobe", 
    "Oracle", "Infosys", "TCS", "Wipro", "Accenture", "Cognizant", 
    "Deloitte", "Capgemini", "IBM",
  ];

  return (
    <section className="relative w-full bg-white text-slate-900 overflow-hidden md:px-15">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-slate-50 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-30 pb-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy Content */}
          <div className="space-y-8">
          <div className="inline-block border border-slate-900 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mt-10">
            Placement's 2026
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            Data Structure <br />
            <span className="italic font-light text-slate-400">& Algorithms</span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-md">
            Solve company-specific DSA problems
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.push("/DSA/userdashboard")}
              className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-blue-600 transition cursor-pointer"
            >
              START SOLVING
            </button>
          </div>
        </div>

          {/* Right: Visual Frame */}
            <div className="relative w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl lg:translate-x-15">
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-yellow-200 scale-130 blur-xl opacity-60" />
              
              {/* Container with relative context and transition layout */}
              <div className="relative transition-all duration-500 rounded-2xl overflow-hidden scale-150 -right-40 pt-10">
                <div className="w-full h-auto">
                  <img
                    src="/DSADashboard.png"
                    alt="Dashboard preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
          </div>
        </div>

        {/* Marquee Section */}
        <div className="mt-24 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {/* 11 Company Names */}
            {companies.slice(0, 11).map((company, index) => (
              <div
                key={`${company}-${index}`}
                className="flex items-center justify-center bg-white h-24 p-4 transition-colors"
              >
                <span className="text-xl font-black uppercase tracking-tighter text-slate-400">
                  {company}
                </span>
              </div>
            ))}

            {/* The "+76 More" Block */}
            <div className="flex items-center justify-center bg-white h-24 p-4">
              <span className="text-xl font-bold uppercase tracking-widest text-yellow-500">
                + More
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}