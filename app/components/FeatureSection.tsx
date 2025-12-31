"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";

const features = [
  {
    title: "Work in India’s Top IT Companies",
    description:
      "Discover real IT job opportunities across software engineering, data science, artificial intelligence, cloud computing, and cybersecurity. Job listings are updated regularly and focused on freshers and early-career developers in India.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Gemini_Generated_Image_52dpmm52dpmm52dp.png",
  },
  {
    title: "Improve Your Resume Performance",
    description:
      "Analyze your resume using AI-driven evaluation covering technical depth, ATS compatibility, role relevance, and industry benchmarks. The system evaluates your resume using more than 30 structured parameters used in real hiring processes.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20133854.png",
  },
  {
    title: "Generate Professional Cover Letters",
    description:
      "Create clean, professional, and role-specific cover letters generated from your resume. Designed for IT job applications, these cover letters can be copied, edited, or downloaded instantly.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20134243.png",
  },
];

export default function FeatureSection() {
  return (
    <>
      {/* ✅ SINGLE, CLEAR STRUCTURED DATA (No Confusion) */}
      <Script
        id="feature-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "AI Career Tools for Developers",
            "itemListElement": features.map((feature, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": feature.title,
              "description": feature.description,
            })),
          }),
        }}
      />

      <section className="bg-gradient-to-b from-white to-[#f8fbff] py-18">
        {/* ===== SECTION HEADER ===== */}
        <header className="max-w-4xl mx-auto text-center mb-18 px-6">
          <h2 className="text-4xl lg:text-5xl font-light text-[#0d2440] tracking-tight leading-tight">
            Complete AI career toolkit for developers
          </h2>

          <p className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto">
            Developer Toolkit for IT grads to build resumes, cover letters, and find jobs in India.
          </p>
        </header>

        {/* ===== FEATURES ===== */}
        <div className="max-w-7xl mx-auto px-6">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-28 ${
                index !== features.length - 1 ? "mb-32 lg:mb-44" : ""
              } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* ===== IMAGE ===== */}
              <figure className="relative w-full lg:w-1/3">
                <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100/50">
                  <Image
                    src={feature.image}
                    alt={`${feature.title} – Vfound AI career platform`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
                    quality={90}
                  />
                </div>
              </figure>

              {/* ===== TEXT ===== */}
              <div className="lg:w-1/2 max-w-2xl">
                <div className="space-y-8">
                  <div className="flex items-center gap-5 text-[#2e5e99]">
                    <span className="text-lg font-bold tracking-widest">
                      0{index + 1}
                    </span>
                    <div className="h-px w-16 bg-[#2e5e99]" />
                  </div>

                  <h3 className="text-3xl lg:text-5xl xl:text-5xl font-light text-[#0d2440] leading-tight">
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
    </>
  );
}
