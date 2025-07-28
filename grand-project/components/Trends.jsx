"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Trends = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoodTrends = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;

      if (!accessToken) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/mood-trends", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to fetch mood trends");

        const transformed = result.map((entry) => ({
          date: new Date(entry.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          }),
          moodScore:
            entry.mood === "happy" ? 2 : entry.mood === "neutral" ? 1 : 0,
          moodLabel: entry.mood,
        }));

        setMoodData(transformed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodTrends();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Mood Trends
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : moodData.length === 0 ? (
        <p className="text-center text-gray-500">No mood data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              domain={[0, 2]}
              ticks={[0, 1, 2]}
              tickFormatter={(val) => ["Sad", "Neutral", "Happy"][val]}
            />
            <Tooltip
              formatter={(value, name) =>
                name === "moodScore" ? ["Sad", "Neutral", "Happy"][value] : value
              }
            />
            <Line
              type="monotone"
              dataKey="moodScore"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default Trends;
