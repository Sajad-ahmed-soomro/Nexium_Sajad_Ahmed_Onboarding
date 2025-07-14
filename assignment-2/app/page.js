"use client"

import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Footer from "@/components/Footer"
import { useState } from "react"
import Typewriter from "typewriter-effect"

export default function Home() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)
  const [translated, setTranslated] = useState(null)
  const [error, setError] = useState("")

  const addUrl = async () => {
    setError("")
    setLoading(true)
    setSummary(null)
    setTranslated(null)

    if (!url.trim()) {
      setError("Please enter a blog URL!")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!res.ok) {
        throw new Error("Failed to summarize blog")
      }

      const data = await res.json()
      setSummary(data.summary)
      setTranslated(data.translated)
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-[7.0rem] px-4">
        <div className="flex flex-col items-center px-5 py-4 max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-white leading-tight">
          <span className="block">Summarize any</span>
          <span className="block text-blue-400">
            <Typewriter
              options={{
                strings: ["blog", "paragraph", "essay"],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </span>
        </h1>

          <input
            className="mb-[1.2rem] px-4 py-[0.6rem] w-full max-w-md bg-transparent border border-white placeholder:text-white text-white focus:outline-none focus:ring-2 focus:ring-white transition"
            placeholder="Enter URL..."
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={addUrl}
            disabled={loading}
            className="flex items-center justify-center w-[120px] px-4 py-2 border border-white text-white text-center rounded-md hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Summarize"}
          </button>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          {summary && (
            <div className="mt-8 w-full text-white">
              <h2 className="text-xl font-semibold mb-2">AI Summary</h2>
              <p className="bg-white/10 p-4 rounded">{summary}</p>
            </div>
          )}

          {translated && (
            <div className="mt-6 w-full text-white">
              <h2 className="text-xl font-semibold mb-2">Urdu Translation</h2>
              <p className="bg-white/10 p-4 rounded">{translated}</p>
            </div>
          )}
        </div>
      </div>
      <About/>
      <Footer/>
    </>
  )
}
