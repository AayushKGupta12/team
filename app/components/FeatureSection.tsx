// components/FeatureSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Work in India's Top IT Companies",
    description:
      "Explore IT jobs across software engineering, data, AI, cloud, and cybersecurity. Updated daily with real hiring opportunities.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=90&fit=crop",
  },
  {
    title: "Improve Your Resume Performance",
    description:
      "Our AI Resume Analyzer checks your resume’s technical depth, ATS score, and industry match. Based on 32 parameter checks",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=90&fit=crop",
  },
  {
    title: "Built in Cover letter",
    description:
      "Well crafted industry standard and optimised cover letter based on your resume. Simply copy paste or download",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=90&fit=crop",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-32 lg:py-40 bg-white">
       <div className="max-w-4xl mx-auto text-center mb-15">
    <h2 className="text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-tight">
      Complete tool build for developers 
    </h2>
    <p className="mt-2 text-xl text-gray-600">
      A complete AI-powered career toolkit to help you get hired faster in India’s top companies.
    </p>
  </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {features.map((feature, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex flex-col lg:flex-row items-center gap-20 lg:gap-32 ${
              index !== features.length - 1 ? "mb-32 lg:mb-44" : ""
            } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Image — Museum-grade framing */}
            <div className="relative w-full lg:w-1/2">
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform"
                  priority={index <= 1}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={95}
                />
                {/* Subtle inner shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Text — Refined typography & spacing */}
            <div className="lg:w-1/2 max-w-2xl">
              <div className="space-y-8">
                {/* Optional number badge */}
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="text-sm font-medium tracking-wider uppercase">
                    0{index + 1}
                  </span>
                  <div className="h-px w-12 bg-gray-200" />
                </div>

                <h3 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 leading-tight tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed tracking-wide">
                  {feature.description}
                </p>

                {/* Ultra-minimal CTA */}
                <div className="pt-4">
                  <button className="group inline-flex items-center text-base font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300">
                    <span>Learn more</span>
                    <svg
                      className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}