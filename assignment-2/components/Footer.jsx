"use client"

import React from "react"
import Image from "next/image"
import { FaLinkedin, FaGithub } from "react-icons/fa"


const Footer = () => {
  return (
    <footer
      id="footer"
      className="mt-20 bg-transparent py-10 text-white px-6"
    >
      {/* Contact GIF centered */}
      <div className="flex flex-col items-center mb-10">
      <div className="flex justify-center mb-10">
        <Image
          src="/images/contact.gif"
          alt="Contact GIF"
          width={400}
          height={400}
          unoptimized
          className="rounded-xl shadow-xl opacity-90 mix-blend-lighten"
        />
      </div>

      <p>
          <span className="font font-semibold">Contact:{" "}</span>
          <a
            href="mailto:sajadahmedsoomro321@gmail.com"
            className="underline hover:text-blue-400 transition-colors"
          >
            sajadahmedsoomro321@gmail.com
          </a>
        </p>
        </div>

      <div className="flex flex-col sm:flex-row  items-center justify-between gap-4 text-sm">
        
      <p className="text-xs text-center">
        © 2025 Blog Summariser. All rights reserved.
      </p>
        <div className="flex gap-4 mr-6">
          <a
            href="https://github.com/Sajad-ahmed-soomro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sajad-ahmed/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

      {/* Copyright */}
     
      </div>

    </footer>
  )
}

export default Footer
