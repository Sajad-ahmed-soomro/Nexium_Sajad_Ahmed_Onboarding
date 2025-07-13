"use client"

import React, { useState } from "react"
import Image from "next/image"
import { assets } from "@/app/assets/assets"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="w-full fixed top-0 z-50 bg-[hsl(262_83%_60%)] text-white shadow-md">
      <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src={assets.logo} alt="Logo" width={35} height={35} />
          <span className="text-lg font-semibold">Blog Summarizer</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-10 text-[1.1rem] font-medium">
          <a href="/" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#footer" className="hover:underline">Contact</a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-[hsl(262_83%_60%)] transition-all duration-200">
          <nav className="flex flex-col space-y-3 text-base">
            <a href="/" className="hover:underline" onClick={toggleMenu}>Home</a>
            <a href="#about" className="hover:underline" onClick={toggleMenu}>About</a>
            <a href="#footer" className="hover:underline" onClick={toggleMenu}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
