"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import moodAnimation from "../public/lottie/Emotions.json";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const moodOptions = ["happy", "neutral", "sad"];

const MoodLogs = () => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const submitLog = async () => {
    if (!mood) {
      setError("Please select a mood");
      return;
    }

    setMessage("");
    setError("");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      setError("Session error. Please log in again.");
      return;
    }

    const accessToken = session.access_token;
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    try {
      const res = await fetch("/api/mood-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ mood, note, tags }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Mood logged successfully!");
        setMood("");
        setNote("");
        setTags([]);
      } else {
        setError(data.error || "Failed to log mood.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-fit p-6 bg-white shadow-lg rounded-2xl border space-y-1">
      <div className="flex justify-center">
        <div className="w-48 sm:w-56">
          <Lottie animationData={moodAnimation} loop autoplay />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800">
        How are you feeling today?
      </h2>

      {/* Mood Buttons */}
      <div className="flex justify-center gap-3">
        {moodOptions.map((option) => (
          <motion.button
            key={option}
            onClick={() => setMood(option)}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: mood === option ? 1.1 : 1,
              backgroundColor: mood === option ? "#2563eb" : "#fff",
              color: mood === option ? "#fff" : "#374151",
              borderColor: mood === option ? "#2563eb" : "#d1d5db",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-4 py-2 rounded-full border text-sm font-medium shadow-sm"
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Note */}
      <label className="text-sm font-medium text-gray-600">Optional Note</label>
      <textarea
        placeholder="Write an optional note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded-md p-3 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {/* Tags */}
      <label className="text-sm font-medium text-gray-600">Tags</label>
      <input
        type="text"
        placeholder="Add a tag (e.g. work, tired)"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
        className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.span
            key={index}
            layout
            className="inline-flex items-center bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
            >
              &times;
            </button>
          </motion.span>
        ))}
      </div>

      {/* Submit */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={submitLog}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Save Mood Log
      </motion.button>

      {/* Message Feedback */}
      <AnimatePresence>
        {message && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-green-600 text-sm text-center pt-2"
          >
            {message}
          </motion.div>
        )}
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-sm text-center pt-2"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodLogs;
