"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface FeatureSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  imageUrl?: string;
  reverse?: boolean;
  index: number;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  icon,
  title,
  description,
  benefits,
  imageUrl,
  reverse = false,
  index,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full py-12 px-5"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } gap-12 lg:gap-16 items-center`}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            {/* Icon Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-br from-violet-100 to-purple-100 px-4 py-2 rounded-full border border-violet-200/60"
            >
              <div className="text-violet-600">{icon}</div>
              <span className="text-sm font-semibold text-violet-700">
                Premium Feature
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-slate-800 leading-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              {description}
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 pt-2">
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </span>
                  <span className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-full"
          >
            {imageUrl ? (
              <div className="relative group">
                {/* Decorative Background */}
                <div
                  className={`absolute -inset-4 bg-gradient-to-br ${
                    index % 3 === 0
                      ? "from-violet-100 to-purple-100"
                      : index % 3 === 1
                      ? "from-blue-100 to-indigo-100"
                      : "from-emerald-100 to-teal-100"
                  } rounded-3xl blur-2xl opacity-100`}
                />

                {/* Image Container */}
                <div className="relative ">
                  <img
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    className="mx-auto max-w-full h-72 w-72 sm:h-80 sm:w-80 lg:h-110 lg:w-110 object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-xl border border-slate-200" />
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

/* =========================
   Premium Features Section
========================= */

const QASection: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Deep Technical & Skill-Based Evaluation",
      description:
        "Your resume is analyzed for technical proficiency, tools mastery, and role-specific relevance—not just keywords.",
      benefits: [
        "Technical depth across programming languages and frameworks",
        "Skill relevance for software, IT, and tech roles",
        "Practical capability evaluation beyond theory",
      ],
      imageUrl:
        "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209124-removebg-preview.png",
      reverse: false,
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Project & Experience-Level Assessment",
      description:
        "Projects, internships, and academic experience are evaluated fairly for students and professionals alike.",
      benefits: [
        "Project depth and real-world application analysis",
        "Internship, training, and academic experience review",
        "Hands-on work and tool usage recognition",
      ],
      imageUrl:
        "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209144-removebg-preview.png",
      reverse: true,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Industry-Aligned Capability Analysis",
      description:
        "Your resume is benchmarked against current IT industry standards and role expectations in India.",
      benefits: [
        "Industry relevance score for IT and software roles",
        "Hiring trend data updated every 2 months",
        "Role-based skill and technology alignment",
      ],
      imageUrl:
        "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209146-removebg-preview.png",
      reverse: false,
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Percentile-Based Scoring & Comparison",
      description:
        "Understand how your resume performs compared to thousands of real IT job applicants.",
      benefits: [
        "Percentile score against similar candidate profiles",
        "Clear visibility of resume strengths and gaps",
        "Recruiter-style and ATS-aware evaluation",
      ],
      imageUrl:
        "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209150-removebg-preview.png",
      reverse: true,
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Best-Suited Job Role Recommendations",
      description:
        "Get data-driven job recommendations based on your skills, projects, and experience level.",
      benefits: [
        "Intelligent job role and career matching",
        "Skill, project, and experience-driven suggestions",
        "Higher shortlist and interview success probability",
      ],
      imageUrl:
        "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209140-removebg-preview.png",
      reverse: false,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/30 min-h-screen py-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 px-6"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-violet-200/60 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-700">
              Professional Resume Analysis Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
            Why This Resume Evaluation{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-3">Matters</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-200 transform -rotate-3 rounded-lg" />
            </span>{" "}
            for IT Jobs
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            A professional resume analysis platform designed for Indian IT
            hiring, ATS screening, and real recruiter expectations.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8"
          >
            {[
              { label: "Resumes Analyzed", value: "50K+" },
              { label: "Success Rate", value: "94%" },
              { label: "Career Paths", value: "200+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/60"
              >
                <div className="text-2xl sm:text-3xl font-bold text-violet-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Features */}
      <div className="space-y-20">
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            index={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            benefits={feature.benefits}
            imageUrl={feature.imageUrl}
            reverse={feature.reverse}
          />
        ))}
      </div>
    </div>
  );
};

export default QASection;