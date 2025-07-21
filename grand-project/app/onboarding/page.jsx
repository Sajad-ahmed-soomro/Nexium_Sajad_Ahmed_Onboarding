"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MdMood, MdPsychology, MdFavorite } from "react-icons/md";
import { useRouter } from "next/navigation";

const steps = ["name", "focus", "confirm"];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const nextStep = () => setStep((prev) => prev + 1);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/save-profile", {
        method: "POST",
        body: JSON.stringify({ name, focus }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) router.push("/dashboard");
      else console.error("Failed to save profile");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center space-y-4"
      >
        {step === 0 && (
          <>
            <motion.h1 className="text-2xl font-bold text-indigo-700">
              Welcome! What can we call you?
            </motion.h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border p-3 rounded focus:outline-indigo-500"
            />
            <button
              onClick={nextStep}
              disabled={!name.trim()}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
            >
              Next
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <motion.h1 className="text-2xl font-bold text-indigo-700">
              Hi {name}, What do you want to focus on?
            </motion.h1>
            <div className="grid grid-cols-1 gap-4">
              {["Mood", "Anxiety", "Depression"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFocus(item);
                    nextStep();
                  }}
                  className="flex items-center justify-center gap-2 border p-3 rounded hover:bg-indigo-50 transition"
                >
                  {item === "Mood" && <MdMood />}
                  {item === "Anxiety" && <MdPsychology />}
                  {item === "Depression" && <MdFavorite />}
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <motion.h1 className="text-2xl font-bold text-indigo-700">
              You're all set, {name}!
            </motion.h1>
            <p className="text-gray-600">We'll help you track your {focus} journey.</p>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Go to Dashboard"}
            </button>
          </>
        )}
      </motion.div>
    </main>
  );
};

export default OnboardingPage;
