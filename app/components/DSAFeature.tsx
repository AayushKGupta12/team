"use client";

import React from "react";
import { BookOpen, Layers3, Gauge } from "lucide-react";

const PROBLEMS = [
  {
    icon: BookOpen,
    tag: "Question Bank",
    title: "800+ PYQs",
    body: "Explore a focused set of DSA questions collected from real company interviews and organized for fast practice.",
    badges: ["Interview Based", "Practice Fast"],
  },
  {
    icon: Layers3,
    tag: "Company Coverage",
    title: "70+ Companies",
    body: "Prepare company-wise with a clean list of hiring brands, so you can jump directly to the path you need.",
    badges: ["Top IT Firms", "Growing List"],
  },
  {
    icon: Gauge,
    tag: "Difficulty Flow",
    title: "Topic Wise + 3 Levels",
    body: "Filter by topic and practice in easy, medium, and hard levels to build confidence step by step.",
    badges: ["Topic Wise", "Easy / Medium / Hard"],
  },
];

export default function ProblemSection() {
  return (
    <section className="w-full bg-white px-6 py-20 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <div className="mb-6 inline-block rounded-full border border-slate-900 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
            DSA Feature
          </div>
          <h2 className="text-4xl font-bold tracking-tighter leading-[0.95] text-slate-950 md:text-5xl">
            Everything you need <br />
            <span className="italic font-light text-slate-400">
              for company prep.
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, tag, title, body, badges }) => (
            <div
              key={title}
              className="flex flex-col rounded-3xl border border-slate-200 p-7 transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-900">
                <Icon size={22} />
              </div>

              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {tag}
              </span>

              <h3 className="mb-4 text-xl font-bold tracking-tighter text-slate-950">
                {title}
              </h3>

              <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-600">
                {body}
              </p>

              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-bold text-slate-900">
            Built for focus:{" "}
            <span className="text-slate-500">
              company-wise practice, topic-wise sorting, and level-based prep.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}