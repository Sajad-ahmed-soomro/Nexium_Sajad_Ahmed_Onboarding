"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { assets } from "@/app/assets/assets"

const Navbar = () => {
  return (
    <header className="w-full bg-[hsl(262_83%_60%)] text-white shadow-md">
      <div className="relative flex items-center h-16 px-6 max-w-7xl mx-auto pl-[2.4rem]">

        {/* Logo aligned slightly right from edge */}
        <div className="ml-10 flex items-center gap-2">
          <Image src={assets.logo} alt="Logo" width={35} height={35} />
          <span className="text-lg font-semibold">Blog Summariser</span>
        </div>
        
        {/* Nav links centered absolutely */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 gap-4">
          <ul className="flex gap-10 text-sm font-medium">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">About</Link>
            </li>
            <li>
              <Link href="#footer" className="hover:underline">Footer</Link>
            </li>
          </ul>
        </nav>

        
      </div>
    </header>
  )
}

export default Navbar
