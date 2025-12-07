// app/api/clerk-webhook/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseServer";

export async function POST(req: Request) {
  const rawBody = await req.text();

  // --- Parse event ---
  let event: any;
  try {
    event = JSON.parse(rawBody || "{}");
  } catch (err) {
    console.error("❌ Failed to parse webhook JSON:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = event.type ?? event.event ?? event.action ?? null;
  const payload = event.data ?? event.object ?? event;

  console.log("📩 Incoming Clerk webhook:", { type });

  // Ignore nonsense / empty calls
  if (!type || typeof type !== "string") {
    console.log("ℹ️ Ignoring unsupported webhook type:", type);
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    if (
      type === "user.created" ||
      type === "user.updated" ||
      type.includes("user")
    ) {
      const user = payload.user ?? payload;
      const clerkId = user.id ?? user.user_id ?? user.object?.id;

      if (!clerkId) throw new Error("No clerk user id found in webhook payload");

      // Name
      const name =
        `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
        user.full_name ||
        null;

      // Email
      const primaryEmailId = user.primary_email_address_id;
      let email: string | null =
        user.primary_email_address?.email_address ||
        user.email ||
        null;

      if (!email && Array.isArray(user.email_addresses)) {
        const primary = user.email_addresses.find(
          (e: any) => e.id === primaryEmailId
        );
        email =
          primary?.email_address || user.email_addresses[0]?.email_address || null;
      }

      // Avatar
      const avatar =
        user.image_url ?? user.avatar_url ?? user.profile_image_url ?? null;

      // updated_at (seconds or ms or ISO)
      let clerkUpdatedAt: string;
      const rawUpdated = user.updated_at;
      if (typeof rawUpdated === "number") {
        clerkUpdatedAt =
          rawUpdated > 1e12
            ? new Date(rawUpdated).toISOString()
            : new Date(rawUpdated * 1000).toISOString();
      } else if (rawUpdated) {
        clerkUpdatedAt = new Date(rawUpdated).toISOString();
      } else {
        clerkUpdatedAt = new Date().toISOString();
      }

      console.log("🧩 Webhook user payload:", {
        clerkId,
        name,
        email,
        avatar,
        clerkUpdatedAt,
      });

      // Optional idempotency check
      const { data: existing, error: existingError } = await supabaseAdmin
        .from("users")
        .select("clerk_updated_at")
        .eq("clerk_user_id", clerkId)
        .maybeSingle();

      if (existingError) {
        console.error("❌ Supabase select error:", existingError);
      }

      if (
        existing?.clerk_updated_at &&
        new Date(existing.clerk_updated_at) >= new Date(clerkUpdatedAt)
      ) {
        console.log("↩️ Skipping upsert; existing row is newer or equal");
        return NextResponse.json({ ok: true, skipped: true });
      }

      // Upsert user row
      const { data, error } = await supabaseAdmin
        .from("users")
        .upsert(
          {
            clerk_user_id: clerkId,
            name,
            email,
            avatar_url: avatar,
            clerk_updated_at: clerkUpdatedAt,
          },
          { onConflict: "clerk_user_id" }
        )
        .select();

      if (error) {
        console.error("❌ Supabase upsert error", error);
        return NextResponse.json(
          { error: "DB error", details: error },
          { status: 500 }
        );
      }

      console.log("✅ Supabase upsert result:", data);
    } else if (type === "user.deleted") {
      const user = payload.user ?? payload;
      const clerkId = user.id;
      console.log("🗑 Deleting user with clerk_user_id:", clerkId);
      const { error } = await supabaseAdmin
        .from("users")
        .delete()
        .eq("clerk_user_id", clerkId);

      if (error) {
        console.error("❌ Supabase delete error", error);
        return NextResponse.json(
          { error: "DB delete error", details: error },
          { status: 500 }
        );
      }
    } else {
      console.log("ℹ️ Ignoring unsupported webhook type (no user op):", type);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ Webhook handler error:", err?.message || err);
    return NextResponse.json(
      { error: "handler error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
