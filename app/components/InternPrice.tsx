"use client";
import React from 'react';
import { Check, Zap, ArrowRight, Wallet, Infinity } from 'lucide-react';

const UnifiedPricing = () => {
  return (
    <section className="bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Editorial Header */}
        <div className="mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Pricing Model</span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-950 tracking-tighter mt-4">
            One-time access. <br />
            <span className="italic font-light text-slate-400">Unlimited potential.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Registration Card */}
          <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white">
                <Wallet size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-950">Registration Access</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">One-time payment</p>
              </div>
            </div>
            <div className="mb-10">
              <span className="text-6xl font-bold text-slate-950 tracking-tighter">₹269</span>
              <p className="text-slate-500 font-medium mt-2">Unlocks your lifetime career dashboard, mentor access, and initial verification tools.</p>
            </div>
            <div className="space-y-4">
               {["Lifetime Dashboard Access", "Mentor Network Connection", "Project Repository"].map((f, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm text-slate-900">
                  <Check size={16} className="text-slate-900" strokeWidth={4} /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Submission Card */}
          <div className="bg-slate-950 rounded-[2.5rem] p-12 text-white flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white">
                <Infinity size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Unlimited Submissions</h3>
                <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Pay-per-audit model</p>
              </div>
            </div>
            <div className="mb-10">
              <span className="text-6xl font-bold tracking-tighter">Starts at ₹2</span>
              <p className="text-slate-400 font-medium mt-2">Submit as many projects as you want. You only pay the nominal audit fee per submission to get it verified by our engineers.</p>
            </div>
            <div className="space-y-4">
               {["Unlimited Production Projects", "Git-Level Logic Audit", "Video Defense Call"].map((f, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm text-white">
                  <Check size={16} className="text-blue-500" strokeWidth={4} /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-8 bg-slate-900 rounded-[2.5rem] p-12 md:p-16 text-center flex flex-col items-center">
          <Zap size={40} className="text-yellow-400 mb-6" />
          <h3 className="text-4xl font-bold text-white tracking-tighter mb-6">Ready to get verified?</h3>
          <a href="/internship/userdashboard" className="px-12 py-5 bg-white text-slate-950 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-3">
            Get Started Now <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default UnifiedPricing;