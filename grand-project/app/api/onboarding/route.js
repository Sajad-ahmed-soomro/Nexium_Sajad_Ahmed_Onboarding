import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  const body = await request.json();
  const { name, focus } = body;

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), { status: 401 });
  }

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
    return new Response(JSON.stringify({ error: userError?.message || "Unauthorized" }), {
      status: 401,
    });
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    name,
    focus,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "Profile saved successfully" }), {
    status: 200,
  });
}
