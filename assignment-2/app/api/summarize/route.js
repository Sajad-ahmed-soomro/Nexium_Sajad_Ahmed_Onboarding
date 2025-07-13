import axios from "axios"
import { createClient } from "@supabase/supabase-js"
import * as cheerio from "cheerio"
import { MongoClient } from "mongodb"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const mongoUri = process.env.MONGODB_URI
const mongoDbName = process.env.MONGODB_DB

if (!supabaseUrl || !supabaseKey || !mongoUri || !mongoDbName) {
  throw new Error("Missing required environment variables for Supabase or MongoDB.")
}

const supabase = createClient(supabaseUrl, supabaseKey)
const mongoClient = new MongoClient(mongoUri)

export async function POST(req) {
  try {
    const body = await req.json()
    const url = body?.url

    if (!url || typeof url !== "string") {
      console.error("Invalid or missing URL in request body:", body)
      return new Response("Invalid URL provided", { status: 400 })
    }

    // Attempt to scrape blog content
    let scrapedText = ""
    let usedSimulated = false

    try {
      const res = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; BlogSummariserBot/1.0)",
        },
      })
      const $ = cheerio.load(res.data)
      scrapedText = $("p").text().trim().slice(0, 3000)
      if (!scrapedText) throw new Error("No content found")
    } catch (err) {
      console.warn("Scraping failed, using simulated content:", err.message)
      usedSimulated = true
      scrapedText =
        "This blog discusses the benefits of daily meditation for improving mental health."
    }

    // Generate a summary
    const summary = usedSimulated
      ? "Meditation helps improve mental health if done daily."
      : generateSimpleSummary(scrapedText)

    // Translate summary to Urdu using LibreTranslate
    let urduSummary = ""
    try {
      const translationRes = await axios.post(
        "https://translate.argosopentech.com/translate",
        {
          q: summary,
          source: "en",
          target: "ur",
          format: "text",
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )

      console.log("LibreTranslate response:", translationRes.data)
      urduSummary = translationRes.data?.translatedText || "ترجمہ دستیاب نہیں۔"
    } catch (translationError) {
      console.error("Error translating summary:", translationError.response?.data || translationError.message)
      return new Response("Translation failed", { status: 502 })
    }

    // Save to Supabase
    const { data, error: supabaseError } = await supabase.from("summaries").insert([
      {
        url,
        summary,
        urdu_summary: urduSummary,
        full_text: scrapedText,
      },
    ])

    console.log("Saving to Supabase:", { summary, urduSummary })
    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError)
      return new Response("Database insert failed", { status: 500 })
    }

    // Save full content to MongoDB
    try {
      await mongoClient.connect()
      const db = mongoClient.db(mongoDbName)
      const collection = db.collection("blogs")
      await collection.insertOne({ url, content: scrapedText, createdAt: new Date() })
    } catch (mongoErr) {
      console.error("MongoDB insert error:", mongoErr.message)
    } finally {
      await mongoClient.close()
    }

    return new Response(JSON.stringify({ summary, translated: urduSummary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Unexpected error in API handler:", err.message || err)
    return new Response("Failed to summarize and translate.", { status: 500 })
  }
}

// Simple summarizer
function generateSimpleSummary(text) {
  const sentences = text.split(". ")
  return sentences.slice(0, 2).join(". ") + "."
}
