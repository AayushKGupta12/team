'use client';
import React, { useState } from 'react';
import { FileWarning, Ban, UserX, Zap, ShieldAlert, XCircle } from 'lucide-react';

// Common visual element components
const TechBadge = ({ children, color = "slate" }) => {
  const colors = {
    slate: "bg-slate-100 text-slate-500 border-slate-200/50",
    red: "bg-red-100 text-red-600 border-red-200/50"
  };
  return (
    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${colors[color]}`}>
      {children}
    </span>
  );
};

export default function InternshipLanding() {
  const [selectedTask, setSelectedTask] = useState('auth');
  const tasks = {
    auth: { lang: 'JS', code: 'if (user.status !== "verified") throw AuthError();' },
    db: { lang: 'PY', code: 'db.connect(retry=3, timeout=5000);' },
    api: { lang: 'GO', code: 'resp, err := client.Do(req)' },
  };

  return (
    <div className="w-full font-sans antialiased">
      
      {/* SECTION 1: THE PROBLEM (Soft Red Differentiation) */}
      <section className="bg-rose-50/50 py-24 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tighter leading-[1.1]">
              Why The internship market is <br />
              <span className="text-red-600">fundamentally broken ? </span>
            </h2>
            <p className="mt-6 text-slate-500 font-medium">
              Certificates have become "vanity metrics" that hiring managers now actively ignore.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Problem 1: No Real Work */}
            <div className="col-span-12 md:col-span-4 bg-white rounded-3xl p-8 border border-red-100 shadow-sm group hover:border-red-300 transition-colors">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 border border-red-100">
                <Ban size={24} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3">Ghost Participation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Most programs don't require code commits or logic. Students "complete" internships without ever touching a production-grade codebase.
              </p>
              <div className="mt-6 flex gap-2">
                <TechBadge color="red">0% Code Review</TechBadge>
                <TechBadge color="red">Pay & Get</TechBadge>
                <TechBadge color="red">Theory Only</TechBadge>
              </div>
            </div>

            {/* Problem 2: Easy Certificates (The "Value Drop") */}
            <div className="col-span-12 md:col-span-4 bg-white rounded-3xl p-8 border border-red-100 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              <div>
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 border border-red-100">
                  <FileWarning size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">Credential Inflation</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  When certificates are generated via "Watch-to-Earn" videos, their market value drops to zero. Recruiters see right through the PDF.
                </p>
              </div>
              {/* Visual: Fading Certificate Mockup */}
              <div className="mt-8 opacity-40 group-hover:opacity-100 transition-opacity">
                 <div className="h-1 w-full bg-red-100 rounded-full mb-1"></div>
                 <div className="h-1 w-2/3 bg-red-50 rounded-full"></div>
              </div>
            </div>

            {/* Problem 3: Recruiter Trust */}
            <div className="col-span-12 md:col-span-4 bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
                  <UserX size={24} />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3 text-white">The Trust Deficit</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Hiring managers spend only 6 seconds on a resume. If they don't see <span className="text-red-400 italic">verified proof</span>, you are filtered out immediately.
                </p>
              </div>
              <div className="mt-6 p-3 bg-red-300 rounded-xl border border-red-500/10">
                <p className="text-[10px] font-mono text-black">ERROR: SKILLS_NOT_VERIFIED</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}