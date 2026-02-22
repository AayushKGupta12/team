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

  <h2 className="text-center text-4xl sm:text-5xl font-semibold text-[#0d2440] mb-12">
    What Our Community Says
  </h2>

  <div className="relative">
    {showLeft && (
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 
                   bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200/70 
                   hover:bg-white transition-colors duration-200"
        aria-label="Scroll testimonials left"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>
    )}

    {showRight && (
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 
                   bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200/70 
                   hover:bg-white transition-colors duration-200"
        aria-label="Scroll testimonials right"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>
    )}

    <div
      ref={scrollRef}
      className="flex gap-6 sm:gap-8 py-10 px-4 sm:px-5 overflow-x-auto no-scrollbar scroll-smooth pb-16 sm:pb-20 snap-x snap-mandatory"
    >
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="relative flex-shrink-0 w-[340px] sm:w-[360px] h-[360px] sm:h-[380px] 
                     snap-center rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                     transition-shadow duration-300"
        >
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${images[i]})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/60 to-black/60" />

          {/* Content */}
          <div className="relative z-10 h-full p-7 sm:p-8 flex flex-col justify-between text-white">
            {/* Company */}
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wide text-amber-300">
              {t.company}
            </div>

            {/* Quote */}
            <p className="text-base sm:text-lg leading-relaxed font-light mt-4 line-clamp-6">
              {t.quote}
            </p>

            {/* Name & Role */}
            <div className="border-t border-white/30 pt-4 mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="opacity-90">{t.role}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>
      {/* ANALYTICS CTA SECTION */}

<div className="mt-5 bg-[#0d2440] py-16 sm:py-20 px-6 lg:px-8">
  <div className="text-center mb-12 sm:mb-16">
    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300">
      Trusted by 18,000+ IT professionals
    </h3>
    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
      Join thousands building better careers through our community
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className={`
          bg-white rounded-md p-8 text-center
          border border-gray-200 shadow-sm
          hover:shadow-md hover:border-gray-300
          transition-all duration-200
        `}
      >
        <div className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0d2440]">
          {/* Replace this with your CountUpNumber component or logic */}
          {stat.value}+
        </div>
        <p className="mt-3 text-lg font-medium text-[#0d2440]">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</div>

    </section>
  );
}
