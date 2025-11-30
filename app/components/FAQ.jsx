"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
  {
    question: "Is the Resume Analysis free?",
    answer:
      "Yes, You can upload your resume and get instant feedback. Our resume analyzer is not a simple tool. It reads your resume, checks your technical depth, compares it with current market competition and gives you tips to improve.",
  },
  {
    question: "Do you offer job placement support?",
    answer:
      "Yes, we provide job placement support through our IT Jobs section, where we list real job openings and connect developers with companies hiring right now.",
  },
  {
    question: "How often are roadmaps updated?",
    answer:
      "Our roadmaps are updated every month so that they stay aligned with industry standards, new skills, and the latest technologies.",
  },
  {
    question: "How is your service different from others?",
    answer:
      "We focus on recent undergrads in IT field. That means the our tools are designed specifically for software engineers, data engineers similar roles. We also provide live job updates.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a free trial for our Resume Analysis tool. You can upload your resume and get instant feedback without any cost.",
  },
  {
    question: "Do you use ChatGPT or other LLMs?",
    answer:
      "Our AI-powered features are driven by advanced large language models that help you analyse, improve, and optimize your resume effectively.",
  },
];


  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-7xl font-bold text-center mb-10 text-gray-900 kaushan-script-regular">
          Want to know more ?
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-[#2E5E99]/70  rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                <svg
                  className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-4 text-gray-700">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
