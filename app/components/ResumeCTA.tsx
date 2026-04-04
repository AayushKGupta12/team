"use client";

import { useState, useEffect } from "react";
import { User, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "vfound identified gaps in my stack, ranked my experience with AI parsing, and recommended roles where my percentile score was highest. The technical evaluation made my strengths obvious to recruiters.",
    author: "Kunal Sahu",
    title: "Solutions Engineer",
  },
  {
    quote:
      "The precision of the AI analysis helped me align my project contributions with industry-specific keywords. I saw a significant increase in recruiter profile views within a week of updating.",
    author: "Ishita Verma",
    title: "Software Engineer",
  }
];

export default function ResumeCTAHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="bg-white border-y border-slate-200 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 py-12 md:py-20 lg:px-10">
        
        {/* Top Feature: Logic Insight - Mobile Optimized */}
        <div className="mb-12 md:mb-20">
          <div className="relative group overflow-hidden rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-green-200 to-blue-200 p-8 md:p-12 border border-white/50 shadow-sm">
            <Quote className="absolute -right-2 -top-2 h-24 w-24 text-black/5 opacity-10 transition-transform group-hover:scale-110 md:h-32 md:w-32" />
            
            <div className="relative z-10 max-w-2xl">
              <h4 className="mb-6 text-xl font-semibold leading-snug text-slate-900 md:text-2xl">
                "Our technology identifies the invisible gaps that cause ATS rejection, specifically for Indian freshers entering the IT landscape."
              </h4>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">VF</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">VFound.in Engineering</p>
                  <p className="text-xs text-slate-500">Core R&D</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero & Testimonial Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Side: Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Resumes that get calls <br className="hidden md:block" /> 
                are <span className="text-amber-500">evaluated</span>, not just polished.
              </h1>
              <p className="mx-auto text-base text-slate-500 leading-relaxed sm:text-lg md:max-w-lg lg:mx-0">
                Utilize our proprietary evaluation engine to understand how 
                algorithms rank your profile and bridge the gap to your next role.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="/ai-resume-analysis#id1"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500 bg-amber-400 px-8 py-4 font-medium text-black transition-all hover:bg-amber-500 active:scale-95 shadow-sm"
              >
                Analyze Resume
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Side: Animated Testimonial Card */}
          <div className="relative px-2">
            {/* Background Decorative Frame */}
            <div className="absolute inset-0 -rotate-1 scale-105 rounded-2xl bg-slate-100 md:block" />
            
            <div className="relative flex min-h-[300px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/50">
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">{current.author}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{current.title}</p>
                  </div>
                </div>

                <blockquote className="text-lg leading-relaxed text-slate-600 italic font-light">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </div>

              {/* Progress Indicators */}
              <div className="mt-8 flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      idx === currentIndex ? "w-10 bg-amber-400" : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}