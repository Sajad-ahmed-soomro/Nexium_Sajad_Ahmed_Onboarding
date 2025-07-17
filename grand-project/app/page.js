"use client";
import { motion } from "framer-motion";

const Home=()=> {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
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
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
            Get Started
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            Learn More
          </button>
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
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
          Join Now — It's Free!
        </button>
      </section>
    </main>
  );
}

export default Home;