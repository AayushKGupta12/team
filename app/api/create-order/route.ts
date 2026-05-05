// app/api/create-order/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  // 🔒 Security: reject anything outside allowed range
  if (!amount || amount < 10 || amount > 100) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID!;
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: amount * 100, // INR → paise
      currency: "INR",
      receipt: `_thanks_${Date.now()}`,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const order = await response.json();
  return NextResponse.json({ orderId: order.id });
}