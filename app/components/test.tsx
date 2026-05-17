"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const stats = [
  { label: "Resumes Analysed", value: "740+", color: "text-amber-500" },
  { label: "Chrome Extension Users", value: "1.6K+", color: "text-emerald-500" },
  { label: "Internships Completed", value: "634+", color: "text-blue-500" },
  { label: "Active Developers", value: "8K+", color: "text-purple-500" },
];

const testimonials = [
  {
    quote: "The advanced resume analysis didn’t just rewrite my CV — it evaluated my technical depth and gave me a clear ATS score.",
    name: "Riya Kumari",
    role: "Software Engineer",
    company: "Walmart",
  },
  {
    quote: "The platform felt purpose-built for serious job seekers. I only received role-relevant insights and verified opportunities.",
    name: "Sanu Gupta",
    role: "Sr. Data Scientist",
    company: "Databricks",
  },
  {
    quote: "The two-step cover letter builder intelligently combined my resume with the job description. Very smart.",
    name: "Shambhavi Kiran",
    role: "Product Manager",
    company: "Google",
  },
  {
    quote: "Within minutes, I could clearly see where my resume was weak and which roles I was realistically qualified for.",
    name: "Arjun Mehta",
    role: "Full Stack Developer",
    company: "TCS",
  },
  {
    quote: "The resume scoring gave precise, actionable feedback based on real industry hiring parameters.",
    name: "Sneha Roy",
    role: "SDE Intern",
    company: "Microsoft",
  },
  {
    quote: "Only verified job listings matched to my profile. No fake posts — just accurate, high-quality opportunities.",
    name: "Karan Singh",
    role: "Cloud Engineer",
    company: "AWS",
  },
];

// Single clean vector background for all cards
const VECTOR_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-sm font-bold tracking-[0.2em] text-gray-600 uppercase mb-4 block"
        >
          Success Stories
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
          Loved by Developers Across India
        </h2>
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="relative flex items-center">
        <div className="flex overflow-hidden gap-8 py-10 select-none">
          <motion.div 
            className="flex gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 50,
              repeat: Infinity,
            }}
          >
            {/* Double the array for seamless looping */}
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>
        
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />
      </div>

      {/* ORIGINAL ANALYTICS CTA SECTION - Restored styling */}
      <div className="mt-24 bg-[#0d2440] py-16 sm:py-20 px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300">
            Trusted by 8,000+ Users
          </h3>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto opacity-80 font-light">
            Join thousands of Indian developers building stronger tech careers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-md p-8 text-center border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <div className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0d2440]">
                {stat.value}
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

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative flex-shrink-0 w-[350px] md:w-[400px] h-[280px] rounded-3xl overflow-hidden bg-white border border-zinc-100 shadow-sm"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] grayscale-50"
        style={{ backgroundImage: `url(${VECTOR_BG})`, backgroundSize: 'cover' }}
      />
      
      <div className="relative h-full p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{t.company}</span>
          </div>
          <p className="text-zinc-700 font-medium leading-relaxed italic">
            "{t.quote}"
          </p>
        </div>

        <div className="flex items-center gap-4 border-t border-zinc-50 pt-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center text-zinc-600 font-bold text-xs">
            {t.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">{t.name}</h4>
            <p className="text-[11px] text-zinc-500">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}