"use client"

import React from "react"
import Image from "next/image"
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { ContactForm } from "./ContactForm"

const Footer = () => {
  return (
    <footer id="footer" className="mt-20 bg-transparent py-10 text-white px-6">
      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-30 mb-10">
        <div className="flex-shrink-0">
          <Image
            src="/images/contact.gif"
            alt="Contact GIF"
            width={400}
            height={400}
            unoptimized
            className="rounded-xl shadow-xl opacity-90 mix-blend-lighten"
          />
        </div>
        <div className="w-full max-w-md p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg">
  <ContactForm />
</div>

      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm border-t border-gray-500 pt-4 ml-10 mr-10">
        <p className="text-xs text-center">
          © 2025 Blog Summariser. All rights reserved.
        </p>
        <div className="flex gap-4">
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
      </div>
    </footer>
  )
}

export default Footer
