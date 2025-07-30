import { NextResponse } from "next/server";

// In-memory cache
let cachedQuote = null;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// Default fallback quotes
const defaultQuotes = [
  { text: "Breathe. You’re doing better than you think.", author: "Unknown" },
  { text: "Small steps every day lead to big changes.", author: "MindTrack" },
  { text: "You’ve survived 100% of your worst days.", author: "Anonymous" },
];

export async function GET() {
  const now = Date.now();

  // Return cached quote if it’s still valid
  if (cachedQuote && now - cachedQuote.timestamp < ONE_DAY_MS) {
    return NextResponse.json(cachedQuote);
  }

  try {
    // Fetch from Quotable API
    const res = await fetch("https://api.quotable.io/random?tags=inspirational|happiness");
    const data = await res.json();

    const quote = {
      text: data.content || defaultQuotes[0].text,
      author: data.author || defaultQuotes[0].author,
      timestamp: now,
    };

    cachedQuote = quote;

    return NextResponse.json(quote);
  } catch (error) {
    // Fallback to default quote
    const fallback = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
    cachedQuote = { ...fallback, timestamp: now };

    return NextResponse.json(cachedQuote);
  }
}
