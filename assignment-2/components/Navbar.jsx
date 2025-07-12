"use client"

import React from "react"
import Image from "next/image"
import { assets } from "@/app/assets/assets"

const Navbar = () => {
  return (
    <header className="w-full text-white shadow-md mt-[1.8rem]">
      <div className="relative flex items-center h-16 px-6 max-w-7xl mx-auto pl-[2.4rem]">

        {/* Logo */}
        <div className="ml-10 flex items-center gap-[1.1rem]">
          <Image src={assets.logo} alt="Logo" width={35} height={35} />
          <span className="text-lg font-semibold">Blog Summariser</span>
        </div>

        {/* Centered nav links */}
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-[3.4rem] text-[1.2rem] font-sm list-none">
            <li>
              <a href="/" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:underline">About</a>
            </li>
            <li>
              <a href="#footer" className="hover:underline">Contact</a>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  )
}

export default Navbar
