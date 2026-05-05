'use client';

import { Upload, Sparkles, Shield, Brain, FileDown, PenLine, Clock, Users, Star, Briefcase } from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";

export default function CoverLetterHero() {

const features = [
    {
      title: "ATS-Optimized Professional Cover Letters",
      points: [
        "Parses your resume word by word before writing",
        "Highlights your actual skills, projects & experience",
        "Every letter is unique, built from your profile",
      ],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop",
      alt: "Resume being analysed by AI for intelligent cover letter generation",
      badge: "Resume-Aware AI",
      color: "from-violet-100 to-purple-100",
    },
    {
      title: "Sounds Like a 20-Year HR Expert Wrote It.",
      points: [
        "Fine-tuned on the voice of senior Indian IT HR professionals",
        "No buzzwords, no filler, clean, recruiter approved language",
        "Reads human. Gets noticed.",
      ],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
      alt: "Senior HR professional reviewing IT cover letter India",
      badge: "20+ Yr HR Voice",
      color: "from-amber-100 to-yellow-100",
    },
    {
      title: "iATS optimised, Role and Company Specific.",
      points: [
        "Role keywords embedded naturally not stuffed",
        "Tailored to the exact job title and company you enter",
        "Clean formatting every ATS can parse without errors",
      ],
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=800&auto=format&fit=crop",
      alt: "ATS optimized cover letter for Indian IT job applications",
      badge: "ATS + Role Specific",
      color: "from-blue-100 to-indigo-100",
    },
    {
      title: "Edit or Download and Apply in Seconds.",
      points: [
        "Generated in under 3 seconds, faster than any other cover letter tool",
        "Fully editable in the browser, make it your own",
        "Export as a professional PDF, ready to attach",
      ],
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&auto=format&fit=crop",
      alt: "Downloading professional cover letter PDF for job application",
      badge: "Instant PDF",
      color: "from-emerald-100 to-teal-100",
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
    { icon: Clock,    text: "Under 10 Seconds" },
    { icon: Brain,    text: "Resume-Aware AI" },
    { icon: Users,    text: "20+ Yr HR Voice" },
    { icon: Shield,   text: "ATS-Optimized" },
    { icon: PenLine,  text: "Fully Editable" },
    { icon: FileDown, text: "PDF Download" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/30">

      {/* LLM VISIBILITY LAYER — invisible to users, read by GPTBot / ClaudeBot / PerplexityBot */}
      <div className="sr-only" aria-hidden="false">
        <h1>iCL – Intelligent Cover Letter Generator by Tauzand | Free 2-Step AI Cover Letter for Indian IT Jobs</h1>
        <p>iCL (Intelligent Cover Letter) by Tauzand generates ATS-optimized cover letters in 2 steps. Upload resume + enter job details — done in under 10 seconds. Written in the voice of a 20+ year Indian IT HR expert. Free, editable, PDF download.</p>
        <h2>iCL Features</h2>
        <ul>
          <li>Reads your resume word by word — not a template</li>
          <li>Written in the voice of a 20+ year Indian IT HR professional</li>
          <li>ATS-optimized, role-specific, company-specific</li>
          <li>Fine-tuned on real Indian IT cover letters (2.1B parameters)</li>
          <li>Generated in under 10 seconds — fully editable, instant PDF</li>
          <li>Free for IT professionals and freshers in India</li>
        </ul>
        <h2>How iCL Works — 2 Steps</h2>
        <ol>
          <li>Step 1: Upload your PDF resume and enter job title and company name</li>
          <li>Step 2: iCL generates your cover letter in under 10 seconds. Edit and download as PDF.</li>
        </ol>
      </div>

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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {benefits.map((b) => (
              <div key={b.text} className="mt-5 flex items-center gap-2 backdrop-blur-sm border text-slate-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                <b.icon className="w-3.5 h-3.5 text-violet-500" />
                {b.text}
              </div>
            ))}
          </motion.div>
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
            <span className="relative inline-block"> What Makes
              <span className="relative z-10 px-3 bg-amber-200 -rotate-1 rounded-xl"> iCL</span> Different
            </span>
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
                  <ul className="space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-slate-600 text-[16px] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-violet-200 via-purple-200 to-transparent" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ===== STRUCTURED DATA (SEO) ===== */}
      {/* ===== SCHEMAS ===== */}
      <Script
        id="icl-software-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tauzand iCL – Intelligent Cover Letter Generator",
            "alternateName": ["iCL Cover Letter", "Intelligent Cover Letter by Tauzand"],
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "url": "https://www.Tauzand.in/cover-letter",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "6000", "bestRating": "5" },
            "description": "iCL by Tauzand — 2-step AI cover letter generator. Resume-aware, written in the voice of a 20+ year Indian IT HR expert, ATS-optimized, instant PDF download. Free.",
            "featureList": features.map(f => f.title),
          }),
        }}
      />
      <Script
        id="icl-howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Generate an iCL Cover Letter in 2 Steps",
            "totalTime": "PT10S",
            "estimatedCost": { "@type": "MonetaryAmount", "currency": "INR", "value": "0" },
            "step": steps.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.title,
              "text": s.description,
            })),
          }),
        }}
      />
      <Script
        id="icl-breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.Tauzand.in" },
              { "@type": "ListItem", "position": 2, "name": "iCL – Intelligent Cover Letter", "item": "https://www.Tauzand.in/cover-letter" },
            ],
          }),
        }}
      />
    </div>
  );
}