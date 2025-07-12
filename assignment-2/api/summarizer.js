// File: assignment-2/api/summarize.js

import axios from "axios"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req) {
  try {
    const { url } = await req.json()

    // Simulated blog scraping
    const scrapedText =
      "This blog discusses the benefits of daily meditation for improving mental health."

    // Simulated AI summary
    const summary = "Meditation helps improve mental health if done daily."

    // Translate to Urdu via LibreTranslate
    const translationRes = await axios.post("https://libretranslate.de/translate", {
      q: summary,
      source: "en",
      target: "ur",
      format: "text",
    })

    const urduSummary = translationRes.data.translatedText

    // Save summary to Supabase
    const { data, error } = await supabase.from("summaries").insert([
      {
        url,
        summary,
        urdu_summary: urduSummary,
        full_text: scrapedText,
      },
    ])

    if (error) throw error

    return new Response(
      JSON.stringify({ summary, urduSummary }),
      { status: 200 }
    )
  } catch (err) {
    console.error(err)
    return new Response("Failed to summarize and translate.", { status: 500 })
  }
}
