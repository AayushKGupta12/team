'use client';

import React from 'react';
import { Check, X, ShieldCheck, Trophy, ArrowUpRight, BrainCircuit, Target, Repeat, Timer, Code2 } from 'lucide-react';
import Countdown from './Countdown';

const comparisonData = [
  {
    label: "Learning Approach",
    legacy: "Random Practice",
    tauzand: "Pattern-First Learning",
    icon: <BrainCircuit size={18} />,
  },
  {
    label: "Knowledge Retention",
    legacy: "Forgotten in 2 weeks",
    tauzand: "Remembered Long Term",
    icon: <Repeat size={18} />,
  },
  {
    label: "Preparation Time",
    legacy: "6+ months with burnout",
    tauzand: "Ready in 8-12 weeks",
    icon: <Timer size={18} />,
  },
  {
    label: "Handling New Questions",
    legacy: "Struggles with variations",
    tauzand: "Solves any variation easily",
    icon: <Target size={18} />,
  },
  {
    label: "Coding Skills",
    legacy: "Depends on specific IDE",
    tauzand: "Works in any environment",
    icon: <Code2 size={18} />,
  },
];

export default function PremiumComparison() {
  return (
    <section className="w-full bg-slate-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-left mb-10">
          <div className="inline-block border border-slate-900 rounded-full px-5 py-1.5 text-xs font-bold tracking-[0.2em] mb-6">
            DSA PREPARATION 2026
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight text-slate-950">
            Start Solving Now
          </h2>
        </div>

        {/* Main Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-200">
            <div className="col-span-5 p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Feature</div>
            <div className="col-span-3 p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Traditional Method</div>
            <div className="col-span-4 p-6 text-xs font-bold text-blue-600 uppercase tracking-widest text-center bg-blue-50">Tauzand Method</div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((item, i) => (
            <div key={i} className="grid grid-cols-12 border-b border-slate-100 hover:bg-slate-50 transition-colors group">
              
              {/* Feature Name */}
              <div className="col-span-5 p-6 flex items-start gap-4">
                <div className="mt-0.5 text-blue-600 opacity-40 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                </div>
              </div>

              {/* Traditional Method */}
              <div className="col-span-3 p-6 flex items-center justify-center gap-2 border-l border-slate-100 text-slate-400">
                <X size={18} />
                <span className="text-sm font-medium text-center">{item.legacy}</span>
              </div>

              {/* Tauzand Method */}
              <div className="col-span-4 p-6 flex items-center justify-center gap-2 border-l border-blue-100 bg-blue-50/30">
                <Check size={18} className="text-blue-600" strokeWidth={3} />
                <span className="text-sm font-semibold text-blue-700 text-center">{item.tauzand}</span>
              </div>
            </div>
          ))}
        </div>

                {/* === Premium Early Bird CTA === */}
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-20">
          
          {/* Left Column: Creative Context */}
          <div className="p-8 md:p-12 flex flex-col justify-between bg-green-100 border-b md:border-b-0 md:border-r border-green-300">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full border border-green-700 bg-green-500 animate-ping"></span>
                Limited Enrollment Tier
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                Accelerate Your Professional Journey.
              </h3>
              <div className="mt-8 hidden md:block">
              <p className="text-md uppercase tracking-wider font-semibold mb-2">Program Features</p>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>✓ 800+ Real Company Interview Questions</li>
                <li>✓ Pattern-First Learning Methodology</li>
                <li>✓ Topic-wise & Level-wise Practice</li>
                <li>✓ Hands-on Coding Projects</li>
                <li>✓ Full Dashboard & Progress Analytics</li>
                <li>✓ Lifetime Access & Updates</li>
              </ul>
            </div>
            </div>
          </div>

          {/* Right Column: Receipt & Checkout */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
            {/* Receipt Header */}
            <div className="text-center pb-4 mb-6 border-b border-dashed border-gray-300">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-700">Invoice Summary</p>
              <p className="text-[11px] text-gray-700 font-mono mt-0.5">REF: EARLY-BIRD-OFFER</p>
            </div>

            {/* Receipt Line Items */}
            <div className="space-y-3.5 text-sm text-gray-600 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Standard Program Fee</span>
                <span className="font-mono text-gray-600">₹399.00</span>
              </div>
              
              <div className="flex justify-between items-center text-emerald-700 font-medium">
                <span>Early Bird Waiver (52%)</span>
                <span className="font-mono">-₹189.00</span>
              </div>
              
              {/* Total Due */}
              <div className="flex justify-between items-center pt-3.5 border-t border-gray-200 text-gray-900 font-semibold">
                <span>Total Payable</span>
                <span className="font-mono text-xl text-gray-900">₹210.00</span>
              </div>
            </div>

            {/* Metadata & Rules */}
            <p className="text-center text-[12px] text-gray-600 mb-6 leading-normal">
              Includes lifetime access & global system updates. <br />
              <span className="text-center text-[10px] text-gray-600 mb-6 leading-normal underline"> If Already paid, you can ignore this </span>
            </p>

            {/* Clean CTA Button */}
            <a
              href="/DSA/userdashboard"
              className="block w-full bg-gray-900 text-white font-medium text-sm py-3 px-4 rounded text-center tracking-wide border border-gray-900 transition-colors duration-150"
            >
              Proceed to Payment
            </a>
          </div>

        </div>

          <Countdown 
            title="Offer's end In:" 
            targetDate="2026-06-20T00:00:00.000Z" 
            backgroundColor="bg-rose-400" 
          />

      </div>
    </section>
  );
}