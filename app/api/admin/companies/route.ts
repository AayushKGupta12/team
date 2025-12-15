import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { domain } = body;

  let logo_url = null;

  try {
    const res = await fetch(
      `https://img.logo.dev/${domain}?token=${process.env.LOGO_API_TOKEN}`
    );

    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const path = `${domain}.png`;

      await supabase.storage
        .from("company-logos")
        .upload(path, Buffer.from(buffer), { upsert: true });

      logo_url = supabase.storage
        .from("company-logos")
        .getPublicUrl(path).data.publicUrl;
    }
  } catch {}

  await supabase.from("companies").insert({
    ...body,
    logo_url
  });

  return NextResponse.json({ success: true });
}
