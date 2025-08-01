"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdEmail, MdPhone } from "react-icons/md";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
        <nav className="flex justify-between items-center py-4 px-8 bg-indigo-600 text-white shadow sticky top-0 z-50">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          MindTrack
        </motion.div>

        <div className="space-x-6 flex items-center">
          <motion.div
            whileHover={{ scale: 1.1, color: "#c7d2fe", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-2 py-1 rounded-md"
          >
            <Link href="/">Home</Link>
          </motion.div>
        
        </div>
      </nav>


      {/* Contact Section */}
      <section className="px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Get in Touch
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-20 max-w-5xl mx-auto">
          {/* Illustration */}
          <div className="w-64 h-64">
            <img
              src="/contact.svg"
              alt="Contact Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Form + Contact Icons */}
          <div className="w-full max-w-md">
            <div className="flex justify-center gap-6 text-indigo-600 text-2xl mb-6">
              <a href="mailto:sajadahmedsoomro321@gmail.com" className="hover:text-indigo-800">
                <MdEmail />
              </a>
              <a href="tel:+923093637262" className="hover:text-indigo-800">
                <MdPhone />
              </a>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-indigo-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-indigo-500"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-indigo-500"
              ></textarea>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        © 2025 MindTrack — All rights reserved.
      </footer>
    </main>
  );
};

export default ContactPage;
