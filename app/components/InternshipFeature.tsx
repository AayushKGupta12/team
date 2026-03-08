"use client";

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
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function FeatureBento() {
  const incomeExpenseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Income",
        data: [2000, 2400, 2200, 2800, 2600],
      },
      {
        label: "Expense",
        data: [1200, 1400, 1300, 1500, 1700],
      },
    ],
  };

  const wealthData = {
    labels: ["Stocks", "Crypto", "Cash", "Funds"],
    datasets: [
      {
        data: [40, 25, 20, 15],
      },
    ],
  };

  const savingsData = {
    labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
      {
        label: "Savings",
        data: [200, 350, 500, 650],
      },
    ],
  };

  const taxData = {
    labels: ["Salary", "Investment", "Other"],
    datasets: [
      {
        data: [60, 30, 10],
      },
    ],
  };

  const spendingData = {
    labels: ["Food", "Rent", "Travel", "Shopping", "Other"],
    datasets: [
      {
        label: "Expenses",
        data: [300, 900, 200, 250, 150],
      },
    ],
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="px-3 py-1 text-sm bg-gray-200 rounded-full">
            Features
          </span>

          <h2 className="text-4xl font-semibold mt-4">
            Why managing with finerrr?
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="h-32 mb-4">
              <Bar data={incomeExpenseData} />
            </div>

            <h3 className="font-semibold text-lg">
              Take control of your finances with a smart
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Track your income, set spending limits, and stay in control of your monthly expenses.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="h-32 mb-4 flex justify-center">
              <Doughnut data={wealthData} />
            </div>

            <h3 className="font-semibold text-lg">
              See the full picture of your wealth
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Monitor all your investments in one place, from stocks to crypto.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="h-32 mb-4">
              <Line data={savingsData} />
            </div>

            <h3 className="font-semibold text-lg">
              Achieve your savings goals faster
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Set clear savings goals, visualize your journey, and stay motivated with milestone-based.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-1">
            <div className="h-32 mb-4 flex justify-center">
              <Doughnut data={taxData} />
            </div>

            <h3 className="font-semibold text-lg">
              Stay ahead of tax season with accurate
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Estimate taxes based on income, deductions, and work type.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2">
            <div className="h-32 mb-4">
              <Bar data={spendingData} />
            </div>

            <h3 className="font-semibold text-lg">
              Understand your spending habits with clear
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Analyze where your money goes each month, and discover trends.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}