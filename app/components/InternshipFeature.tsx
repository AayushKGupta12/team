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
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, ArcElement,
  Tooltip, Legend
);

const noLegend = { plugins: { legend: { display: false } } };
const noAxes = {
  plugins: { legend: { display: false } },
  scales: { x: { display: false }, y: { display: false } },
};
const barRadius = { borderRadius: 6, borderSkipped: false };

export default function FeatureBento() {

  const [trackFilter, setTrackFilter] = useState("All");
  const trackRaw = {
    "30-Day": [120, 145, 160, 175, 190],
    "45-Day": [80, 95, 110, 130, 150],
    "60-Day": [40, 55, 70, 85, 100],
  };
  const trackData = {
    labels: ["Feb", "Mar", "Apr", "May", "Jun"],
    datasets: trackFilter === "All"
      ? [
          { label: "30-Day", data: trackRaw["30-Day"], backgroundColor: "#BFDBFE", ...barRadius },
          { label: "45-Day", data: trackRaw["45-Day"], backgroundColor: "#6EE7B7", ...barRadius },
          { label: "60-Day", data: trackRaw["60-Day"], backgroundColor: "#FDE68A", ...barRadius },
        ]
      : [{ label: trackFilter, data: trackRaw[trackFilter], backgroundColor: trackFilter === "30-Day" ? "#BFDBFE" : trackFilter === "45-Day" ? "#6EE7B7" : "#FDE68A", ...barRadius }],
  };

  const domainData = {
    labels: ["Development", "Design", "Data Science"],
    datasets: [{
      data: [48, 31, 21],
      backgroundColor: ["#BFDBFE", "#A7F3D0", "#FDE68A"],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  const [reviewMonth, setReviewMonth] = useState("Jun");
  const reviewRaw = {
    Jun: [22, 38, 45, 60],
    May: [15, 28, 35, 50],
    Apr: [10, 20, 30, 42],
  };
  const reviewData = {
    labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    datasets: [{
      label: "Reviews",
      data: reviewRaw[reviewMonth],
      borderColor: "#2E5E99",
      backgroundColor: "rgba(46,94,153,0.10)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#2E5E99",
      pointRadius: 4,
    }],
  };

  const offerData = {
    labels: ["VFound Offer", "Partner Company", "Pending"],
    datasets: [{
      data: [35, 45, 20],
      backgroundColor: ["#C7D2FE", "#BBF7D0", "#FED7AA"],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  const [metric, setMetric] = useState("Submissions");
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
      backgroundColor: ["#BFDBFE", "#A7F3D0", "#FDE68A"],
      ...barRadius,
    }],
  };

  return (
    <section className="py-16 bg-[#0d2440] rounded-4xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-left mb-10">
          <span className="px-3 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-full font-medium">
            Internship Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-[#e7f0fa]">
            Why top interns choose VFound.in
          </h2>
          <p className="text-[#e7f0fa] mt-2 text-sm sm:text-base mx-auto text-left">
            Real projects. 70+ mentors. Verified profiles. Full-time offers starting ₹5.2 LPA.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* Card 1 — Applications */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs text-[#0d2440] uppercase tracking-wide font-medium">Applications</p>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5">Growing across all tracks</h3>
              </div>
              {/* Filter buttons — scrollable on tiny screens */}
              <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
                {["All", "30-Day", "45-Day", "60-Day"].map(f => (
                  <button
                    key={f}
                    onClick={() => setTrackFilter(f)}
                    className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
                      trackFilter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-3" style={{ background: "#F0F7FF" }}>
              <div style={{ height: 130 }}>
                <Bar
                  data={trackData}
                  options={{
                    ...noAxes,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: trackFilter === "All",
                        position: "bottom",
                        labels: { boxWidth: 8, font: { size: 9 }, padding: 8 },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Intern applications have grown 58% month-over-month across all three VFound tracks — 30, 45, and 60 days.
            </p>
          </div>

          {/* Card 2 — Domain split */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
            <div>
              <p className="text-xs text-[#0d2440] uppercase tracking-wide font-medium">Domain Split</p>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5">Where interns are building</h3>
            </div>
            <div className="rounded-xl p-3 flex justify-center" style={{ background: "#F0FDF9" }}>
              <div style={{ height: 130, width: 130 }}>
                <Doughnut data={domainData} options={{ ...noLegend, maintainAspectRatio: false, cutout: "68%" }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {[["Development", "#BFDBFE", "48%"], ["Design", "#A7F3D0", "31%"], ["Data Science", "#FDE68A", "21%"]].map(([l, c, v]) => (
                <span key={l} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c }} />
                  {l} <span className="font-semibold">{v}</span>
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Development leads, but Design and Data Science are fast-growing tracks with dedicated VFound mentors in each domain.
            </p>
          </div>

          {/* Card 3 — Mentor reviews */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-[#0d2440] uppercase tracking-wide font-medium">Mentor Reviews</p>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5">70+ mentors, every week</h3>
              </div>
              <div className="flex gap-1 shrink-0">
                {["Apr", "May", "Jun"].map(m => (
                  <button
                    key={m}
                    onClick={() => setReviewMonth(m)}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
                      reviewMonth === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-3" style={{ background: "#EFF6FF" }}>
              <div style={{ height: 130 }}>
                <Line data={reviewData} options={{ ...noAxes, maintainAspectRatio: false }} />
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Our mentor panel completes project reviews weekly. Your profile is approved only after a domain expert signs off on your submission.
            </p>
          </div>

          {/* Card 4 — Offers */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
            <div>
              <p className="text-xs text-[#0d2440] uppercase tracking-wide font-medium">Full-Time Offers</p>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5">Top performers get hired</h3>
            </div>
            <div className="rounded-xl p-3 flex justify-center" style={{ background: "#FFF7ED" }}>
              <div style={{ height: 130, width: 130 }}>
                <Doughnut data={offerData} options={{ ...noLegend, maintainAspectRatio: false, cutout: "68%" }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {[["VFound", "#C7D2FE", "35%"], ["Partner Co.", "#BBF7D0", "45%"], ["Pending", "#FED7AA", "20%"]].map(([l, c, v]) => (
                <span key={l} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c }} />
                  {l} <span className="font-semibold">{v}</span>
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Best performers receive offers from VFound (min ₹5.2 LPA) or the industry company that issued their project — subject to negotiation.
            </p>
          </div>

          {/* Card 5 — Submissions wide */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col gap-3 sm:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-xs text-[#0d2440] uppercase tracking-wide font-medium">By Domain</p>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mt-0.5">Project performance across domains</h3>
              </div>
              <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
                {["Submissions", "Quiz Score", "Pass Rate"].map(m => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
                      metric === m ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-3 sm:p-4" style={{ background: "#F8FAFF" }}>
              <div style={{ height: 140 }}>
                <Bar
                  data={submissionData}
                  options={{
                    ...noAxes,
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (c) => ` ${c.raw}${metric === "Pass Rate" ? "%" : metric === "Quiz Score" ? " pts" : " submitted"}`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Toggle between total project submissions, average quiz scores, and pass rates per domain. VFound continuously updates projects based on real industry needs — keeping evaluations current.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}