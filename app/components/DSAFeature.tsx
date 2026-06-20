"use client";

import React from "react";
import { BookOpen, Layers3, Gauge } from "lucide-react";

const PROBLEMS = [
  {
  icon: BookOpen,
  tag: "Question Bank",
  title: "70+ Companies",
  body: "Practice 800+ interview questions collected from top companies, neatly organized for efficient preparation.",
  badges: ["Real Interview Questions", "Quick Practice"],
  },
  {
  icon: Layers3,
  tag: "Company Coverage",
  title: "Preparing for Amazon?",
  body: "Practice only Amazon's interview patterns instead of solving random DSA questions.",
  badges: ["Top Tech Companies", "Regularly Updated"],
  },
  {
  icon: Gauge,
  tag: "Difficulty Flow",
  title: "Topic-wise + 3 Levels",
  body: "Practice by topic and difficulty level (Easy, Medium, Hard) to gradually build strong problem-solving skills.",
  badges: ["Topic-wise", "3 Difficulty Levels"],
  },
  {
  icon: Gauge,
  tag: "Difficulty Flow",
  title: "Interview-Like Learning",
  body: "Questions are organized the way interviewers think.",
  badges: ["Interview Oriented", "University Students"],
  },
  {
  icon: Gauge,
  tag: "Difficulty Flow",
  title: "Built for Placements",
  body: "Every feature is designed around one goal: helping you clear coding interviews faster.",
  badges: ["Grab Fast", "On - Campus"],
  },
  {
  icon: Gauge,
  tag: "Difficulty Flow",
  title: "No More Random Practice",
  body: "85% of coding interviews repeat familiar patterns.",
  badges: ["Organised", "Less Question"],
  },
];

export default function ProblemSection() {
  return (
    <section className="w-full bg-white px-6 py-20 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <div className="mb-6 inline-block rounded-full border border-green-400 bg-green-200 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
            We Offer
          </div>
          <h2 className="text-4xl font-bold tracking-tighter leading-[0.95] text-slate-950 md:text-5xl">
            Everything you need <br />
            <span className="italic font-light text-slate-400">
              for top placements
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROBLEMS.map(({ icon:tag, title, body, badges }) => (
            <div
              key={title}
              className="flex flex-col rounded-3xl border border-slate-200 p-7 transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
            >

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
                    className="rounded-full bg-green-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
        </div>
        <div className="py-20 flex justify-center">
          <h2 className="max-w-6xl text-center text-2xl md:text-4xl font-serif">
            "We tell you exactly which questions matter for your 
            <span className="underline underline-offset-8 decoration-2 bg-yellow-100 px-1 py-0.5 rounded-sm ml-2">
               dream company
            </span>
            "
          </h2>
        </div>
      </div>
    </section>
  );
}