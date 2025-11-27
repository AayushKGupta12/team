import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";



export default function PricingSection() {
  return (
    <section className="py-5 bg-gradient-to-b from-white to-amber-200 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#0d2440] mb-1">
            Free trial ends on Dec 31, 2025
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Smarter job search. Sharper resumes. Powered by Google's Gemini
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Trial Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl ring-2 ring-[#0d2440] overflow-hidden transform scale-105">
            <div className="absolute top-0 left-0 right-0 bg-[#0d2440] text-white text-center py-1 text-sm font-semibold">
              Free Trial end on Dec 31, 2025
            </div>

            <div className="p-8 pt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Go</h3>
                <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                    Basic
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <div className="flex items-center space-x-2">
                    <span className="text-5xl font-bold text-[#0d2440] line-through">₹380</span>
                    <span className="text-5xl font-bold text-green-600">₹0</span>
                  </div>
                  <span className="ml-2 text-gray-950 text-xl font-bold">/ 6 month</span>
                </div>
                <span className="text-xl text-gray-500 ml-2"> ₹ 0 / day</span>
                
              </div>

              <p className="text-gray-700 mb-5">
                For individuals looking to enhance their job search and resume
                optimization
              </p>
                                  
                                  <div className="w-full">
      <SignedOut>
        <SignUpButton>
          <button className="w-full bg-[#0d2440] text-white py-3 rounded-lg font-semibold hover:bg-[#2e5e99] transition shadow-lg">
            Try it Free
          </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <button className="w-full bg-[#bd9a1a] text-white py-3 rounded-lg font-semibold hover:bg-[#2e5e99] transition shadow-lg">
          Yayy...!! Enjoy it
        </button>
      </SignedIn>
    </div>


              
              

              <div className="mt-10 space-y-8">
                {[
                  {
                    title: "Features",
                    items: [
                      "Advanced Resume Analysis using AI",
                      "Daily Job updates and Insights",
                    ],
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <h4 className="font-semibold text-[#0d2440] mb-3">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <Check className="h-5 w-5 text-amber-700 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                ))}
                
              </div>
            </div>
          </div>

          {/* Go Plus */}
          <div className="relative bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Go Plus</h3>
                <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                    Rich
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">₹580</span>
                  <span className="ml-2 text-gray-950 text-xl font-bold">/ 6 month</span>
                </div>
                <p className="text-xl text-gray-500 ml-2">₹ 3.22 / day</p>
              </div>

              <p className="text-gray-700 mb-8">
                For individuals seeking advanced features and enhanced support
              </p>

              <button className="w-full bg-[#0d2440] text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Buy now
              </button>

              <div className="mt-10">
                <h4 className="font-bold text-[#0d2440] text-lg mb-6">
                  Everything in Go...
                </h4>

                <ul className="space-y-4">
                  {[
                    "ATS Optimization Suggestions",
                    "AI-Powered Cover Letter Generator",
                    "IT Job Alerts and Notifications",
                    "Resume Templates and Optimization Tips",
                    "Interview Preparation Tools",
                    "Priority Customer Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-700 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Go Plus Pro</h3>
                <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                    Premium
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">₹780</span>
                  <span className="ml-2 text-gray-950 text-xl font-bold">/ 6 month</span>
                </div>
                <p className="text-xl text-gray-500 ml-2">₹ 4.33 / day</p>
              </div>

              <p className="text-gray-700 mb-8">
                For professionals seeking comprehensive features and premium support
              </p>

              <button className="w-full bg-[#0d2440] text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Buy now
              </button>

              <div className="mt-10">
                <h4 className="font-bold text-[#0d2440] text-lg mb-6">
                  Everything in Go Plus...
                </h4>

                <ul className="space-y-4">
                  {[
                    "Speak Confidently with AI Coaching",
                    "One-on-One Career Coaching Session by Experts",
                    "Exclusive Online Webinars and Workshops on Job Search Strategies",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-700 mr-3 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
