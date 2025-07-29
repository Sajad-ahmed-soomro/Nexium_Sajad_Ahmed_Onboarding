export async function POST(req) {
    const { entry } = await req.json();
  
    // Generate or retrieve a user-specific session ID (in production, use auth/user ID)
    const sessionid = "user-1234";
  
    try {
      const res = await fetch("http://localhost:5678/webhook-test/986a6f68-c50b-4196-8e84-34f9e0be3231", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ entry, sessionid }), // ✅ send both entry and sessionid
      });
  
      if (!res.ok) {
        throw new Error("n8n returned an error");
      }
  
      const data = await res.json();
  
      return Response.json({
        summary: data.summary,
        questions: data.questions,
      });
    } catch (error) {
      console.error("n8n AI error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to generate AI journal response" }),
        { status: 500 }
      );
    }
  }
  