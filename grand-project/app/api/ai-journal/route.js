import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// POST: Save journal entry + AI response
export async function POST(req) {
  try {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
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

    // Get AI response from n8n
    const aiRes = await fetch(process.env.AI_HEALTH_ASSISTANT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry, sessionid: user.id }),
    });

    if (!aiRes.ok) throw new Error('n8n webhook failed');

    const { summary, questions } = await aiRes.json();

    // Save everything as a single row in chat_sessions
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

    return NextResponse.json({ summary, questions });
  } catch (err) {
    console.error('Error in ai-journal POST:', err);
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
}

// GET: Retrieve all past journal sessions
export async function GET(req) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
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

  const { data, error } = await supabaseAdmin
    .from('chat_sessions')
    .select('entry, summary, questions, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Supabase fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }

  return NextResponse.json(data);
}
