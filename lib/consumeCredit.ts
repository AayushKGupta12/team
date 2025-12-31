export async function consumeCredit(
  userId: string,
  feature: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/check-usage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        feature,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.allowed) {
    return { allowed: false, data };
  }

  return { allowed: true, data };
}
