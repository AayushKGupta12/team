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

function Sparkline({ points, color, fill }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 80; const h = 32;
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
    val: "1,040+",
    label: "Resumes Analysed",
    change: "+38% this month",
    good: true,
    spark: [310, 480, 620, 750, 890, 1040],
    color: "#2E5E99",
    fill: "#2E5E99",
    lightBg: "#EEF4FF",
  },
  {
    val: "780+",
    label: "Cover Letters",
    change: "+22% this month",
    good: true,
    spark: [180, 260, 390, 510, 640, 780],
    color: "#059669",
    fill: "#059669",
    lightBg: "#ECFDF5",
  },
  {
    val: "94K+",
    label: "Extension Uses",
    change: "Chrome · Edge · Brave",
    good: null,
    spark: [8000, 15000, 28000, 45000, 70000, 94000],
    color: "#7C3AED",
    fill: "#7C3AED",
    lightBg: "#F5F3FF",
  },
  {
    val: "3,600+",
    label: "IT Job Applicants",
    change: "+26% this month",
    good: true,
    spark: [620, 850, 1100, 1380, 1740, 3600],
    color: "#0EA47A",
    fill: "#0EA47A",
    lightBg: "#EDFAF5",
  },
  {
    val: "43",
    label: "Blogs Published",
    change: "2 new this week",
    good: true,
    spark: [4, 6, 5, 8, 9, 11],
    color: "#D97706",
    fill: "#D97706",
    lightBg: "#FFFBEB",
  },
  {
    val: "634",
    label: "Internships Completed",
    change: "Across 3 tracks",
    good: null,
    spark: [80, 130, 210, 310, 450, 634],
    color: "#2E5E99",
    fill: "#2E5E99",
    lightBg: "#EEF4FF",
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
        <div className="mb-10">
          <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
            Platform Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-[#e7f0fa]">
            VFound.in :  Number's
          </h2>
          <p className="text-[#93afc8] mt-2 text-sm sm:text-base max-w-xl">
            A snapshot of how our tools are being used across
          </p>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl px-4 py-4 flex flex-col justify-between gap-3 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between gap-1">
                <p className="text-[12px] text-gray-700 leading-tight">{s.label}</p>
                <Sparkline points={s.spark} color={s.color} fill={s.fill} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 leading-none">{s.val}</div>
                <div className={`text-[10px] mt-1 font-medium ${s.good ? "text-emerald-600" : "text-gray-400"}`}>
                  {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Two chart cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          {/* Growth trend */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#0d2440] uppercase tracking-wide font-semibold">Growth Trend</p>
                <h3 className="text-sm font-semibold text-gray-800 mt-0.5">Resumes vs Job Applications</h3>
              </div>
              <div className="flex items-center gap-3">
                {[["#2E5E99", "Resumes"], ["#0EA47A", "Applications"]].map(([c, l]) => (
                  <span key={l} className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span className="w-2 h-2 rounded-full" style={{ background: c }} />{l}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ background: "#F8FAFF", borderRadius: 12, padding: "12px 12px 8px" }}>
              <div style={{ height: 140 }}>
                <Line
                  data={growthData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: { mode: "index", intersect: false },
                    },
                    scales: { x: { display: false }, y: { display: false } },
                  }}
                />
              </div>
            </div>
            <p className="text-gray-700 text-xs">Jan – Jun 2025 · updated monthly</p>
          </div>

          {/* Internship completions */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
            <div>
              <p className="text-[10px] text-[#0d2440] uppercase tracking-wide font-semibold">Internship Completions</p>
              <h3 className="text-sm font-semibold text-gray-800 mt-0.5">Verified graduates per month</h3>
            </div>
            <div style={{ background: "#F0F7FF", borderRadius: 12, padding: "12px 12px 8px" }}>
              <div style={{ height: 140 }}>
                <Bar
                  data={internshipBar}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: true } },
                    scales: { x: { display: false }, y: { display: false } },
                  }}
                />
              </div>
            </div>
            <p className="text-gray-700 text-xs">634 total · 30 · 45 · 60 day tracks combined</p>
          </div>

        </div>

        {/* ── Bottom text analysis row ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {[
            {
              icon: "📄",
              title: "Resume & Cover Letter",
              lines: [
                { label: "Avg. ATS score improvement", val: "+34 pts" },
                { label: "Cover letters generated", val: "780+" },
                { label: "User satisfaction", val: "94%" },
              ],
              accent: "#2E5E99", light: "#EEF4FF",
            },
            {
              icon: "💼",
              title: "Job Application Engine",
              lines: [
                { label: "Applications placed", val: "3,600+" },
                { label: "Shortlist rate", val: "41%" },
                { label: "Avg. response time", val: "3.2 days" },
              ],
              accent: "#059669", light: "#ECFDF5",
            },
            {
              icon: "🎓",
              title: "Internship Program",
              lines: [
                { label: "Mentor-verified certificates", val: "634" },
                { label: "Full-time offers made", val: "89" },
                { label: "Min. offer (VFound)", val: "₹5.2 LPA" },
              ],
              accent: "#D97706", light: "#FFFBEB",
            },
          ].map((p) => (
            <div key={p.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: p.light }}
                >
                  {p.icon}
                </span>
                <h3 className="text-sm font-semibold text-gray-800">{p.title}</h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {p.lines.map((l) => (
                  <div key={l.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-700">{l.label}</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: p.light, color: p.accent }}
                    >
                      {l.val}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-gray-100 mt-auto" />
              <div
                className="w-20 h-1 rounded-full"
                style={{ background: p.accent }}
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}