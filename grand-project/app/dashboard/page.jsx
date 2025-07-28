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
import Lottie from "lottie-react";

import JournalAssistant from "@/components/JournalAssistant";
import MoodLogs from "@/components/MoodLogs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Dashboard = () => {
  const [animationData, setAnimationData] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showJournal, setShowJournal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", icon: <MdDashboard />, onClick: () => setActiveSection("Dashboard") },
    { name: "Mood Logs", icon: <MdEdit />, onClick: () => setActiveSection("MoodLogs") },
    { name: "Progress", icon: <MdBarChart />, onClick: () => setActiveSection("Progress") },
    { name: "AI Journal", icon: <MdEdit />, onClick: () => setShowJournal(true) },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signup");
  };

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

  useEffect(() => {
    fetchProfile();
    fetch("/lottie/ComingSoon.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => console.log("Animation file not found"));
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-100">
      {/* Sidebar */}
      <aside className="md:w-64 bg-white shadow-md flex flex-col justify-between p-4 md:min-h-screen">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-indigo-700">MindTrack</h1>
            <button
              className="md:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MdMenu />
            </button>
          </div>

          <nav className={`space-y-2 ${menuOpen ? "block" : "hidden"} md:block`}>
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-100 transition ${
                  activeSection === item.name && !showJournal
                    ? "bg-indigo-200 text-indigo-700"
                    : ""
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded-xl hover:bg-red-100 text-red-600 transition"
        >
          <MdLogout />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {showJournal ? (
          <JournalAssistant onBack={() => setShowJournal(false)} userId={userId} />
        ) : activeSection === "MoodLogs" ? (
          <MoodLogs userId={userId} />
        ) : activeSection === "Progress" ? (
          <div className="text-center mt-20 text-xl font-medium text-indigo-700">
            Weekly Progress Summary Coming Soon 🚀
          </div>
        ) : (
          <div className="w-full">
            {/* Top Welcome Message + Animation */}
            <div className="flex flex-col md:flex-row justify-center items-center mr-10 ml-10 gap-2 md:gap-4 mb-4">

              <div className="flex-1">
                <h2 className="text-3xl font-semibold text-indigo-700 mb-2">
                  Welcome, {profile?.name || "User"}!
                </h2>
                <p className="text-lg text-gray-600">
                  Let’s focus on your{" "}
                  <span className="font-semibold text-indigo-600">{profile?.focus}</span> today.
                </p>
              </div>
              {animationData && (
                <Lottie
                  animationData={animationData}
                  className="w-56 h-56 md:w-72 md:h-72"
                  loop
                />
              )}
            </div>

            {/* Optional Additional Content */}
            <div className="text-center text-indigo-600">
              Select a section from the sidebar to begin tracking your journey 🌱
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
