import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useUsageStatus() {
  const { user } = useUser();
  const [usage, setUsage] = useState<any>(null);

  async function fetchStatus() {
    if (!user) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/usage-status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      }
    );

    const data = await res.json();
    setUsage(data);
  }

  // 🔁 CLIENT-SIDE SCHEDULER
  useEffect(() => {
    if (!user) return;

    fetchStatus(); // initial fetch

    const interval = setInterval(() => {
      fetchStatus();
    }, 5000); // ⏱ refresh every 5 seconds

    return () => clearInterval(interval);
  }, [user]);

  return { usage, fetchStatus };
}
