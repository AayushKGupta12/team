'use client';

import React from 'react';
import { Mail, MessageSquare, Code, Lightbulb, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
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
              <span className="block">Contact :</span>
              <span className="text-[#2e5e99]">Developer</span>
              <span className="block text-[#2e5e99]">Builder</span>
            </h1>

            {/* <p className="mt-8 text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
              We don’t just help developers find jobs.<br />
              <span className="font-semibold text-[#0d2440]">We help them become unstoppable.</span>
            </p> */}

            <div className="mt-10 flex gap-6">
              <a
                href="#contact"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Clean SaaS Aesthetic */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Top Header Block */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 rounded-md">
              <Users className="w-3.5 h-3.5" /> Collaboration & Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Let's build the future of intelligence & automations.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Tauzand is shifting from a standard job board to a comprehensive network driven by practical software engineering and smart systems. We welcome developers, founders, and AI enthusiasts to help us shape it.
            </p>
          </div>

          {/* 2x2 SaaS Feature Grid - Open Initiatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: AI & LLM Integrations */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg mb-4">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Talks & Engineering</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are actively developing contextual career graph tools, open prompt workflows, and AI evaluation modules. Let’s talk architecture, model tuning, or share engineering strategies.
              </p>
            </div>

            {/* Card 2: Strategic Collaborations */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-lg mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Partner & Build Together</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you are an open-source project leader, an industry mentor, or running a developer tool company, we provide early sandbox integrations to get talent building with your stack.
              </p>
            </div>

            {/* Card 3: Feedback & Suggestions */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Product Improvements</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Notice an optimization we can make? Found a flaw in how we analyze repositories? Our roadmaps are transparent, and your feature recommendations directly impact what we deploy next.
              </p>
            </div>

            {/* Card 4: Open Developer Network */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center bg-sky-50 text-sky-600 rounded-lg mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Community Ecosystem</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We host regular design partner sprints where early adopters test deep automation pipelines before public release. Join us as an early design voice.
              </p>
            </div>

          </div>

          {/* Clean, Modern SaaS Inbox CTA */}
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Have a proposal or feedback?</h3>
              <p className="text-sm text-slate-600 max-w-xl">
                Drop our system engineers a direct line. We review project submissions, open-source pull queries, and community integration proposals daily.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              <a
                href="mailto:aayushgupta120305@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                Contact Core Team
              </a>
              <div className="text-center sm:text-left px-1">
                <span className="block text-xs text-slate-400">Direct Desk</span>
                <span className="text-sm font-medium text-slate-700">aayushgupta120305@gmail.com</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400">
            Typical engineering response workflow occurs within <span className="font-medium text-slate-600">1–2 business days</span>.
          </p>

        </div>
      </section>
    </>
  );
}