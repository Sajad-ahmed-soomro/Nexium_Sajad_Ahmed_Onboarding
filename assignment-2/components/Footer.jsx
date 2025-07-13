"use client"

import React from "react"
import Image from "next/image"

const Footer = () => {
  return (
    <footer
      id="footer"
      className="mt-20 bg-transparent py-10 text-white px-6"
    >
      {/* Contact GIF centered */}
      <div className="flex justify-center mb-20">
              <Image
          src="/images/contact.gif"
          alt="Contact GIF"
          width={400}
          height={400}
          unoptimized
          className="rounded-xl shadow-xl opacity-90 mix-blend-lighten"
        />
      </div>

      {/* Footer Text aligned to left */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-left mt-10">
        <p className="text-sm">
          © 2025 Blog Summariser. All rights reserved.
        </p>
        <p className="text-sm">
          Contact:{" "}
          <a
            href="mailto:sajadahmedsoomro321@gmail.com"
            className="underline hover:text-blue-400 transition-colors"
          >
            sajadahmedsoomro321@gmail.com
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
