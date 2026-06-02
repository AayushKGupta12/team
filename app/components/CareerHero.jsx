'use client';

import { Terminal, Megaphone, Briefcase } from 'lucide-react';

export default function CareersPage() {
  return (
    <>
      {/* HERO – "We Are Hiring" */}
      {/* HERO SECTION – Clean, Bold, Human */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#ffd77a]/50 py-24 md:py-32 lg:py-40 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              backgroundPosition: 'center top',
              maskImage: `radial-gradient(ellipse 110% 85% at 50% 0%, black 40%, transparent 90%)`,
              WebkitMaskImage: `radial-gradient(ellipse 110% 85% at 50% 0%, black 40%, transparent 90%)`,
              opacity: 0.45,
            }}
          />

          {/* Main Hero Content – Left-aligned, Punchy */}
          <div className="relative z-10 max-w-4xl mt-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
              <span className="block">We’re Hiring :</span>
              <span className="text-[#2e5e99]">Developer</span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
             Not just coders. Not just designers.
              <span className="font-semibold text-[#0d2440]">People who want to shape the future of how India builds software.</span>
            </p>

            <div className="mt-10 flex gap-6">
              <a
                href="#roles"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                About us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HIRING SECTIONS – Minimalistic, highly structured, and realistic */}
      <section id="roles" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Section Header */}
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0d2440] sm:text-5xl">
              Open Opportunities
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              We are expanding across core development, revenue growth networks, and product operations layers. Explore our roles and apply directly below.
            </p>
          </div>

          {/* ── PHASE 1: TECHNICAL HIRING ────────────────────────────────── */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">1. Technical Hiring</h3>
              </div>
              <a 
                href="https://docs.google.com/forms/d/1NAayAUW8HwLnbJhB8-bgvwg8Yd4iyBno-tPOfLSAtss/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 shadow-sm"
              >
                Apply for Technical Roles
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Web Developer</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Responsible for crafting pixel-perfect, highly responsive interfaces and connecting robust service schemas. You will work heavily on web performance frameworks.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Next.js · TypeScript · Tailwind</div>
              </div>

              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">AI / ML Developer</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Architect neural modeling tracks, parsing infrastructure pipelines, and highly optimized search vector systems to build intelligent data pipelines.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Python · PyTorch · Scikit-Learn · MLops</div>
              </div>

              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Generative AI Engineer</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Implement custom LLM prompting logic architectures, structured output evaluations, and state-of-the-art token scaling techniques for automation.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">LangChain · OpenAI APIs · Vector DBs</div>
              </div>

              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Product Analyst</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Evaluate real-world telemetry loops, monitor core tracking conversions, and analyze platform user metrics to determine feature roadmaps.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">SQL · Amplitude · Mixpanel · Product Strategy</div>
              </div>
            </div>
          </div>

          {/* ── PHASE 2: MARKETING & REVENUE HIRING ──────────────────────── */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">2. Marketing &amp; Growth</h3>
              </div>
              <a 
                href="https://docs.google.com/forms/d/1LeeppR7wz0GuUOs9l70GOW4deydQIvrptlCRF5lkVLM/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 shadow-sm"
              >
                Apply for Marketing Roles
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Sales &amp; Business Development</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Manage external client onboarding funnels, corporate inbound leads, and client account structures to scale programmatic service consumption pipelines.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">B2B Sales · Outbound CRM · Account Orchestration</div>
              </div>

              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Business Associate</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Coordinate market intelligence analysis, gather local enterprise requirements, and draft highly actionable commercial strategy outlines.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Market Intelligence · Strategy · Pitch Frameworks</div>
              </div>

              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Growth Marketing Lead</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Design, manage, and scale organic brand loops, direct inbound attribution funnels, and programmatic campaign placements across channels.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">SEO · Performance Analytics · Content Strategy</div>
              </div>
            </div>
          </div>

          {/* ── PHASE 3: ADMIN & OPERATIONS HIRING ────────────────────────── */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">3. Admin &amp; Operations</h3>
              </div>
              <a 
                href="https://docs.google.com/forms/d/1LeeppR7wz0GuUOs9l70GOW4deydQIvrptlCRF5lkVLM/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 shadow-sm"
              >
                Apply for Admin &amp; Ops Roles
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">HR Operations &amp; Talent Coordinator</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Maintain the internal technical evaluation lifecycle, coordinate technical screening timelines, and streamline our candidate interview processes.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">ATS Pipelines · Employee Engagement · Onboarding</div>
              </div>

              <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Executive Operations Specialist</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Organize platform resource allocations, run multi-department logistical support lines, and optimize administrative operational pipelines.
                </p>
                <div className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Resource Allocation · Workflow Optimization · Logistics</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}