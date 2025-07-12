// components/Footer.jsx
"use client"

import React from "react"

const Footer = () => {
  return (
    <footer id="footer" className="mt-20 flex flex-row justify-between ml-2 mr-2 py-6 bg-transparent text-white text-center border-t border-white/30">
      <p className="text-sm mb-2">© 2025 Blog Summariser. All rights reserved.</p>
      <p className="text-sm mr-2">
        Contact: <a href="mailto:sajadahmedsoomro321@gmail.com" className="underline">sajadahmedsoomro321@gmail.com</a>
      </p>
    </footer>
  )
}

export default Footer
