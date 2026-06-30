// app/api/ai-journal/route.js

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { redis } from "../../lib/redis";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// TTL in seconds (1 hour)
const TTL_SECONDS = 3600;

// Redis cache keys
const entryCacheKey = (userId) => `journal:entry:${userId}`;
const sessionsCacheKey = (userId) => `journal:sessions:${userId}`;

// POST: Save journal entry + AI response
export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { entry } = await req.json();

    const cacheKey = entryCacheKey(user.id);

    // Try Redis cache (optional)
    if (redis) {
      try {
        const cached = await redis.get(cacheKey);

        if (cached) {
          console.log("📦 Returning cached response");
          return NextResponse.json(cached);
        }
      } catch (err) {
        console.warn("⚠️ Redis unavailable:", err.message);
      }
    }

    // Ensure env variable exists
    if (!process.env.AI_HEALTH_ASSISTANT) {
      throw new Error(
        "AI_HEALTH_ASSISTANT environment variable is not configured"
      );
    }

    // Call n8n
    const aiRes = await fetch(process.env.AI_HEALTH_ASSISTANT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entry,
        sessionId: user.id,
      }),
    });

    if (!aiRes.ok) {
  const errorText = await aiRes.text();

  console.error("n8n status:", aiRes.status);
  console.error("n8n response:", errorText);

  throw new Error(
    `n8n webhook failed (${aiRes.status}): ${errorText}`
  );
}

    // const { summary, questions } = await aiRes.json();
    // console.log("✅ n8n response:", { summary, questions });

//     const raw = await aiRes.json();
// console.log("RAW N8N RESPONSE:", JSON.stringify(raw, null, 2));
// const { summary, questions } = raw;

const raw = await aiRes.json();
const { summary, questions } = Array.isArray(raw) ? raw[0] : raw;
    // Save in Supabase
    const { error: insertError } = await supabaseAdmin
      .from("chat_sessions")
      .insert({
        user_id: user.id,
        entry,
        summary,
        questions,
      });

    if (insertError) {
      console.error(insertError);
      return NextResponse.json(
        { error: "DB insert failed" },
        { status: 500 }
      );
    }

    const responsePayload = {
      summary,
      questions,
    };

    // Cache response (optional)
    if (redis) {
      try {
        await redis.set(cacheKey, responsePayload, {
          ex: TTL_SECONDS,
        });
      } catch (err) {
        console.warn("⚠️ Redis unavailable:", err.message);
      }
    }

    return NextResponse.json(responsePayload);
  } catch (err) {
    console.error("🔥 POST Error:", err);

    return NextResponse.json(
      {
        error: err.message || "AI processing failed",
      },
      {
        status: 500,
      }
    );
  }
}

// GET: Retrieve journal sessions
export async function GET(req) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const cacheKey = sessionsCacheKey(user.id);

    // Try Redis cache (optional)
    if (redis) {
      try {
        const cachedSessions = await redis.get(cacheKey);

        if (cachedSessions) {
          console.log("📦 Returning cached sessions");
          return NextResponse.json(cachedSessions);
        }
      } catch (err) {
        console.warn("⚠️ Redis unavailable:", err.message);
      }
    }

    const { data, error } = await supabaseAdmin
      .from("chat_sessions")
      .select("entry, summary, questions, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    // Cache sessions (optional)
    if (redis) {
      try {
        await redis.set(cacheKey, data, {
          ex: TTL_SECONDS,
        });
      } catch (err) {
        console.warn("⚠️ Redis unavailable:", err.message);
      }
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("🔥 GET Error:", err);

    return NextResponse.json(
      {
        error: err.message || "Unexpected server error",
      },
      {
        status: 500,
      }
    );
  }
}