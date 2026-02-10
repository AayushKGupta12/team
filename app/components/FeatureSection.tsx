"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { 
  Sparkles, 
  FileText, 
  Briefcase, 
  Chrome, 
  Mic, 
  Users,
  Zap,
  Shield,
  Clock
} from "lucide-react";

const features = [
  {
    title: "Improve Your Resume Performance",
    description:
      "Analyze your resume using comprehensive evaluation covering technical depth, ATS compatibility, role relevance, and industry benchmarks. Our system evaluates resumes using 32+ structured parameters from real hiring processes across Indian IT companies.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    alt: "Resume analysis dashboard showing ATS score, technical skills evaluation, and job match percentage for Indian IT jobs",
    icon: FileText,
    category: "Resume Intelligence",
    status: "available",
    link: "/ai-resume-analysis"
  },
  {
    title: "Generate Professional Cover Letters",
    description:
      "Create clean, professional, and role-specific cover letters generated from your resume. Designed specifically for Indian IT job applications across software development, data science, and cloud computing. Copy, edit, or download instantly.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20134243.png",
    alt: "Professional cover letter generator interface for software engineers and IT professionals in India",
    icon: Sparkles,
    category: "Cover Intelligence",
    status: "available",
    link: "/cover-letter"
  },
  {
    title: "Work in India's Top IT Companies",
    description:
      "Discover verified IT job opportunities across software engineering, data science, machine learning, cloud computing, and cybersecurity. Job listings updated daily and curated for freshers and early-career developers across India's tech ecosystem.",
    image:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/Screenshot%202025-12-11%20133854.png",
    alt: "IT job listings platform for freshers and early-career developers in India showing software engineer and data science positions",
    icon: Briefcase,
    category: "Search Intelligence",
    status: "available",
    link: "/it-jobs"
  },
];

const upcomingFeatures = [
  {
    title: "Intelligent Chrome Extension",
    description:
      "On-page research assistant for instant coding help, technical documentation, and problem-solving. Get contextual answers while coding, debugging, or learning new technologies without leaving your browser.",
    icon: Chrome,
    category: "Developer Tools",
    eta: "Coming Q2 2025",
    gradient: "from-blue-100 to-indigo-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Spoken English Practice",
    description:
      "Practice spoken English for technical interviews and workplace communication. Get real-time feedback on pronunciation, fluency, and professional vocabulary specific to IT industry contexts.",
    icon: Mic,
    category: "English Preparation",
    eta: "Coming Q3 2025",
    gradient: "from-emerald-100 to-teal-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Interview Practice Platform",
    description:
      "Practice technical and behavioral interviews with realistic mock sessions. Get detailed feedback on your responses, body language, and communication style to ace your next interview.",
    icon: Users,
    category: "Interview Preparation",
    eta: "Coming Q3 2025",
    gradient: "from-amber-100 to-orange-100",
    iconColor: "text-amber-600",
  },
];

