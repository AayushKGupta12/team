"use client";
export default function UsageBanner({
  plan,
  used,
  total,
  reset_on,
}: {
  plan: string;
  used: number;
  total: number;
  reset_on: string;
}) {
  const percent = Math.round((used / total) * 100);

  return (
    <div className="mb-4 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3">
      <p className="font-semibold text-yellow-800">
        {plan} Plan — {used}/{total} credits used
      </p>

      <div className="mt-2 h-2 bg-yellow-200 rounded-full">
        <div
          className="h-2 bg-yellow-500 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-1 text-xs text-yellow-700">
        Resets on {new Date(reset_on).toLocaleDateString("en-IN")}
      </p>
    </div>
  );
}
