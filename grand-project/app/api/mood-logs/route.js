// app/api/mood-logs/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: userError
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { mood, note, tags } = body;


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
