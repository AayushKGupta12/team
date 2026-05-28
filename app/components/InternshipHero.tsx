"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InternshipHero() {
  const router = useRouter();

  return (
    <section className="w-full bg-white text-slate-900 py-28 px-6 mt-5">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Minimalist Copy */}
        <div className="space-y-8">
          <div className="inline-block border border-slate-900 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
            Summer Intake 2026
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            Engineering with<br />
            <span className="font-light text-slate-400"> Verified Internship.</span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-md">
            Skip vanity certificates. Build real projects, get mentor-reviewed validation, 
            and earn a credential that recruiters actually trust.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.push("/internship/userdashboard")}
              className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-blue-600 transition cursor-pointer"
            >
              Start Your Internship
            </button>
            <button 
              onClick={() => router.push("/internship/validate")}
              className="px-8 py-4 border border-slate-200 font-bold text-sm rounded-full hover:bg-slate-200 transition cursor-pointer">
              Verify Credential
            </button>
          </div>
        </div>

        <div className="relative group">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-[40px] scale-105 blur-2xl" />
            
            <div className="relative transition-transform duration-500 group-hover:rotate-0">
              <div className="rounded-[15px] border border-slate-200 bg-gray-100 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.12)]">
                <div className="overflow-hidden rounded-[12px] bg-slate-100 aspect-auto lg:aspect-auto xl:aspect-auto">
                  <img
                    src="/SampleCertificate.png"
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
                    <p className="text-xs font-bold text-slate-900">Validated Credential</p>
                    <p className="text-[10px] text-slate-400">By Industry Experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}