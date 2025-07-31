// app/api/mood-logs/route.js

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL_MS = 1000 * 60; // 1 minute

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
      }
    }
  );

  // Step 1: Check cache
  const cached = cache.get(token);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data);
  }

  // Step 2: Fetch from Supabase
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

  // Step 3: Cache the result
  cache.set(token, { data: moodLogs, timestamp: now });

  return NextResponse.json(moodLogs);
}
