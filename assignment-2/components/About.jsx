"use client"

import React from "react"

const About = () => {
  return (
    <main id="about" className="min-h-screen flex items-center justify-center px-4 py-12 bg-transparent text-white mt-22">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">About Blog Summariser</h1>
        <p className="text-lg leading-8 mb-4">
          Blog Summariser is a simple web tool designed to help you quickly grasp the essence of any blog article. Instead of reading long-form content, users can paste a blog URL and get a short, easy-to-read summary in seconds.
        </p>
        <p className="text-lg leading-8 mb-4">
          The tool processes the content of a blog, generates a summarized version, and translates it into Urdu for bilingual accessibility. It aims to save time, improve comprehension, and enhance accessibility to valuable online content.
        </p>
        <p className="text-lg leading-8">
          Whether you're researching, learning, or exploring, Blog Summariser helps you focus on what matters — the core ideas.
        </p>
      </div>
    </main>
  )
}

export default About
