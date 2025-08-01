import { NextResponse } from 'next/server'
import { supabaseAdmin, supabasePublic } from '../../lib/supabase'

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    console.log("🔐 Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ Missing or invalid token");
      return NextResponse.json({ error: "Missing or invalid token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: userError
    } = await supabasePublic.auth.getUser(token);

    console.log("👤 Authenticated User:", user);

    if (userError || !user) {
      console.error("❌ Unauthorized:", userError?.message);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { mood, note, tags } = body;

    console.log("📝 Mood Log Input:", { mood, note, tags });

    const { error: insertError } = await supabaseAdmin
      .from("mood_logs")
      .insert({
        user_id: user.id,
        mood,
        note,
        tags
      });

    if (insertError) {
      console.error("❌ Insert error:", insertError.message);
      return NextResponse.json({ error: "Failed to insert log" }, { status: 500 });
    }

    console.log("✅ Mood log inserted successfully");

    return NextResponse.json({ message: "Mood log saved" }, { status: 200 });

  } catch (err) {
    console.error("🔥 Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
