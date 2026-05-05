"use client";
import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const chartOptions = { 
  responsive: true, 
  maintainAspectRatio: false, 
  plugins: { legend: { display: false } },
  scales: { x: { grid: { color: '#f1f5f9' } }, y: { grid: { color: '#f1f5f9' } } }
};

export default function FeatureBento() {
  const [metric, setMetric] = useState("Submissions");

  const domainData = {
    labels: ["Development", "Design", "Data Science"],
    datasets: [{ data: [48, 31, 21], backgroundColor: ["#0f172a", "#3b82f6", "#e2e8f0"], borderWidth: 0 }]
  };

  const metricData = {
    Submissions: [87, 62, 44],
    "Quiz Score": [78, 83, 71],
    "Pass Rate": [92, 88, 76],
  };

  const submissionData = {
    labels: ["Dev", "Design", "Data"],
    datasets: [{
      label: metric,
      data: metricData[metric],
      backgroundColor: ["#0f172a", "#3b82f6", "#e2e8f0"],
      borderRadius: 8
    }]
  };

  const growthData = {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [{ data: [22, 38, 45, 60], borderColor: "#0f172a", tension: 0.4, fill: true, backgroundColor: "#f1f5f9" }]
  };

  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-block border border-slate-300 bg-white rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-slate-900">
            Ecosystem Metrics
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-[0.9] text-slate-950">
            Real-time data for <br />
            <span className="italic font-light text-slate-500">serious builders.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Domain Split */}
          <div className="border border-slate-200 shadow-sm rounded-3xl p-8 bg-white">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 block">Domain Distribution</span>
            <div className="h-40 mb-8"><Doughnut data={domainData} options={{ ...chartOptions, cutout: "55%" }} /></div>
            <div className="space-y-3">
              {["Development (48%)", "Design (31%)", "Data Science (21%)"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-900">
                  <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-slate-900" : i === 1 ? "bg-blue-500" : "bg-slate-200"}`} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Growth Trend */}
          <div className="md:col-span-2 border border-slate-200 shadow-sm rounded-3xl p-8 bg-white">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 block">Growth Velocity</span>
            <div className="h-64"><Line data={growthData} options={chartOptions} /></div>
          </div>

          {/* Metric Toggle Card */}
          <div className="md:col-span-2 border border-slate-200 shadow-sm rounded-3xl p-8 bg-white">
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Performance</span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {["Submissions", "Quiz Score", "Pass Rate"].map(m => (
                  <button key={m} onClick={() => setMetric(m)} className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${metric === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-40"><Bar data={submissionData} options={{ ...chartOptions, indexAxis: "y" }} /></div>
          </div>

          {/* Impact Stats */}
          <div className="border border-slate-900 rounded-3xl p-8 bg-slate-950 text-white flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Placement Rate</span>
            <div className="text-5xl font-bold tracking-tighter mb-2 text-white">92%</div>
            <p className="text-slate-300 text-sm font-medium">Successful hiring conversion rate across all Tauzand partner tracks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}