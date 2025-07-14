"use client"

import { assets } from "@/app/assets/assets"
import Image from "next/image"
import React from "react"

const About = () => {
  return (
    <main
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-16 bg-transparent text-white mt-[16.0rem]"
    >
      <div className="max-w-5xl w-full text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-white leading-tight">
          About <span className="text-blue-400">Blog Summarizer</span>
        </h1>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text Section */}
          <div className="md:w-1/2">
            <p className="text-lg md:text-xl leading-8 text-gray-200">
              <span className="block mb-4">
                <strong>Blog Summariser</strong> is a simple web tool designed to help you quickly grasp the essence of
                any blog article. Instead of reading long-form content, users can paste a blog URL and get a short,
                easy-to-read summary in seconds.
              </span>
              <span className="block mb-4">
                The tool processes the content of a blog, generates a summarized version, and translates it into Urdu
                for bilingual accessibility.
              </span>
              <span className="block">
                Whether you're researching, learning, or exploring, Blog Summariser helps you focus on what matters —
                the core ideas.
              </span>
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex items-center justify-center p-4">
            <Image
              src="/images/about.webp"
              alt="Illustration of a person summarizing a blog on a laptop"
              width={400}
              height={400}
              unoptimized
              className="rounded-3xl shadow-xl bg-transparent object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
