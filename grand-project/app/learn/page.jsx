'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const LearnPage = () => {
  return (
    <main className="text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-indigo-600 mb-4"
        >
          Learn How MindTrack Supports Your Well-being
        </motion.h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover how daily mood tracking and journaling can help you feel more in control, aware, and at peace.
        </p>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why It Matters</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Boost Self-Awareness',
              text: 'Journaling helps you better understand your feelings and triggers.',
              icon: '🧠',
            },
            {
              title: 'Spot Patterns',
              text: 'See trends in your mood and behavior over time.',
              icon: '📈',
            },
            {
              title: 'Build Resilience',
              text: 'Track coping strategies that work for you and reinforce habits.',
              icon: '💪',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-gray-100 text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How to Use MindTrack</h2>
          <div className="space-y-6 text-left">
            {[
              'Log your mood daily with 1 click.',
              'Optionally write a short journal entry.',
              'Tag what affected your mood (e.g., work, sleep).',
              'Get weekly summaries and reflection prompts.',
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-4 bg-white rounded-xl shadow"
              >
                <span className="font-bold text-indigo-600 mr-2">{i + 1}.</span>
                {step}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journaling Tips */}
      <section className="bg-indigo-600 text-white py-20 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Tips for Meaningful Journaling
        </motion.h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Be honest. Be gentle. You don’t need to write a lot — just enough to release or reflect.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          <ul className="space-y-4">
            <li>🌱 Keep it short but consistent</li>
            <li>🕰 Write at the same time daily</li>
          </ul>
          <ul className="space-y-4">
            <li>💡 Use prompts if you're stuck</li>
            <li>🔐 Remember: it's private and just for you</li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">You're Ready to Begin</h2>
        <p className="text-gray-600 mb-6">Start tracking your mood and reflecting on your thoughts today.</p>
        <Link
          href="/get-started"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
};

export default LearnPage;
