"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck } from "lucide-react";

const AboutPage = () => {
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

      {/* About Section */}
      <section className="px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          About <span className="text-indigo-600">MindTrack</span>
        </motion.h1>
        <HeartHandshake size={48} className="mx-auto text-indigo-600 mb-4" />
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          MindTrack is your personal mental wellness companion.  
          We help you reflect, monitor, and grow with daily mood tracking, progress insights, and a commitment to confidentiality.  
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-indigo-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-600">Our Mission</h2>
        <ShieldCheck size={40} className="mx-auto text-indigo-600 mb-4" />
        <p className="max-w-2xl mx-auto text-gray-700 text-lg">
          To empower individuals to take control of their mental health journey through  
          accessible, secure, and insightful tools — all in a safe, welcoming environment.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
