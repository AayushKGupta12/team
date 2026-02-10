"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  FileText,
  Cpu,
  Briefcase,
  Users,
  Target,
  RefreshCw,
} from "lucide-react";

type ChartRow = {
  date: string;
  career_health: number;
  resume: number;
  ats: number;
  tech: number;
  experience: number;
  market: number;
};

type MetricConfig = {
  key: keyof Omit<ChartRow, "date">;
  label: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  description: string;
};

const metrics: MetricConfig[] = [
  {
    key: "career_health",
    label: "Career Health Score",
    color: "#3b82f6",
    gradient: "from-blue-500 to-blue-600",
    icon: <Activity className="w-5 h-5" />,
    description: "Overall career trajectory and market positioning",
  },
  {
    key: "resume",
    label: "Resume Quality",
    color: "#10b981",
    gradient: "from-emerald-500 to-emerald-600",
    icon: <FileText className="w-5 h-5" />,
    description: "Resume formatting, content quality, and completeness",
  },
  {
    key: "ats",
    label: "ATS Compatibility",
    color: "#ef4444",
    gradient: "from-red-500 to-red-600",
    icon: <Cpu className="w-5 h-5" />,
    description: "Applicant Tracking System optimization score",
  },
  {
    key: "tech",
    label: "Technical Skills",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-violet-600",
    icon: <Target className="w-5 h-5" />,
    description: "Technology stack relevance and proficiency",
  },
  {
    key: "experience",
    label: "Experience Level",
    color: "#14b8a6",
    gradient: "from-teal-500 to-teal-600",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Years of experience and role progression",
  },
  {
    key: "market",
    label: "Market Position",
    color: "#f97316",
    gradient: "from-orange-500 to-orange-600",
    icon: <Users className="w-5 h-5" />,
    description: "Competitiveness in current job market",
  },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.name}:</span>
            <span className="text-sm font-semibold text-gray-900">
              {entry.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Stat card component
const StatCard = ({
  metric,
  currentValue,
  previousValue,
}: {
  metric: MetricConfig;
  currentValue: number;
  previousValue: number;
}) => {
  const change = currentValue - previousValue;
  const percentChange = previousValue ? (change / previousValue) * 100 : 0;
  const isPositive = change > 0;
  const isNeutral = Math.abs(change) < 0.5;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-2.5 rounded-lg bg-gradient-to-br ${metric.gradient} text-white`}
        >
          {metric.icon}
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          {isNeutral ? (
            <Minus className="w-4 h-4 text-gray-400" />
          ) : isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span
            className={`font-medium ${
              isNeutral
                ? "text-gray-500"
                : isPositive
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {isNeutral ? "0.0" : isPositive ? "+" : ""}
            {percentChange.toFixed(1)}%
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-1">
        {currentValue.toFixed(1)}
      </h3>
      <p className="text-sm font-medium text-gray-700 mb-1">{metric.label}</p>
      <p className="text-xs text-gray-500">{metric.description}</p>
    </div>
  );
};

export default function CareerHealthDashboard({
  clerkUserId,
}: {
  clerkUserId: string;
}) {
  const [data, setData] = useState<ChartRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🚨 Dashboard mounted with clerkUserId:", clerkUserId);
    console.log("🚨 API URL:", process.env.NEXT_PUBLIC_API_URL);
  }, [clerkUserId]);

  useEffect(() => {
    if (!clerkUserId) {
      console.error("❌ No clerkUserId provided");
      setLoading(false);
      return;
    }

    async function fetchHistory() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/career-health-history`;
        console.log("📡 Fetching from:", url);
        console.log("📡 Payload:", { clerk_user_id: clerkUserId });

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerk_user_id: clerkUserId }),
        });

        console.log("📡 Response status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API error (${res.status}): ${errorText}`);
        }

        const json = await res.json();
        console.log("📡 Response data:", json);

        if (!json.timestamps || json.timestamps.length === 0) {
          console.log("⚠️ No data returned");
          setData([]);
          return;
        }

        const formatted: ChartRow[] = json.timestamps.map(
          (ts: string, i: number) => ({
            date: new Date(ts).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            career_health: json.career_health[i] || 0,
            resume: json.resume[i] || 0,
            ats: json.ats[i] || 0,
            tech: json.tech[i] || 0,
            experience: json.experience[i] || 0,
            market: json.market_position[i] || 0,
          })
        );

        console.log("✅ Formatted data:", formatted);
        setData(formatted);
      } catch (err) {
        console.error("❌ Failed to load career history:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    

    fetchHistory();
  }, [clerkUserId]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading career insights...</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <Activity className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Error Loading Dashboard
        </h3>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-6">
          <Activity className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Start Your Career Journey
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Upload your resume to begin tracking your career health metrics and
          receive personalized insights.
        </p>
        <a href="#id1" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          Upload Resume
        </a>
      </div>
    );
  }

  const currentValues = data[data.length - 1];
  const previousValues = data.length > 1 ? data[data.length - 2] : data[0];

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Past Career Health Analytics
          </h2>
          <p className="text-gray-600">
            Track your professional growth over time
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="text-lg font-semibold text-gray-900">
            {currentValues.date}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((metric) => (
          <StatCard
            key={metric.key}
            metric={metric}
            currentValue={currentValues[metric.key]}
            previousValue={previousValues[metric.key]}
          />
        ))}
      </div>

      {/* Main Overview Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Performance Overview
          </h3>
          <p className="text-sm text-gray-600">
            Comprehensive view of all career health metrics
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={{ stroke: "#e5e7eb" }}
              label={{
                value: "Score",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#6b7280", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "12px" }}
              iconType="circle"
            />
            {metrics.map((metric) => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.label}
                stroke={metric.color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: metric.color, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Metric Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metrics.map((metric) => {
          const metricData = data.map((d) => ({
            date: d.date,
            value: d[metric.key],
          }));

          const minValue = Math.min(...metricData.map((d) => d.value));
          const maxValue = Math.max(...metricData.map((d) => d.value));
          const yAxisMin = Math.max(0, Math.floor(minValue / 10) * 10 - 10);
          const yAxisMax = Math.min(100, Math.ceil(maxValue / 10) * 10 + 10);

          return (
            <div
              key={metric.key}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${metric.gradient} text-white`}
                >
                  {metric.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {metric.label}
                  </h4>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={metricData}>
                  <defs>
                    <linearGradient
                      id={`gradient-${metric.key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={metric.color}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={metric.color}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[yAxisMin, yAxisMax]}
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [
                      value.toFixed(1),
                      metric.label,
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={metric.color}
                    strokeWidth={2.5}
                    fill={`url(#gradient-${metric.key})`}
                    dot={{ r: 3, fill: metric.color }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
}