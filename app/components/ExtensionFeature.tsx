"use client";

import Image from "next/image";
import React from "react";

const UseCasesSection: React.FC = () => {
  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800",
      title: "Instant solutions to your queries",
      description:
        "In General Query mode, receive concise, direct answers—one-line facts, quick explanations, or ready-to-use code snippets—delivered instantly in your browser without interrupting your workflow.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      title: "Intelligent research assistant",
      description:
        "Activate Research Mode for advanced, highly intelligent explanations. Dive deep into complex topics, get comprehensive breakdowns, structured insights, or even complete solutions built step-by-step for your toughest problems.",
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        title: "Smart coding companion",
      description:
        "Seamlessly switch modes while coding: quick fixes, boilerplate, or debugging help in General Query mode; full architecture design, refactoring strategies, or multi-file solutions in Research Mode.",
    },
    {
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800",
      
        title: "Productivity & workflow booster",
      description:
        "Streamline daily tasks in General Query mode with fast summaries, email drafts, or task breakdowns. In Research Mode, build complete plans, research-backed strategies, or automate repetitive workflows with intelligent depth.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
      title: "Content & creative partner",
      description:
        "Generate polished copy, ideas, or outlines instantly in General Query mode. Switch to Research Mode for in-depth content strategies, audience analysis, or fully structured articles and campaigns crafted with advanced reasoning.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
      title: "Quick Toggle",
      description:
        "Tap Ctrl + Q for rapid ideas, copy, or outlines. Use Ctrl + Win to engage Research Mode for audience analysis, in-depth content strategies, or fully structured articles and campaigns.",
    },
  ];

  return (
    <section className="bg-white py-32 md:py-44 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Headline */}
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight tracking-tight mb-20 md:mb-32">
          Your 24/7 Solution Engineer
        </h2>

        {/* Grid – responsive, wider gaps for premium feel */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {items.map((item, index) => (
            <div key={index} className="space-y-6">
              {/* Image container */}
              <div className="overflow-hidden rounded-2xl bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={360}
                  className="w-full h-auto object-cover aspect-[5/3]"
                  priority={index < 2} // prioritize first two for LCP
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-[17px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;