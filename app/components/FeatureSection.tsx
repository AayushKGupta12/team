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
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Gemini_Generated_Image_52dpmm52dpmm52dp.png",
  },
  {
    title: "Improve Your Resume Performance",
    description:
      "Our AI Resume Analyzer checks your resume’s technical depth, ATS score, and industry match. Based on 32 parameter checks",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20133854.png",
  },
  {
    title: "Built in Cover Letter",
    description:
      "Well crafted industry standard and optimised cover letter based on your resume. Simply copy paste or download",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20134243.png",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-28 lg:py-40 bg-gradient-to-b from-white to-[#f8fbff]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20 px-6">
        <h2 className="text-5xl lg:text-6xl font-light text-[#0d2440] tracking-tight leading-tight">
          Complete toolkit built for developers
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          A complete AI-powered career suite to help you get hired faster in India’s top companies.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {features.map((feature, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-28 ${
              index !== features.length - 1 ? "mb-32 lg:mb-44" : ""
            } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Image – Premium glass card */}
            <div className="relative w-full lg:w-1/2">
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100/50 backdrop-blur-sm">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  priority={index <= 1}
                  sizes="(max-width: 900px) 90vw, 40vw"
                  quality={95}
                />
                {/* Soft inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Text */}
            <div className="lg:w-1/2 max-w-2xl">
              <div className="space-y-8">
                {/* Number badge */}
                <div className="flex items-center gap-5 text-[#2e5e99]/70">
                  <span className="text-lg font-bold tracking-widest">0{index + 1}</span>
                  <div className="h-px w-16 bg-[#2e5e99]/20" />
                </div>

                <h3 className="text-4xl lg:text-5xl xl:text-6xl font-light text-[#0d2440] leading-tight">
                  {feature.title}
                </h3>

                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}