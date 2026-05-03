'use client';
import React from 'react';
import { Check, X, ShieldCheck, Zap, Trophy, Briefcase, ArrowUpRight, Fingerprint, UserCheck, CalendarCheck } from 'lucide-react';

const StatusPill = ({ children, variant = "blue" }) => {
  const styles = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-200/50",
    red: "bg-rose-500/10 text-rose-600 border-rose-200/50",
    slate: "bg-slate-500/10 text-slate-500 border-slate-200/50"
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles[variant]} uppercase tracking-tighter`}>
      {children}
    </span>
  );
};

export default function PremiumComparison() {
  const tableData = [
  { 
    label: "Proof of Work", 
    sub: "Git-based logic validation",
    trad: "Zero (PDF only)", 
    vfound: "Real-time Commit Tracking",
    icon: <Fingerprint size={16} />
  },
  { 
    label: "Credential Integrity", 
    sub: "Blockchain skill anchoring",
    trad: "Easy to Forge", 
    vfound: "Immutable & Publicly Verified",
    icon: <ShieldCheck size={16} />
  },
  { 
    label: "Engineering Oversight", 
    sub: "Direct industry mentorship",
    trad: "Unsupervised / Solo", 
    vfound: "1-on-1 Senior Review",
    icon: <UserCheck size={16} /> // Make sure to import UserCheck from lucide-react
  },
  { 
    label: "Professional Shelf-life", 
    sub: "Extended credential validity",
    trad: "Instant Decay", 
    vfound: "2-Year Industry Passport",
    icon: <CalendarCheck size={16} /> // Make sure to import CalendarCheck from lucide-react
  },
  { 
    label: "Industry Alignment", 
    sub: "Hiring partner standards",
    trad: "Generic Curriculum", 
    vfound: "Production-Grade Specs",
    icon: <Zap size={16} />
  }
];

  return (
    <section className="w-full bg-slate-50/50 py-32 font-sans antialiased selection:bg-blue-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header: Editorial Style */}
        <div className="mb-16">
          <span className="inline-block border border-slate-900 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Comparison Matrix // 2026
          </span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
            Stop collecting paper.<br />
            <span className="italic font-light text-slate-400">Start proving impact.</span>
          </h2>
        </div>

        {/* The Bento Table */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Main Comparison Block */}
          <div className="col-span-12 lg:col-span-9 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="grid grid-cols-12 border-b border-slate-100 bg-slate-100">
              <div className="col-span-6 p-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Structural Feature</div>
              <div className="col-span-3 p-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Legacy</div>
              <div className="col-span-3 p-8 text-[11px] font-black text-blue-600 uppercase tracking-widest text-center bg-blue-100">VFound.in</div>
            </div>

            {tableData.map((row, i) => (
              <div key={i} className="grid grid-cols-12 group transition-all hover:bg-slate-50">
                <div className="col-span-6 p-8 flex items-start gap-5 border-b border-slate-200">
                  <div className="mt-1 text-blue-600 opacity-40 group-hover:opacity-100 transition-opacity">
                    {row.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">{row.label}</h4>
                    <p className="text-xs text-slate-400 font-medium">{row.sub}</p>
                  </div>
                </div>
                
                <div className="col-span-3 p-8 border-l border-slate-50 border-b border-slate-50 flex flex-col items-center justify-center gap-2">
                  <X className="text-slate-300" size={18} />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{row.trad}</span>
                </div>

                <div className="col-span-3 p-8 border-l border-blue-100/50 bg-blue-50/10 border-b border-slate-50 flex flex-col items-center justify-center gap-2 relative">
                  <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-4 right-4 animate-pulse" />
                  <Check className="text-blue-600" size={20} strokeWidth={3} />
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-tighter text-center">{row.vfound}</span>
                </div>
              </div>
            ))}
            
            {/* Table Footer CTA */}
            <div className="p-8 bg-slate-950 flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-blue-500/50 group-hover:w-12 transition-all" />
                <span className="text-white font-bold tracking-tight">Ready to bridge the credibility gap?</span>
              </div>
              <a href="/internship/userdashboard" className="flex items-center gap-2 text-blue-400 font-bold text-sm" target='blank'>
                Apply for Now <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Side Stats Bento */}
          <div className="col-span-12 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
  {/* Card 1: Success Metric */}
  <div className="bg-blue-600 rounded-[2rem] p-8 text-white flex flex-col justify-between overflow-hidden relative group">
    <Trophy className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform" size={120} />
    <div>
      <h3 className="text-3xl font-black leading-tight tracking-tighter">92%</h3>
      <p className="text-blue-100 text-xs font-medium mt-2">
        Higher recruiter response rate compared to standard certificates.
      </p>
    </div>
    <div className="mt-6 flex items-center gap-2">
      <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white w-[92%]"></div>
      </div>
      <span className="text-[10px] font-bold">LIVE</span>
    </div>
  </div>

  {/* Card 2: Map & Reach */}
  <div className="bg-white rounded-[2rem] p-8 border border-slate-200 flex flex-col justify-between shadow-sm relative overflow-hidden group">

    <div className="relative z-10">
      <StatusPill variant="slate">Network</StatusPill>
      <h4 className="text-slate-900 font-bold mt-4 tracking-tight leading-tight">
        Pan-India <br/> Talent Cloud
      </h4>
      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
        Connecting verified developers from Bangalore to Delhi with top-tier product firms.
      </p>
    </div>

    <div className="mt-8 flex items-center justify-between relative z-10">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white overflow-hidden">
            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover grayscale" />
          </div>
        ))}
        <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
          +2k
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-black text-emerald-600">● ACTIVE</span>
      </div>
    </div>
  </div>

  {/* Card 3: Security/Trust */}
  <div className="bg-gray-200 rounded-[2rem] p-8 border border-slate-200/50 flex flex-col justify-between hover:bg-white transition-colors duration-500 group">
    <div>
      <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
        <ShieldCheck size={18} />
      </div>
      <h4 className="text-slate-900 font-bold tracking-tight">V-Audit™ Secure</h4>
      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
        Automated plagiarism detection & manual logic review for every commit.
      </p>
    </div>
    <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
      <span className="text-[10px] font-mono text-slate-400">ID: VF-SEC-2026</span>
      <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
    </div>
  </div>
</div>

        </div>

      </div>
    </section>
  );
}

const TechBadge = ({ children }) => (
  <span className="text-[10px] font-mono bg-slate-950 text-white px-3 py-1 rounded-full uppercase tracking-[0.2em]">
    {children}
  </span>
);