"use client";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, ArcElement, Tooltip
);

const noAxes = {
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
};

function Sparkline({ points, color, fill }: { points: number[]; color: string; fill: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 80; 
  const h = 32;
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return [x, y];
  });
  const pathD = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={areaD} fill={fill} opacity="0.15" />
      <path d={pathD} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="3" fill={color} />
    </svg>
  );
}

const stats = [
  {
    val: "740+",
    label: "Resumes Analysed",
    change: "+38% this month",
    good: true,
    spark: [31, 80, 220, 430, 680, 740],
    color: "#2E5E99",
    fill: "#2E5E99",
  },
  {
    val: "360+",
    label: "Cover Letters Generated",
    change: "+22% this month",
    good: true,
    spark: [18, 26, 39, 51, 64, 78],
    color: "#059669",
    fill: "#059669",
  },
  {
    val: "1.6K+",
    label: "Chrome Extension Uses",
    change: "Across 3 browsers",
    good: null,
    spark: [120, 240, 480, 900, 1300, 1600],
    color: "#7C3AED",
    fill: "#7C3AED",
  },
  {
    val: "634",
    label: "Internships Completed",
    change: "30 / 45 / 60-day tracks",
    good: null,
    spark: [80, 130, 210, 310, 450, 634],
    color: "#2E5E99",
    fill: "#2E5E99",
  },
];

const growthData = {
  labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
  datasets: [
    {
      label: "Resumes",
      data: [310, 480, 620, 750, 890, 1040],
      borderColor: "#2E5E99",
      backgroundColor: "rgba(46,94,153,0.08)",
      fill: true, tension: 0.4,
      pointBackgroundColor: "#2E5E99", pointRadius: 3,
    },
    {
      label: "Applications",
      data: [620, 850, 1100, 1380, 1740, 2100],
      borderColor: "#0EA47A",
      backgroundColor: "rgba(14,164,122,0.06)",
      fill: true, tension: 0.4,
      pointBackgroundColor: "#0EA47A", pointRadius: 3,
    },
  ],
};

const internshipBar = {
  labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
  datasets: [{
    data: [45, 72, 98, 130, 168, 212],
    backgroundColor: "#BFDBFE",
    borderRadius: 6,
    borderSkipped: false,
  }],
};

export default function ProductAnalytics() {
  return (
    <section className="py-16 bg-[#0d2440] rounded-3xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Platform Performance
          </h2>
          <p className="text-[#d7edff] mt-2 text-base max-w-xl">
            Real-time impact and growth metrics as of May 2026
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl px-5 py-5 flex flex-col justify-between border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-600 font-medium">{s.label}</p>
                <Sparkline points={s.spark} color={s.color} fill={s.fill} />
              </div>

              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900">{s.val}</div>
                <div className={`text-xs mt-1 font-medium ${s.good ? "text-emerald-600" : "text-gray-500"}`}>
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Growth Trend */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="uppercase text-xs tracking-widest font-semibold text-gray-500">Growth Trend</p>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">Resumes vs Applications</h3>
              </div>
              <div className="flex gap-4">
                {[
                  { color: "#2E5E99", label: "Resumes" },
                  { color: "#0EA47A", label: "Applications" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[160px] bg-[#F8FAFF] rounded-xl p-3">
              <Line data={growthData} options={{ maintainAspectRatio: false, ...noAxes }} />
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">September 2025 – February 2026 • Updated Monthly</p>
          </div>

          {/* Internship Completions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="mb-6">
              <p className="uppercase text-xs tracking-widest font-semibold text-gray-500">Internship Program</p>
              <h3 className="text-lg font-semibold text-gray-800 mt-1">Verified Completions per Month</h3>
            </div>

            <div className="h-[160px] bg-[#F0F7FF] rounded-xl p-3">
              <Bar data={internshipBar} options={{ maintainAspectRatio: false, ...noAxes }} />
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">Total 634 internships • Across all tracks</p>
          </div>
        </div>

      </div>
    </section>
  );
}