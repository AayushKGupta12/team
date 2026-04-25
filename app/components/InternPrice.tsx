'use client';
import React from 'react';
import { Check, ShieldCheck, BadgeCheck, Timer, Zap, ArrowRight, Lock, Users, Globe } from 'lucide-react';

const UnifiedPricing = () => {
  const allFeatures = [
    "Core Project Module",
    "Git-Level Verification",
    "2-Year Industry Passport",
    "Digital Credential",
    "Industry-grade Review",
    "Priority Mentorship",
    "Career OS Access",
    "Video Defense Call"
  ];

  return (
    <section className="bg-slate-50 py-24 px-6 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-950">Simplified Validation</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tighter mt-4">
            One Program. <span className="text-blue-600">Unlimited Proof.</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-lg">
            Start your Validated internship journey for a nominal registration fee. Build, submit, and <span className="text-yellow-600 font-bold">only pay the success fee once you’re verified</span>.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Main Pricing Card */}
          <div className="col-span-12 lg:col-span-5 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-6 py-2 rounded-bl-2xl uppercase tracking-widest">
              Starting From 30 Days
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-950">Verified Internship Track</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Professional Internship</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-950">₹249</span>
                  <span className="text-slate-400 font-bold"> for 2 Months</span>
                </div>
                <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1 uppercase">
                  <Lock size={12} /> Pay only after your project is successfully verified
                </p>
              </div>

              <div className="space-y-3 mb-10">
                {allFeatures.slice(0, 5).map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600">
                    <Check size={14} className="text-blue-500" strokeWidth={3} />
                    <span className="text-sm font-semibold">{f}</span>
                  </div>
                ))}
                <div className="text-[11px] text-slate-400 pl-7 font-medium underline decoration-slate-200">
                  + All premium tier features included
                </div>
              </div>
            </div>

            <a 
              href="/internship/userdashboard" 
              className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-slate-950 text-white font-bold hover:bg-blue-600 transition-all group"
            >
              Apply now 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Side Bento Blocks */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Win-Win Tile */}
            <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <ShieldCheck size={120} className="absolute -right-8 -bottom-8 opacity-20" />
              <h4 className="text-xl font-bold mb-2">The Win-Win Clause</h4>
              <p className="text-emerald-50 text-xs leading-relaxed opacity-90">
                The ₹269 registration fee unlocks your dashboard and mentor access. You only pay the program fee once your work passes the final logic audit.
              </p>
            </div>

            {/* Mentor Tile */}
            <div className="bg-pink-100 rounded-[2.5rem] p-8 border border-slate-200 flex flex-col justify-between">
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i+20}`} alt="mentor" className="grayscale" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">+12</div>
              </div>
              <div>
                <h4 className="font-bold text-slate-950">Expert Validation</h4>
                <p className="text-slate-500 text-[11px] mt-1">Direct feedback from senior engineers on every pull request.</p>
              </div>
            </div>

            {/* Speed/Delay Tile */}
            <div className="md:col-span-2 bg-slate-950 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Timer size={28} />
              </div>
              <div>
                <h4 className="text-white font-bold">Zero Minimal Submission Delay</h4>
                <p className="text-slate-400 text-xs leading-relaxed mt-1">
                  Finished in 7 days? Great. We audit within <span className="text-white">7 days of submission</span>, regardless of the track length. Impact Clock-watching.
                </p>
              </div>
              <BadgeCheck className="absolute right-6 top-1/2 -translate-y-1/2 text-white/5" size={80} />
            </div>

            {/* Global/India Reach Tile */}
            <div className="md:col-span-2 bg-yellow-100 rounded-[2.5rem] p-8 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Globe className="text-black" size={24} />
                <span className="text-sm font-bold text-black tracking-tight">Access the Pan-India Talent Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Live Connect</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedPricing;