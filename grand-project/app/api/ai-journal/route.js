// app/api/ai-journal/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { redis } from '../../lib/redis';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// TTL in seconds (1 hour)
const TTL_SECONDS = 3600;

// Redis cache keys
const entryCacheKey = (userId) => `journal:entry:${userId}`;
const sessionsCacheKey = (userId) => `journal:sessions:${userId}`;

// POST: Save journal entry + AI response (with Redis caching)
export async function POST(req) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entry } = await req.json();
    const cacheKey = entryCacheKey(user.id);

    // Check Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }


    // Get AI response from n8n
    const aiRes = await fetch(process.env.AI_HEALTH_ASSISTANT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry, sessionid: user.id }),
    });

    if (!aiRes.ok) throw new Error('n8n webhook failed');
    const { summary, questions } = await aiRes.json();

    // Save in Supabase
    const { error: insertError } = await supabaseAdmin.from('chat_sessions').insert({
      user_id: user.id,
      entry,
      summary,
      questions,
    });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 });
    }

    const responsePayload = { summary, questions };

    // Cache this response
    await redis.set(cacheKey, responsePayload, { ex: TTL_SECONDS });
    console.log(`[REDIS SET] Entry cache stored for user: ${user.id}`);

    return NextResponse.json(responsePayload);
  } catch (err) {
    console.error('Error in ai-journal POST:', err);
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
}

// GET: Retrieve all past journal sessions (with optional Redis cache)
export async function GET(req) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cacheKey = sessionsCacheKey(user.id);

    const cachedSessions = await redis.get(cacheKey);
    if (cachedSessions) {
      return NextResponse.json(cachedSessions);
    }


    const { data, error } = await supabaseAdmin
      .from('chat_sessions')
      .select('entry, summary, questions, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }

    // Cache sessions for future GETs
    await redis.set(cacheKey, data, { ex: TTL_SECONDS });

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error in ai-journal GET:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
