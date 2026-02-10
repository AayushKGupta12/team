'use client';

import { Upload, FileText, Briefcase, Sparkles, Check, Zap, Shield } from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";

export default function CoverLetterHero() {

const features = [
  {
    title: "ATS-Optimized Professional Cover Letters",
    description:
      "Generate professional, ATS-friendly cover letters using our specialized model trained on Indian IT hiring patterns. Each letter is structured to improve keyword visibility while maintaining natural, recruiter-friendly language that stands out.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Gemini_Generated_Image_52dpmm52dpmm52dp.png",
    alt: "ATS optimized cover letter generator for Indian IT jobs showing keyword optimization",
  },
  {
    title: "Human-Quality, Role-Specific Content",
    description:
      "Create role-specific cover letters that sound genuinely human and professional. Our system avoids generic phrases and writes clear, impactful content aligned with your target job profile and company culture.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20134243.png",
    alt: "Human-written quality cover letter example for software developer role",
  },
  {
    title: "Built for Indian IT Job Applications",
    description:
      "Designed specifically for Indian IT roles across software development, data science, cloud computing, and cybersecurity. Perfect for freshers and early-career professionals targeting positions at top tech companies and startups.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20133854.png",
    alt: "Cover letter platform specialized for Indian IT job market and tech roles",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload Your Resume",
    description: "Share your resume so we can highlight your skills and experience effectively",
    gradient: "from-violet-100 to-purple-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Briefcase,
    title: "Enter Job Details",
    description: "Provide company and role information to personalize your cover letter",
    gradient: "from-blue-100 to-indigo-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Sparkles,
    title: "Get Your Letter",
    description: "Receive a polished cover letter connecting your strengths to the role",
    gradient: "from-emerald-100 to-teal-100",
    iconColor: "text-emerald-600",
  },
];

const benefits = [
  "ATS-optimized formatting",
  "Industry-specific language",
  "Instant generation",
  "Professional quality",
];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/30">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >

            {/* Main Heading - SEO Optimized H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-800 leading-tight mb-1">
              Generate a Cover Letter{" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-3">Tailored</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-200 transform -rotate-1 rounded-lg" />
              </span>{" "}
              to Your Job
            </h1>

            {/* Subheading - SEO Meta Description Style */}
            <p className="mt-1 md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Get a personalized cover letter built from your resume, showcasing your strengths for the role.
            </p>

            {/* Trust indicators */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3-Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-700">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
                  {step.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-center">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 md:py-28 bg-white/50 backdrop-blur-sm">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20 px-6"
        >

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-3">
            <span className="relative inline-block">
              <span className="relative z-10 px-3">Cover Letter</span>
              <span className="absolute inset-0 bg-yellow-200 transform -rotate-1 rounded-lg" />
            </span> for Developers
          </h2>

          <p className="mt-1 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Designed for IT professionals to create compelling cover letters.
          </p>
        </motion.header>

        {/* Feature Items */}
        <div className="max-w-7xl mx-auto px-6 space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/3 relative group">
                {/* Decorative background */}
                <div
                  className={`absolute -inset-4 bg-gradient-to-br ${
                    index % 3 === 0
                      ? "from-violet-100/40 to-purple-100/40"
                      : index % 3 === 1
                      ? "from-blue-100/40 to-indigo-100/40"
                      : "from-emerald-100/40 to-teal-100/40"
                  } rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity`}
                />

                {/* Image container */}
                <figure className="relative aspect-[5/4] rounded-xl overflow-hidden shadow-md border border-slate-200/60 bg-white">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={90}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </figure>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                {/* Feature number badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 rounded-full border border-violet-200/60">
                  <Shield className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold text-violet-700">
                    Feature {index + 1}
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-violet-200 via-purple-200 to-transparent" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ===== STRUCTURED DATA (SEO) ===== */}
      <Script
        id="feature-itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Cover Letter Generator Features for IT Professionals",
            "description": "Professional cover letter generation platform features for Indian IT job applications",
            "itemListElement": features.map((feature, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": feature.title,
              "description": feature.description,
              "image": feature.image,
            })),
          }),
        }}
      />

      <Script
        id="software-application-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Vfound Cover Letter Generator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1200",
            },
            "description": "Professional cover letter generator for Indian IT jobs. Create ATS-optimized, role-specific cover letters for software development, data science, and tech positions.",
          }),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://vfound.in",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Cover Letter Generator",
                "item": "https://vfound.in/cover-letter",
              },
            ],
          }),
        }}
      />
    </div>
  );
}