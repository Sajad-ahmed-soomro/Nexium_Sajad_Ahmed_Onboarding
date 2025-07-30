"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  MdDashboard,
  MdEdit,
  MdBarChart,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import JournalAssistant from "@/components/JournalAssistant";
import MoodLogs from "@/components/MoodLogs";
import Trends from "@/components/Trends";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const [animationData, setAnimationData] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showJournal, setShowJournal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [dailyQuote, setDailyQuote] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("No user session found:", userError);
        router.push("/signup");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("name, focus")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
        setUserId(user.id);
      }
    };

    fetchProfile();

    // Load Lottie animation
    fetch("/lottie/ComingSoon.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => console.log("Animation file not found"));
  }, []);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const tag = profile?.focus?.toLowerCase();
        const res = await fetch(
          `https://api.quotable.io/random?tags=${tag || "inspirational"}`
        );
        const data = await res.json();
        setDailyQuote(`${data.content} — ${data.author}`);
      } catch (error) {
        setDailyQuote("Stay strong. You got this. 🌱");
      }
    };

    if (profile) getQuote();
  }, [profile]);

  const navItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      onClick: () => {
        setActiveSection("Dashboard");
        setShowJournal(false);
      },
    },
    {
      name: "Mood Logs",
      icon: <MdEdit />,
      onClick: () => {
        setActiveSection("MoodLogs");
        setShowJournal(false);
      },
    },
    {
      name: "Trends",
      icon: <MdBarChart />,
      onClick: () => {
        setActiveSection("Trends");
        setShowJournal(false);
      },
    },
    {
      name: "AI Journal",
      icon: <MdEdit />,
      onClick: () => {
        setShowJournal(true);
      },
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signup");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-100 transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <aside className="md:w-64 bg-white shadow-lg flex flex-col justify-between p-4 md:min-h-screen rounded-tr-3xl md:rounded-tr-none">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">MindTrack</h1>
            <button
              className="md:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MdMenu />
            </button>
          </div>

          <nav className={`space-y-2 ${menuOpen ? "block" : "hidden"} md:block`}>
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  activeSection === item.name && !showJournal
                    ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
                    : "hover:bg-indigo-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </motion.button>
            ))}
          </nav>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded-xl hover:bg-red-100 text-red-600 transition text-sm mt-6"
        >
          <MdLogout className="text-xl" />
          Logout
        </motion.button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto relative">
        {showJournal ? (
          <JournalAssistant onBack={() => setShowJournal(false)} userId={userId} />
        ) : activeSection === "MoodLogs" ? (
          <MoodLogs userId={userId} />
        ) : activeSection === "Trends" ? (
          <Trends userId={userId} />
        ) : (
          <div className="w-full px-2 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8"
            >
              <div className="flex-1">
                <h2 className="text-3xl font-semibold text-indigo-700 mb-2">
                  Welcome, {profile?.name || "User"}!
                </h2>
                <p className="text-lg text-gray-600">
                  Let’s focus on your{" "}
                  <span className="font-semibold text-indigo-600">
                    {profile?.focus}
                  </span>{" "}
                  today.
                </p>
              </div>

              {animationData && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-60 md:w-72"
                >
                  <Lottie animationData={animationData} loop />
                </motion.div>
              )}
            </motion.div>

            {dailyQuote && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white border-l-4 border-indigo-500 shadow-md p-4 rounded-lg italic text-indigo-700 text-lg max-w-xl mx-auto"
              >
                “{dailyQuote}”
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
