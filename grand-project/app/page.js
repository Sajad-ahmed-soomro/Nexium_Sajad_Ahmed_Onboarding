"use client";

import { useEffect } from "react";
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
      {/* Navbar */}
      {/* Blue Navbar */}
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
        {['about', 'contact'].map((path) => (
          <motion.div
            key={path}
            whileHover={{
              scale: 1.1,
              color: '#c7d2fe',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="px-2 py-1 rounded-md"
          >
            <Link href={`/${path}`} className="transition duration-200">
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          </motion.div>
        ))}

        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 4px 16px rgba(255, 255, 255, 0.4)',
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            href="/get-started"
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            Login
          </Link>
        </motion.div>
      </div>
    </nav>


      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <motion.h1
          className="text-5xl font-bold mb-4"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          Track Your <span className="text-indigo-600">Well-being</span> Daily
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          A safe space to reflect, grow, and monitor your mental health journey.
        </p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            onClick={() => router.push("/get-started")}
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            onClick={() => router.push("/learn")}
          >
            Learn More
          </motion.button>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-white"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          How We Help You
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Daily Mood Tracking",
              desc: "Keep a simple mood diary and see patterns in your emotions.",
            },
            {
              title: "Progress Insights",
              desc: "Visualize your mental health journey with clear, insightful charts.",
            },
            {
              title: "Confidential & Secure",
              desc: "Your personal reflections remain private and secured with us.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
              className="bg-white p-6 rounded-xl shadow transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-16 bg-indigo-600 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          onClick={() => router.push("/get-started")}
        >
          Get Started
        </motion.button>
      </motion.section>
    </main>
  );
};

export default Home;
