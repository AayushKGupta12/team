"use client";
import React from 'react';
import { Check, Zap, ArrowRight, Wallet, Infinity } from 'lucide-react';


const UnifiedPricing = () => {
  return (
    <section className="bg-slate-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
            One-Time Access. <span className="text-slate-400 font-normal">Unlimited Potential.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">
            Transparent pricing with no hidden fees. Pay once, validate your skills forever.
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Registration Card */}
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-900 rounded-md flex items-center justify-center text-white">
                <Wallet size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Registration Access</h3>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">One-time payment</p>
              </div>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-semibold text-slate-900 tracking-tight">₹269</span>
              <p className="text-slate-500 text-sm mt-2">Unlocks your lifetime career dashboard, mentor access, and project verification tools.</p>
            </div>
            <div className="space-y-3 mt-auto">
              {["Lifetime Dashboard Access", "Direct Mentor Network Access", "Project Repository Storage"].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-slate-700">
                  <Check size={16} className="text-slate-900 flex-shrink-0" strokeWidth={3} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Submission Card */}
          <div className="bg-slate-900 rounded-md p-8 text-white flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center text-white">
                <Infinity size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Unlimited Submissions</h3>
                <p className="text-[10px] font-medium text-blue-300 uppercase tracking-widest">Pay-per-audit model</p>
              </div>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-semibold tracking-tight">Starts at ₹ 2 <span className="text-lg font-normal text-slate-400">per project</span></span>
              <p className="text-slate-400 text-sm mt-2">Submit unlimited projects. Pay only a nominal audit fee per submission for verification by industry engineers.</p>
            </div>
            <div className="space-y-3 mt-auto">
              {["Unlimited Production-Ready Projects", "Git-Level Code Logic Audit", "1-on-1 Video Call with Mentor"].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-white">
                  <Check size={16} className="text-blue-400 flex-shrink-0" strokeWidth={3} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Final CTA */}
        <div className="mt-10 bg-slate-900 rounded-md p-10 text-center">
          <Zap size={32} className="text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">Ready to get your skills verified?</h3>
          <a 
            href="/internship/userdashboard" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-md font-semibold text-sm hover:bg-slate-100 transition-all"
          >
            Get Started Now <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};


export default UnifiedPricing;