"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Resume Analysed", value: 740, color: "bg-amber-400" },
  { label: "Jobs Applied", value: 3600, color: "bg-green-400" },
  { label: "Resumes Shortlisted", value: 3276, color: "bg-blue-400" },
  { label: "Interview Calls", value: 2293, color: "bg-purple-400" },
];

const testimonials = [
  {
    quote:
      "The advanced resume analysis didn’t just rewrite my CV. It evaluated my technical depth, ATS score, and mapped me to the exact roles I should target.",
    name: "Riya Kumari",
    role: "Software Engineer",
    company: "Walmart",
  },
  {
    quote:
      "The application process felt purpose built for job seekers. Only role relevant insights and verified opportunities tailored to my profile.",
    name: "Sanu Gupta",
    role: "Sr Data Scientist",
    company: "Databricks",
  },
  {
    quote:
      "The two step cover letter builder used my resume data and the job description together. It understood hiring logic.",
    name: "Shambhavi Kiran",
    role: "Product Manager",
    company: "Google",
  },
  {
    quote:
      "Within minutes, I knew where my resume was weak and which jobs I realistically matched.",
    name: "Arjun Mehta",
    role: "Full Stack Developer",
    company: "TCS",
  },
  {
    quote:
      "Resume scoring gave precise, actionable feedback based on real hiring parameters.",
    name: "Sneha Roy",
    role: "SDE Intern",
    company: "Microsoft",
  },
  {
    quote:
      "Only verified job listings matched to my resume. No fake posts, just accurate opportunities.",
    name: "Karan Singh",
    role: "Cloud Engineer",
    company: "AWS",
  },
];

const images = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-5xl font-light text-[#0d2440] mb-10">
          What Our Community Says
        </h2>

        <div className="relative">
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-1 top-8/9 -translate-y-1/2 z-20 bg-amber-200 backdrop-blur-md p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>
          )}

          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-1 top-8/9 -translate-y-1/2 z-20 bg-amber-200 backdrop-blur-md p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-8 py-10 px-5 overflow-x-auto no-scrollbar scroll-smooth pb-20"
          >
            {testimonials.map((t, i) => {
              const isMiddle = i === Math.floor(testimonials.length / 2);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.08, delay: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-shrink-0 w-[350px] h-[350px] snap-center rounded-md overflow-hidden cursor-pointer transition-all duration-100">
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center 
                              grayscale-25
                              group-hover:scale-105
                              transition-all duration-100 ease-out"
                    style={{ backgroundImage: `url(${images[i]})` }}
                  />

                  <div className="absolute inset-0 bg-black/70" />

                  {/* Content */}
                  <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">
                    {/* Company */}
                    <div className="text-sm tracking font-extrabold uppercase text-amber-400">
                      {t.company}
                    </div>

                    {/* Quote */}
                    <p className="text-lg leading-relaxed font-light">
                      {t.quote}
                    </p>

                    {/* Name & Role */}
                    <div className="border-t border-white/40 pt-4 flex justify-between text-sm">
                      <span className="font-semibold">{t.name}</span>
                      <span className="">{t.role}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </div>
      {/* ANALYTICS CTA SECTION */}
        <div className="mt-5 bg-[#0d2440] py-20 px-10">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-semibold text-white">
              Community of 18000+ IT Graduates
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`${stat.color} p-6 text-center`}
              >
                <div className="text-6xl text-[#0d2440] font-light">
                  {stat.value}+
                </div>
                <p className="mt-4 text-xl font-medium text-gray-900">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

    </section>
  );
}
