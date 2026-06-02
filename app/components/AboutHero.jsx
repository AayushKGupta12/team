'use client';

import React from 'react';
import {Shield, Award, Sparkles,Terminal } from 'lucide-react';

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

      {/* ABOUT SECTION – Strict SaaS Minimalist (White Background & Bold Border UI) */}
      <section id="about" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Corporate Framework Title & Subtitle */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
              We built the platform we wished existed.
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-normal max-w-2xl mx-auto">
              Tauzand is an AI-Based Career Platform as a Service. Registered in <span className="font-semibold text-slate-900">Startup India</span> and operated under UDYAM software status <span className="font-mono font-semibold text-slate-900">(UDYAM-BR-26-0222297)</span> as an India-based software and AI enterprise since March 2026.
            </p>
          </div>

          {/* Who We Are & Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            <div className="lg:col-span-4 space-y-3">
              <div className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-md border border-slate-200">
                Our Foundation
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Building India's career intelligence network.
              </h3>
            </div>
            <div className="lg:col-span-8 space-y-6 text-slate-500 text-base leading-relaxed">
              <p>
                Most job platforms treat software engineers like interchangeable items on a database list. We see you as a core developer with specific talents, practical architecture skills, and scaling potential. Founded by <span className="text-slate-900 font-semibold underline decoration-blue-500 decoration-2 underline-offset-4">Aayush K. Gupta</span>, Tauzand balances the line between personal skill metrics and direct industry placement.
              </p>
              <p>
                We use internal automated evaluation pathways to deeply unpack code structures, highlight contextual gaps, map personalized progression roadmaps, and connect developers straight to engineering teams looking for precise talent stacks.
              </p>
            </div>
          </div>

          {/* Mission & Story Dual Card Grid (Styled matching reference) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Card */}
            <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
              <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-3">Our mission</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Software solutions designed to optimize operations and drive measurable career growth. Tauzand delivers innovative software and AI tools built explicitly to balance validation channels for students and developers who live on IT engineering paths.
              </p>
            </div>

            {/* Story Card */}
            <div className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
              <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-3">Our story</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                We kept watching IT undergraduates glue together a CV, a resume, an internship tracker, and half a dozen AI tools—then spend weeks reconciling data between systems. So we built one platform with all of it, operated by our team as an Indian engineering organization for gaining direct career velocity.
              </p>
            </div>
          </div>

          {/* Ecosystem Principles Section */}
          <div className="space-y-8 pt-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Ecosystem Principles</h3>
              <p className="text-sm text-slate-500">The functional guidelines behind our architecture and network operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: "Radical Honesty", 
                  desc: "Clear telemetry metrics on your code profiles. Absolute objectivity regarding engineering gaps helps you iterate faster.",
                  icon: Shield
                },
                { 
                  title: "Real Growth", 
                  desc: "Contextual engineering milestones and sandbox workflows explicitly targeted at stepping up from junior to senior code paradigms.",
                  icon: Terminal
                },
                { 
                  title: "Zero BS Infrastructure", 
                  desc: "Verified profiles interact exclusively with tech systems actively looking to hire. No phantom postings or automated ghost layers.",
                  icon: Award
                },
                { 
                  title: "Community Driven", 
                  desc: "Our platform blueprints are developed in tight, transparent collaboration loops alongside thousands of active open-source engineers.",
                  icon: Sparkles
                }
              ].map((value) => {
                const IconComponent = value.icon;
                return (
                  <div key={value.title} className="border-2 border-slate-200 bg-white rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center border border-slate-200">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 tracking-tight">{value.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-normal">{value.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compact SaaS CTA Block */}
          <div className="p-8 bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md hover:shadow-xl transition-shadow duration-200">
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-lg font-bold tracking-tight">Ready to switch to a transparent tech career loop?</h4>
              <p className="text-xs text-slate-400">Upgrade how your code profile reaches key organizations.</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
              <a
                href="mailto:support@Tauzand.in"
                className="inline-flex items-center justify-center text-center px-5 py-2.5 bg-white text-slate-950 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
              >
                Let's Talk
              </a>
              <div className="text-left hidden xs:block border-l border-slate-800 pl-4">
                <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-bold">Engineering SLA</span>
                <span className="text-xs font-medium text-slate-300">Under 24h response</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}