"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ContactPage = () => {
  return (
    <main className='min-h-screen bg-white text-gray-800'>
        <nav className='flex justify-between items-center py-4 px-8 bg-indigo-600 text-white shadow sticky top-0 z-50'>
            <div className='text-2xl font-bold'>MindTrack</div>
            <div className='space-x-4'>
                <Link href="/" className="hover:underline">
                    Home
                </Link>
            </div>
        </nav>
        <section className='px-6 py-26 text-center'>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          Contact
        </motion.h1>
        </section>
    </main>
  )
}

export default ContactPage
