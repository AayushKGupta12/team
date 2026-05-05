"use client";

import { useState, useEffect } from "react";
import { User, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The AI evaluation provided a level of detail I hadn't seen elsewhere. It pinpointed specific technical gaps in my projects that, once fixed, doubled my callback rate.",
    author: "Siddharth Verma",
    role: "Full Stack Developer",
    company: "TechFlow Systems",
    color: "bg-blue-200",
  },
  {
    id: 2,
    quote:
      "A game-changer for campus placements. The percentile ranking helped me understand exactly where I stood compared to thousands of other applicants in the IT sector.",
    author: "Ananya Iyer",
    role: "SDE Intern",
    company: "Global Solutions",
    color: "bg-amber-200",
  },
  {
    id: 3,
    quote:
      "The technical evaluation made my strengths obvious to recruiters. It’s a data-backed roadmap for anyone serious about their next career move.",
    author: "Rohan Das",
    role: "Backend Engineer",
    company: "Nexus AI",
    color: "bg-emerald-200",
  },
  {
    id: 4,
    quote:
      "The precision of the AI analysis helped me align my project contributions with industry-specific keywords. I saw a significant increase in recruiter views.",
    author: "Ishita Verma",
    role: "Software Engineer",
    company: "Tauzand",
    color: "bg-rose-200",
  },
];

export default function ModernTestimonial() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextStep, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-12 md:py-24 px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
              Evaluated by Algo's. <br />
              <span className="text-slate-400">Trusted by professionals.</span>
            </p>
          </div>
          
          {/* Desktop Controls (Hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={prevStep}
              className="p-3 rounded-xl border border-gray-500 bg-white hover:bg-gray-200 transition-all active:scale-90 shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <button
              onClick={nextStep}
              className="p-3 rounded-xl border border-gray-500 bg-white hover:bg-gray-200 transition-all active:scale-90 shadow-sm"
              aria-label="Next"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl md:rounded-[40px] overflow-hidden border border-slate-100 shadow-xl md:shadow-2xl shadow-slate-200/40 ${testimonials[index].color} transition-colors duration-700`}
            >
              {/* Top/Left Decoration Area */}
              <div className="lg:col-span-1 bg-white/40 flex items-center justify-center p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/60">
                <Quote size={32} className="text-slate-300 md:w-10 md:h-10" />
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-11 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between min-h-[350px] md:min-h-[400px]">
                <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-800 leading-[1.4] font-medium tracking-tight">
                  &ldquo;{testimonials[index].quote}&rdquo;
                </blockquote>

                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:gap-8">
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                      <User className="text-slate-400 w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg md:text-xl">
                        {testimonials[index].author}
                      </h4>
                      <p className="text-[10px] md:text-sm text-slate-500 font-semibold uppercase tracking-wider">
                        {testimonials[index].role} <span className="mx-1 text-slate-300">|</span> {testimonials[index].company}
                      </p>
                    </div>
                  </div>

                  {/* Indicators & Mobile Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    {/* Progress Dots */}
                    <div className="flex gap-1.5 md:gap-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIndex(i)}
                          className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                            i === index ? "w-8 md:w-12 bg-slate-900" : "w-2 md:w-3 bg-slate-300 hover:bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Mobile Only Arrows */}
                    <div className="flex sm:hidden gap-2">
                       <button onClick={prevStep} className="p-2 bg-white/50 rounded-lg border border-white/60"><ChevronLeft size={16}/></button>
                       <button onClick={nextStep} className="p-2 bg-white/50 rounded-lg border border-white/60"><ChevronRight size={16}/></button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}