import { useUser } from "@clerk/nextjs";

export function useUsageStatus() {
  const { user } = useUser();

  async function fetchStatus() {
    if (!user) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/usage-status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      }
    );

    return await res.json();
  }

  return { fetchStatus };
}
