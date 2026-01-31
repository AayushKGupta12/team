// components/CoverLetterHero.tsx
'use client';

import { Upload, FileText, Briefcase, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";

export default function CoverLetterHero() {

const features = [
  {
    title: "ATS-Optimized AI Cover Letters",
    description:
      "Generate professional, ATS friendly cover letters written using our fine tuned Model trained on Indian IT hiring patterns. Each letter is structured to improve keyword visibility while remaining natural and recruiter-friendly.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Gemini_Generated_Image_52dpmm52dpmm52dp.png",
  },
  {
    title: "Human Written, Role Specific Content",
    description:
      "Create role specific cover letters that sound genuinely human. The system avoids generic AI phrases and writes clear, professional content aligned with the job profile and company you’re applying to.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20134243.png",
  },
  {
    title: "Built for Indian IT Job Applications",
    description:
      "Designed specifically for Indian IT roles, the cover letters align with recruiter expectations across software development, data, AI, cloud, and cybersecurity. Ideal for freshers and early career professionals.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20133854.png",
  },
];


  return (

    <div>
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">


      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
            Generate a cover letter <span className="bg-[#ffe8b1] px-2">tailored</span> to your job
            </h1>
            <p className="mt-2 text-md md:text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Get a personalized cover letter built from your resume, showcasing your strengths for the role.
            </p>
        </div>

        {/* 3-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Step 1: Upload Resume */}
            <div className="bg-gradient-to-br from-[#e02f75]/45 to-[#6700a3]/65 rounded-md shadow-md border p-8 md:p-8 text-center">
                <div className="w-15 h-15 mx-auto mb-6 bg-gradient-to-br from-[#e0f2fe] to-[#c0e8ff] rounded-md flex items-center justify-center">
                <Upload className="w-8 h-8 text-[#0d2440]" />
                </div>
                <h3 className="text-xl md:text-xl font-semibold text-[#0d2440] mb-4">
                Upload your resume
                </h3>
                <p className="text-gray-800 leading-relaxed">
                Share your resume so we can highlight your skills and experience.
                </p>
            </div>

            {/* Step 2: Enter Job Details */}
            <div className="bg-gradient-to-br from-[#e02f75]/45 to-[#6700a3]/65 rounded-md shadow-md border p-8 md:p-8 text-center">
                <div className="w-15 h-15 mx-auto mb-6 bg-gradient-to-br from-[#e0f2fe] to-[#c0e8ff] rounded-md flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-[#0d2440]" />
                </div>
                <h3 className="text-xl md:text-xl font-semibold text-[#0d2440] mb-4">
                Enter company and job role
                </h3>
                <p className="text-gray-800 leading-relaxed">
                Enter the company and role so we can tailor your cover letter.
                </p>
            </div>

            {/* Step 3: Get Cover Letter */}
            <div className="bg-gradient-to-br from-[#e02f75]/45 to-[#6700a3]/65 rounded-md shadow-md border p-8 md:p-10 text-center">
                <div className="w-15 h-15 mx-auto mb-6 bg-gradient-to-br from-[#e0f2fe] to-[#c0e8ff] rounded-md flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#0d2440]" />
                </div>
                <h3 className="text-xl md:text-xl font-semibold text-[#0d2440] mb-4">
                Get your cover letter
                </h3>
                <p className="text-gray-800 leading-relaxed">
                Receive a polished cover letter that connects your strengths to the job.
                </p>
            </div>
            </div>
      </div>
    </section>

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

      <section className=" bg-[#e5eefc]/30 py-18">
        {/* ===== SECTION HEADER ===== */}
        <header className="max-w-4xl mx-auto text-center mb-18 px-6">
          <h1 className="text-4xl lg:text-5xl font-light text-[#0d2440] tracking-tight leading-tight">
            Complete <span className="bg-[#ffe8b1] px-2">cover letter</span> for developers
          </h1>

          <p className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto">
            For IT grads to build resumes, cover letters and to follow Authentic Roadmap.
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
                <div className="relative aspect-[5/4] rounded-md overflow-hidden shadow-xl">
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

                  <h3 className="text-3xl lg:text-5xl xl:text-5xl font-light text-[#0d2440] leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <hr/>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      </div>
  );
}