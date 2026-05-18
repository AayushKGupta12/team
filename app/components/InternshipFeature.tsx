"use client";

import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const chartOptions = { 
  responsive: true, 
  maintainAspectRatio: false, 
  plugins: { legend: { display: false } },
  scales: { 
    x: { grid: { color: '#f1f5f9' } }, 
    y: { grid: { color: '#f1f5f9' } } 
  }
};

export default function FeatureBento() {
  const [metric, setMetric] = useState("Submissions");

  const domainData = {
    labels: ["Engineering", "Data", "Design"],
    datasets: [{ 
      data: [48, 31, 21], 
      backgroundColor: ["#facc15", "#4ade80", "#f472b6"], 
      borderWidth: 0 
    }]
  };

  const metricData = {
    Submissions: [87, 62, 44],
    "Quiz Score": [78, 83, 71],
    "Pass Rate": [92, 88, 76],
  };

  const submissionData = {
    labels: ["Development", "Design", "Data Science"],
    datasets: [{
      label: metric,
      data: metricData[metric],
      backgroundColor: ["#0f172a", "#3b82f6", "#e2e8f0"],
      borderRadius: 8
    }]
  };

  const growthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{ 
      data: [22, 38, 45, 60], 
      borderColor: "#0f172a", 
      tension: 0.4, 
      fill: true, 
      backgroundColor: "#f1f5f9" 
    }]
  };

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 text-center md:text-left">
          <div className="inline-block border border-slate-300 bg-white rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-slate-900">
            PERFORMANCE OVERVIEW
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-[0.95] text-slate-950">
            Performance
            <span className="italic font-light text-slate-500"> & Analytics</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Domain Distribution */}
          <div className="border border-slate-200 shadow-sm rounded-3xl p-8 bg-white">
            <span className="text-[13px] font-bold text uppercase tracking-widest mb-6 block">
              Domain Distribution
            </span>
            <div className="h-40 mb-8">
              <Doughnut data={domainData} options={{ ...chartOptions, cutout: "55%" }} />
            </div>
            <div className="space-y-3">
              {[
                { label: "Engineering", value: "48%", color: "bg-yellow-400" },
                { label: "Data", value: "31%", color: "bg-green-400" },
                { label: "Design", value: "21%", color: "bg-pink-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm font-medium text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    {item.label}
                  </div>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Trend */}
          <div className="md:col-span-2 border border-slate-200 shadow-sm rounded-3xl p-8 bg-white">
            <span className="text-[13px] font-bold uppercase tracking-widest mb-6 block">
              Monthly Growth Trend
            </span>
            <div className="h-64">
              <Line data={growthData} options={chartOptions} />
            </div>
          </div>

          {/* Project Performance */}
          <div className="md:col-span-2 border border-slate-200 shadow-sm rounded-3xl p-8 bg-white">
            <div className="flex justify-between items-center mb-8">
              <span className="text-[13px] font-bold uppercase tracking-widest">
                Project Performance
              </span>
              
              <div className="flex bg-yellow-300 p-1 rounded-xl">
                {["Submissions", "Quiz Score", "Pass Rate"].map((m) => (
                  <button 
                    key={m} 
                    onClick={() => setMetric(m)}
                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                      metric === m 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-40">
              <Bar data={submissionData} options={{ ...chartOptions, indexAxis: "y" }} />
            </div>
          </div>

          {/* Placement Impact */}
          <div className="border border-slate-900 rounded-3xl p-8 bg-slate-950 text-white flex flex-col justify-center">
            <span className="text-[13px] font-bold text-white uppercase tracking-widest mb-4">
              PLACEMENT IMPACT
            </span>
            <div className="text-6xl font-bold tracking-tighter mb-3">92%</div>
            <p className="text-slate-300 leading-relaxed">
              Of our verified interns received interview calls or placement opportunities from companies.
            </p>
            <a href="/terms-and-conditions" className="underline text-right text-xs">T&C applies</a>
          </div>

        </div>
      </div>
    </section>
  );
}