"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);



const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/get-started"); 
      }
    };

    checkSession();
  }, [router]);
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
      {/* Blue Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-indigo-600 text-white shadow sticky top-0 z-50">
        <div className="text-2xl font-bold">MindTrack</div>
        <div className="space-x-6">
          <Link href="/about" className="hover:text-indigo-200 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-indigo-200 transition">
            Contact
          </Link>
          <Link href="/get-started" className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Track Your <span className="text-indigo-600">Well-being</span> Daily
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          A safe space to reflect, grow, and monitor your mental health journey.
        </p>
        <div className="flex gap-4">
        <Link href="/get-started" passHref>
          <button className="mt-4 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </Link>
        <Link href="/learn">
        <button className="mt-4 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
          Learn More
        </button>
        </Link>
      </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How We Help You</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Daily Mood Tracking</h3>
            <p className="text-gray-600">
              Keep a simple mood diary and see patterns in your emotions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Progress Insights</h3>
            <p className="text-gray-600">
              Visualize your mental health journey with clear, insightful charts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Confidential & Secure</h3>
            <p className="text-gray-600">
              Your personal reflections remain private and secured with us.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <Link href="/get-started">
          <button className="mt-4 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