export default function FeatureSection() {
  return (
    <>
      {/* ===== COMPREHENSIVE SEO STRUCTURED DATA ===== */}
      
      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Vfound",
            "url": "https://vfound.in",
            "logo": "https://vfound.in/logo.png",
            "description": "Career intelligence platform for Indian IT professionals. AI-powered resume analysis, cover letter generation, job search, and interview preparation tools for software engineers and developers.",
            "sameAs": [
              "https://twitter.com/vfound",
              "https://linkedin.com/company/vfound",
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "support@vfound.in",
            },
          }),
        }}
      />

      {/* WebSite Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Vfound - Career Intelligence Platform",
            "url": "https://vfound.in",
            "description": "AI-powered career tools for Indian IT professionals including resume analysis, cover letter generation, job search, and interview preparation.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://vfound.in/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* SoftwareApplication Schema */}
      <Script
        id="software-application-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Vfound Career Intelligence Platform",
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
              "ratingCount": "2500",
            },
            "description": "Comprehensive career intelligence platform for Indian IT professionals. Features include AI-powered resume analysis with ATS scoring, professional cover letter generation, curated IT job listings, and upcoming interview preparation tools.",
            "featureList": [
              "AI Resume Analysis with 32+ parameters",
              "ATS-Optimized Cover Letter Generator",
              "Curated IT Job Listings",
              "Technical Skills Evaluation",
              "Industry Benchmark Comparison",
              "Career Roadmap Guidance",
            ],
          }),
        }}
      />

      {/* ItemList Schema for Features */}
      <Script
        id="feature-itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Career Intelligence Tools for Indian IT Professionals",
            "description": "Comprehensive suite of career development tools including resume analysis, cover letter generation, job search, and interview preparation for software engineers and developers in India",
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

      {/* FAQPage Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Vfound Career Intelligence Platform?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vfound is a comprehensive career intelligence platform designed for Indian IT professionals. It offers AI-powered resume analysis, ATS-optimized cover letter generation, curated job listings, and upcoming interview preparation tools specifically tailored for software engineers and developers in India.",
                },
              },
              {
                "@type": "Question",
                "name": "How does the resume analysis work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI-powered resume analysis evaluates your resume using 32+ structured parameters including technical depth, ATS compatibility, role relevance, industry benchmarks, and competitive positioning. You receive detailed scores and actionable recommendations to improve your resume for Indian IT job applications.",
                },
              },
              {
                "@type": "Question",
                "name": "Is Vfound suitable for freshers and early-career developers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Vfound is specifically designed for freshers and early-career IT professionals in India. Our tools help evaluate academic projects, internships, and technical skills to create competitive resumes and cover letters for entry-level positions in software development, data science, and cloud computing.",
                },
              },
              {
                "@type": "Question",
                "name": "What upcoming features are planned?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We're developing an intelligent Chrome extension for coding assistance, spoken English practice for technical interviews, and an interview practice platform with mock sessions and detailed feedback. These features will launch in Q2-Q3 2025.",
                },
              },
            ],
          }),
        }}
      />

      <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/20">
        {/* ===== MAIN FEATURES SECTION ===== */}
        <section className="py-20 md:py-28">
          {/* Section Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center mb-20 px-6"
          >

            {/* H1 - SEO Optimized */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-800 leading-tight mb-4">
              Complete{" "}
              <span className="relative inline-block">
                <span className="relative z-10 px-3">Career Toolkit</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-200 transform -rotate-1 rounded-lg" />
              </span>{" "}
              for Developers
            </h1>

            <p className="mt-3 text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Career intelligence tools for Indian IT professionals. 
            </p>

            {/* Trust Indicators */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">740+ Resumes Analyzed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Zap className="w-5 h-5 text-amber-600" />
                <span className="font-semibold">Instant Results</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Built for Early Career</span>
              </div>
            </div>
          </motion.header>

          {/* Features */}
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
                  {/* Feature badge */}
                  <div className="flex items-center gap-3">
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${
                      index % 3 === 0
                        ? "from-blue-100 to-indigo-100"
                        : index % 3 === 1
                        ? "from-amber-100 to-yellow-100"
                        : "from-emerald-100 to-teal-100"
                    } px-4 py-2 rounded-full border border-slate-200/60`}>
                      <feature.icon className={`w-4 h-4 ${
                        index % 3 === 0
                          ? "text-blue-600"
                          : index % 3 === 1
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`} />
                      <span className="text-sm font-semibold text-slate-700">
                        {feature.category}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
                    {feature.title}
                  </h2>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Status badge */}
                  <a href={feature.link}>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200 hover:scale-105 transition-transform duration-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-700">
                      Check now
                    </span>
                  </div>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ===== UPCOMING FEATURES SECTION ===== */}
        <section className="py-20 md:py-28 bg-white/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-6"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Coming Soon to{" "}
                <span className="relative inline-block">
                  <a href="https://vfound.in">
                  <span className="relative z-10 px-3">Vfound.in</span>
                  </a>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-200 transform -rotate-1 rounded-lg py-2" />
                </span>
              </h2>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Next-generation career intelligence tools launching in <span className="bg-yellow-200 font-semibold px-2 py-1 rounded-md">March 2026</span>
              </p>
            </div>

            {/* Upcoming Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300"
                >
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {feature.eta}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {feature.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 mt-2">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mt-6 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />

                  {/* Status */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>In Development</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}