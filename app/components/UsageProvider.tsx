"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Usage = {
  plan: string;
  used: number;
  total: number;
};

export default function UsageProvider() {
  const { user, isLoaded } = useUser();
  const [usage, setUsage] = useState<Usage | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usage-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then((res) => res.json())
      .then(setUsage)
      .catch(() => {});
  }, [isLoaded, user]);

  if (!usage) return null;

  const percent = Math.min(
    Math.round((usage.used / usage.total) * 100),
    100
  );

  return (
    <div className="w-[220px] rounded-md border border-[#0d2440]/30 bg-white shadow-sm px-3 py-2">
      {/* Top row */}
      <div className="flex justify-between text-[11px] font-semibold text-[#0d2440] mb-1">
        <span>{usage.plan.toUpperCase()}</span>
        <span>{usage.used}/{usage.total}</span>
        <span>{percent}% used</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-[#faeccb] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#fab731] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
