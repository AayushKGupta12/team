'use client';

import React from 'react';
import { Check, X, ShieldCheck, Trophy, ArrowUpRight, BrainCircuit, Target, Repeat, Timer, Code2 } from 'lucide-react';

const testimonials = [
  {
    quote: "Tauzand's DSA course completely changed how I approach problems. The pattern-first method helped me solve questions faster and with better understanding.",
    name: "Ishita Kapoor",
    role: "Placed at TCS Digital",
    batch: "KIIT'26",
    projectUrl: "https://www.tauzand.in/certificate/VF2026DO00001"
  },
  {
    quote: "I used to forget concepts quickly. But Tauzand’s structured approach helped me remember patterns long-term. It made DSA much easier.",
    name: "Arjun Mehta",
    role: "Placed at Adobe",
    batch: "SRM'25",
    projectUrl: "https://www.tauzand.in/certificate/VF2025SD00001"
  },
  {
    quote: "Instead of memorizing solutions, I now understand the logic behind every problem. My interview performance improved significantly in just two months.",
    name: "Priya Patel",
    role: "Placed at Accenture",
    batch: "VIT'26",
    projectUrl: "https://www.tauzand.in/certificate/VF2026SD00002"
  },
  {
    quote: "The mentor feedback was very detailed. It helped me write cleaner and more optimized code. This program gave me real confidence.",
    name: "Rahul Sharma",
    role: "Placed at TCS Digital",
    batch: "BITS Pilani'26",
    projectUrl: "https://www.tauzand.in/certificate/VF2025BJ00001"
  },
];

export default function InfiniteScrollingTestimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#0d1626] overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 140s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full">

        {/* Clear Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
            Student Stories
          </h2>
          <p className="text-slate-400 text-lg">How Tauzand helped them crack interviews</p>
        </div>

        {/* Marquee */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d1626] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0d1626] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-8 flex">
            {duplicatedTestimonials.map((t, i) => (
              <div 
                key={i} 
                className="w-[450px] flex flex-col bg-[#142033] border border-slate-800 p-8 rounded-2xl transition-all hover:border-blue-900/50 hover:bg-[#1a2942]"
              >
                <p className="text-slate-300 leading-relaxed text-[15px] mb-8">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                      <p className="text-[12px] text-slate-300">{t.role} • {t.batch}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-16 flex justify-center items-center gap-3 px-6">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d1626] bg-slate-700 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400">
            Trusted by <span className="text-white font-medium">thousand's</span> students
          </p>
        </div>

      </div>
    </section>
  );
}