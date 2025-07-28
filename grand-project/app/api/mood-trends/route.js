import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const { data: moodLogs, error: moodError } = await supabase
    .from("mood_logs")
    .select("mood, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (moodError) {
    return NextResponse.json(
      { error: "Failed to fetch mood logs" },
      { status: 500 }
    );
  }

  return NextResponse.json(moodLogs);
}
