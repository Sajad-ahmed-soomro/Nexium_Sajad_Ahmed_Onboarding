import { NextResponse } from 'next/server'
import { supabaseAdmin, supabasePublic } from '../../lib/supabase'

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Use anon key for auth.getUser
    const {
      data: { user },
      error: userError
    } = await supabasePublic.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { mood, note, tags } = body;

    // ✅ Use service role for DB insert
    const { error: insertError } = await supabaseAdmin
      .from("mood_logs")
      .insert({
        user_id: user.id,
        mood,
        note,
        tags
      });

    if (insertError) {
      console.error("Insert error:", insertError.message);
      return NextResponse.json({ error: "Failed to insert log" }, { status: 500 });
    }

    return NextResponse.json({ message: "Mood log saved" }, { status: 200 });

  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
