import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { name, focus } = await req.json();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, name, focus });

    if (error) return new Response(error.message, { status: 500 });

    return new Response("Profile saved", { status: 200 });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}
