"use client";

import { Ban, FileWarning, UserX } from "lucide-react";

const PROBLEMS = [
  {
    icon: Ban,
    tag: "No Real Work",
    title: "Ghost Participation",
    body: "Most programs hand out certificates after video completions or quizzes. Students finish without writing a single line of production-grade code.",
    badges: ["Theory Only", "Pay & Get"],
  },
  {
    icon: FileWarning,
    tag: "Value Drop",
    title: "Credential Inflation",
    body: "When certificates are generated automatically, their market value drops to zero. A PDF without proof of work is ignored instantly.",
    badges: ["Auto-generated", "No Proof"],
  },
  {
    icon: UserX,
    tag: "Hiring Reality",
    title: "The Trust Deficit",
    body: "Hiring managers look for verifiable outcomes. Without a public verification link, your certificate is filtered out before the first round.",
    badges: ["Unverifiable", "No Outcome"],
  },
];

export default function ProblemSection() {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Editorial Style */}
        <div className="mb-16">
          <div className="inline-block border border-slate-900 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            The Problem
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-[0.9]">
            Why most certificates <br />
            <span className="italic font-light text-slate-400">fail you.</span>
          </h2>
        </div>

        {/* Problem Cards - Updated to Rounded-3xl Surface Style */}
        <div className="grid md:grid-cols-3 gap-8">
          {PROBLEMS.map(({ icon: Icon, tag, title, body, badges }) => (
            <div
              key={title}
              className="border border-slate-200 rounded-3xl p-8 hover:border-slate-900 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8">
                <Icon size={24} />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
                {tag}
              </span>

              <h3 className="text-xl font-bold mb-4 tracking-tighter">{title}</h3>

              <p className="text-slate-600 leading-relaxed text-sm mb-8 flex-grow">
                {body}
              </p>

              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-bold bg-slate-50 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-sm font-bold text-slate-900">
            VFound solves this: <span className="text-slate-500">Proof before the certificate.</span>
          </p>
        </div>
      </div>
    </section>
  );
}