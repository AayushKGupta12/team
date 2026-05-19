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

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy Content */}
          <div className="space-y-8">
          <div className="inline-block border border-slate-900 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
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
          <div className="relative group">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-[40px] scale-105 blur-2xl" />
            
            <div className="relative transition-transform duration-500 group-hover:rotate-0">
              <div className="rounded-[15px] border border-slate-200 bg-gray-100 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.12)]">
                <div className="overflow-hidden rounded-[12px] bg-slate-100 aspect-auto lg:aspect-auto xl:aspect-auto">
                  <img
                    src="/DSADashboard.png"
                    alt="Dashboard preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Curated Content</p>
                    <p className="text-[10px] text-slate-400">By FAANG Engineers</p>
                  </div>
                </div>
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
        className="flex items-center justify-center bg-white h-24 p-4 transition-colors hover:bg-slate-50"
      >
        <span className="text-xl font-black uppercase tracking-tighter text-slate-400 grayscale hover:text-slate-900 transition-all cursor-default">
          {company}
        </span>
      </div>
    ))}

    {/* The "+76 More" Block */}
    <div className="flex items-center justify-center bg-yellow-50 h-24 p-4">
      <span className="text-xl font-bold uppercase tracking-widest text-yellow-500">
        + 59 More
      </span>
    </div>
  </div>
</div>
      </div>
    </section>
  );
}