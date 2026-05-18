'use client';
import React, { useState } from 'react';

// Common visual element components
const TechBadge = ({ children }) => (
  <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200/50">
    {children}
  </span>
);

export default function InternshipFeatures() {
  // ① Interactive State for Task Selection
  const [selectedTask, setSelectedTask] = useState('auth');
  const tasks = {
    auth: { lang: 'JS', code: 'if (user.status !== "verified") throw AuthError();' },
    db: { lang: 'PY', code: 'db.connect(retry=3, timeout=5000);' },
    api: { lang: 'GO', code: 'resp, err := client.Do(req)' },
  };

  return (
    <section className="w-full bg-slate-50 py-24 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header - Centered & Premium SaaS */}
        <div className="mb-16">
          <div className="inline-block border border-slate-900 bg-pink-200 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            We offer
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-[0.95]">
            Real Engineeing Projects<br />
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">

          {/* ① Task Evaluation (Large - Now Interactive) */}
          <div className="col-span-12 md:col-span-8 bg-white rounded-3xl p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-8.062 3.42 3.42 0 014.438-4.438 3.42 3.42 0 008.062-1.946 3.42 3.42 0 014.438 4.438 3.42 3.42 0 001.946 8.062 3.42 3.42 0 01-4.438 4.438 3.42 3.42 0 00-8.062 1.946 3.42 3.42 0 01-4.438-4.438z" /></svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">Real Project Evaluation</h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed mb-6">Every project is evaluated against actual industry standards using automated testing and expert mentor review.</p></div>
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                {Object.keys(tasks).map(taskKey => (
                  <button key={taskKey} onClick={() => setSelectedTask(taskKey)} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedTask === taskKey ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                    {taskKey.toUpperCase()} Modules
                  </button>
                ))}
              </div>
            </div>
            {/* Visual: Code Snippet */}
            <div className="w-full md:w-64 bg-slate-950 rounded-2xl p-5 font-mono text-[11px] relative overflow-hidden shadow-inner">
              <div className="absolute top-3 right-3 flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <span className="text-slate-500 block mb-3">// review_service.log</span>
              <div className="text-slate-400">
                <span className="text-emerald-400">STATUS:</span> RUNNING...<br />
                <span className="text-blue-400">TASK_ID:</span> EVAL-09823<br />
                <span className="text-purple-400">LANG:</span> {tasks[selectedTask].lang}<br /><br />
                <span className="text-white bg-slate-800 px-1 py-0.5 rounded">{tasks[selectedTask].code}</span><br /><br />
                <span className="text-slate-500"> Project Evaluated... [OK]</span><br />
                <span className="text-slate-500"> Mentor Verified... [OK]</span>
              </div>
            </div>
          </div>

          {/* ② QR Verification (Interactive: Scanning Line) */}
          <div className="col-span-12 md:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between group">
            <div>
              <h3 className="text-lg font-bold mb-2">Public Verification</h3>
<p className="text-sm text-slate-600 leading-relaxed">Every certificate includes a public verification link and QR code so recruiters can instantly validate your work.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-6 relative overflow-hidden">
              {/* Interactive Scanning Line */}
              <div className="absolute inset-x-0 h-0.5 bg-blue-400/50 blur-[1px] group-hover:animate-scan" style={{ top: '-10%' }}></div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 rounded-xl p-2.5 flex-shrink-0 grid grid-cols-2 gap-0.5 opacity-80">
                    <div className="bg-white rounded-sm"></div><div className="bg-white/30 rounded-sm"></div>
                    <div className="bg-white/30 rounded-sm"></div><div className="bg-white rounded-sm"></div>
                </div>
                <div className="flex-1">
                  <TechBadge>VF2026DO***61</TechBadge>
                  <div className="space-y-2 mt-2">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[30%] group-hover:w-full transition-[width] duration-500"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[45%] group-hover:w-full transition-[width] duration-500"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 w-[38%] group-hover:w-full transition-[width] duration-500"></div>
                    </div>
                    </div>

                  <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-wider">Valid & Secured</p>
                </div>
              </div>
            </div>
          </div>

          {/* ③ iATS Resume (Interactive: Progress Loader) */}
          <div className="col-span-12 md:col-span-4 bg-slate-950 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-colors"></div>
            <div>
              <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-2">Mentors from Top Companies</p>
<h3 className="text-lg font-bold text-white mb-2">Expert Human Review</h3>
<p className="text-sm text-slate-400 leading-relaxed">All projects are manually reviewed by experienced industry mentors from reputed tech companies.</p>
            </div>
            {/* Visual: Resume Loading */}
            <div className="mt-8 space-y-2.5 relative z-10">
                <div className="h-4 bg-slate-800 rounded flex items-center px-2">
                    <div className="h-1.5 bg-blue-500 rounded group-hover:w-[90%] w-[60%] transition-[width] duration-1000"></div>
                </div>
                <div className="h-4 bg-slate-800 rounded flex items-center px-2">
                    <div className="h-1.5 bg-slate-600 rounded group-hover:w-[75%] w-[40%] transition-[width] duration-1000 delay-100"></div>
                </div>
            </div>
          </div>

          {/* ④ Flexible Tracks (Static, but refined visuals) */}
          {/* ④ Flexible Tracks (Static, but refined visuals) */}
<div className="col-span-12 md:col-span-3 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
  <div className="flex gap-2.5 mb-6">
    {["30 Days", "45 Days", "60 Days"].map((d, i) => (
      <div
        key={d}
        className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
          i === 1
            ? "bg-slate-900 text-white border-slate-900"
            : "bg-slate-50 text-slate-500 border-slate-100"
        }`}
      >
        {i === 1 && (
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
        )}
        {d} Plan
      </div>
    ))}
  </div>
  <div>
   <h3 className="text-lg font-bold mb-1 tracking-tight">Flexible Duration</h3>
<p className="text-sm text-slate-600 leading-relaxed">
  Choose a timeline that fits your schedule.
</p>
  </div>
</div>


          {/* ⑤ Career OS Callout (CTA) */}
          <div className="col-span-12 md:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-blue-50 rounded-2xl">
  <div className="w-10 h-10 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center animate-ping">
    <svg
      className="w-7 h-7 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  </div>
</div>


            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold mb-1.5 tracking-tight">Your Career Dashboard</h3>
<p className="text-sm text-slate-600 mb-4">Manage all your verified projects, certificates, and profile in one place.</p>
              <a href="/internship/userdashboard" className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                Open Dashboard →
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Tailwind animation extension (add to your tailwind.config.js) */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
}