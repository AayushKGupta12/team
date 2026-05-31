'use client';

import React from 'react';

export default function HeroAndAbout() {
  return (
    <>
      {/* HERO SECTION – Clean, Bold, Human (STRICTLY UNCHANGED) */}
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
              <span className="block">About :</span>
              <span className="text-[#2e5e99]">Developer</span>
              <span className="block text-[#2e5e99]">Builder</span>
            </h1>

            {/* <p className="mt-8 text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
              We don’t just help developers find jobs.<br />
              <span className="font-semibold text-[#0d2440]">We help them become unstoppable.</span>
            </p> */}

            <div className="mt-10 flex gap-6">
              <a
                href="#about"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                About us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION – Strict SaaS Minimalist (White Background & Rounded-md UI) */}
      <section id="about" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Who We Are & Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-md">
                Our Story
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Building India's career intelligence network.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-slate-600 text-base leading-relaxed">
              <p>
                Most job platforms treat software engineers like interchangeable items on a database list. We see you as a core developer with specific talents, practical architecture skills, and scaling potential. Founded by <span className="text-slate-900 font-semibold underline decoration-indigo-400 decoration-2 underline-offset-4">Aayush Gupta</span>, Developer Builder balances the line between personal skill metrics and direct industry placement.
              </p>
              <p>
                We use internal automated evaluation pathways to deeply unpack code structures, highlight contextual gaps, map personalized progression roadmaps, and connect developers straight to engineering teams looking for precise talent stacks.
              </p>
            </div>
          </div>

          {/* Mission Block - Clean SaaS Banner Accent */}
          <div className="p-8 bg-slate-50 border border-slate-200/60 rounded-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase block">The Core Mission</span>
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
                One click <span className="text-indigo-600">→</span> direct validation by high-impact tech teams who respect raw engineering skill.
              </p>
              <p className="text-sm text-slate-500 max-w-xl">
                Eliminating structural pipeline noise, recruitment spam, and black-box resume ghosting through open and responsive automation loops.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Ecosystem Principles</h3>
              <p className="text-sm text-slate-500">The functional guidelines behind our architecture and network operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  title: "Radical Honesty", 
                  desc: "Clear telemetry metrics on your code profiles. Absolute objectivity regarding engineering gaps helps you iterate faster.",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                { 
                  title: "Real Growth", 
                  desc: "Contextual engineering milestones and sandbox workflows explicitly targeted at stepping up from junior to senior code paradigms.",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z"
                },
                { 
                  title: "Zero BS Infrastructure", 
                  desc: "Verified profiles interact exclusively with tech systems actively looking to hire. No phantom postings or automated ghost layers.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                },
                { 
                  title: "Community Driven", 
                  desc: "Our platform blueprints are developed in tight, transparent collaboration loops alongside thousands of active open-source engineers.",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                }
              ].map((value) => (
                <div key={value.title} className="p-5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors shadow-sm flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-50 text-slate-600 rounded-md flex items-center justify-center border border-slate-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900">{value.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact SaaS CTA Block */}
          <div className="p-6 bg-slate-950 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-base font-semibold">Ready to switch to a transparent tech career loop?</h4>
              <p className="text-xs text-slate-400">Upgrade how your code profile reaches key organizations.</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
              <a
                href="mailto:support@Tauzand.in"
                className="inline-flex items-center justify-center text-center px-4 py-2 bg-white text-slate-950 text-xs font-medium rounded-md hover:bg-slate-100 transition-colors shadow-sm"
              >
                Let's Talk
              </a>
              <div className="text-left hidden xs:block border-l border-slate-800 pl-4">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Engineering SLA</span>
                <span className="text-xs font-medium text-slate-300">Under 24h response</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}