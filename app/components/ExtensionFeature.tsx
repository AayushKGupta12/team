"use client";

import Image from "next/image";
import React from "react";

const UseCasesSection: React.FC = () => {
  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80",
      title: "Instant solutions to your queries",
      description:
        "Get real-time answers directly in your browser. Our Chrome extension helps you resolve questions instantly without breaking your workflow.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      title: "Intelligent research assistant",
      description:
        "Accelerate your research with AI-powered insights. The extension intelligently scans, summarizes, and delivers the information you need.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80",
      title: "Smart coding companion",
      description:
        "Boost your development workflow with intelligent coding support. From debugging to generating snippets, the extension is your coding sidekick.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* TOP BADGE */}
        <div className="flex justify-center mb-6">
          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-md tracking-wider">
            USE CASES
          </span>
        </div>

        {/* HEADING */}
        <h2 className="text-center text-5xl font-semibold text-gray-900 mb-20">
          A 24/7 Solution Engineer
        </h2>

        {/* 3 COLUMN GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <div key={index}>
              {/* IMAGE CARD */}
              <div className="bg-gray-100 rounded-xl p-6 mb-6">
                <Image
                  src={item.image}
                  alt="feature"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 text-base leading-relaxed">
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