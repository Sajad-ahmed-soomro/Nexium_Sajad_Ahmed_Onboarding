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

    let scrapedText = ""
    let usedSimulated = false
    let translationFailed = false

    // Scrape blog
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
      scrapedText = "This blog discusses the benefits of daily meditation for improving mental health."
    }

    const summary = usedSimulated
      ? "Meditation helps improve mental health if done daily."
      : generateSimpleSummary(scrapedText)

    // Translate to Urdu
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
      urduSummary = translationRes.data?.translatedText || "ترجمہ دستیاب نہیں۔"
    } catch (err) {
      console.error("Translation failed, using fallback Urdu summary:", err.message)
      translationFailed = true
      urduSummary = "ترجمہ دستیاب نہیں۔"
    }

    // Save to Supabase
    try {
      const { error: supabaseError } = await supabase.from("summaries").insert([
        {
          url,
          summary,
          urdu_summary: urduSummary,
          full_text: scrapedText,
        },
      ])
      if (supabaseError) {
        throw new Error(supabaseError.message)
      }
    } catch (err) {
      console.warn("Supabase insert failed, continuing:", err.message)
    }

    // Save to MongoDB
    try {
      await mongoClient.connect()
      const db = mongoClient.db(mongoDbName)
      const collection = db.collection("blogs")
      await collection.insertOne({ url, content: scrapedText, createdAt: new Date() })
    } catch (err) {
      console.warn("MongoDB insert failed, continuing:", err.message)
    } finally {
      await mongoClient.close()
    }

    return new Response(JSON.stringify({
      summary,
      translated: urduSummary,
      fallback: usedSimulated,
      translationFailed,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Fatal error, sending static fallback response:", err.message)

    return new Response(JSON.stringify({
      summary: "Meditation helps improve mental health if done daily.",
      translated: "مراقبہ دماغی صحت کو بہتر بنانے میں مدد کرتا ہے اگر روزانہ کیا جائے۔",
      fallback: true,
      translationFailed: true,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Simple summarizer
function generateSimpleSummary(text) {
  const sentences = text.split(". ")
  return sentences.slice(0, 2).join(". ") + "."
}
