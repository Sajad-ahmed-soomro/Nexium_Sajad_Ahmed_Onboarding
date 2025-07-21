"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDashboard, MdLogout } from "react-icons/md";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


const Dashboard = () => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">MindTrack</h2>
          <nav className="space-y-4">
            <button className="flex items-center gap-2 hover:bg-indigo-700 p-2 rounded">
              <MdDashboard /> Dashboard
            </button>
          </nav>
        </div>
        <button className="flex items-center gap-2 hover:bg-indigo-700 p-2 rounded">
          <MdLogout /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          Welcome back, {user?.email || "Guest"}!
        </motion.h1>

        <p className="text-gray-600 mb-4">
          Here is your daily mental health summary:
        </p>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Mood Logs</h3>
            <p className="text-gray-600">View and reflect on your past mood entries.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Progress Charts</h3>
            <p className="text-gray-600">Visualize your mood trends and insights.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">AI Suggestions</h3>
            <p className="text-gray-600">Get personalized suggestions powered by AI.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
