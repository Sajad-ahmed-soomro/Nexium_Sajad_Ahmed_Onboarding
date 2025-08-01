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

const emojiMap = {
  happy: "😊",
  neutral: "😐",
  sad: "😞",
};

const labelMap = {
  happy: "Happy",
  neutral: "Neutral",
  sad: "Depressed",
};

const colorMap = {
  happy: "#22c55e",
  neutral: "#a3a3a3",
  sad: "#ef4444",
};

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
          date: new Date(entry.created_at).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          moodScore:
            entry.mood === "happy" ? 2 : entry.mood === "neutral" ? 1 : 0,
          moodLabel: entry.mood,
          id: entry.id || entry.created_at,
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
      className="max-w-4xl mx-auto p-6 mt-6 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50

"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Mood Trends
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : moodData.length === 0 ? (
        <p className="text-center text-gray-500">No mood data yet</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis
                domain={[0, 2]}
                ticks={[0, 1, 2]}
                tickFormatter={(val) => ["Sad", "Neutral", "Happy"][val]}
              />
              <Tooltip
                formatter={(value, name) =>
                  name === "moodScore"
                    ? ["Sad", "Neutral", "Happy"][value]
                    : value
                }
              />
              <Line
                type="monotone"
                dataKey="moodScore"
                stroke="#6366f1"
                strokeWidth={3}
                dot={({ cx, cy, payload }) => (
                  <g key={payload.id}>
                    <text
                      x={cx}
                      y={cy - 20}
                      textAnchor="middle"
                      fill={colorMap[payload.moodLabel]}
                      fontSize={12}
                      fontWeight="bold"
                    >
                      {labelMap[payload.moodLabel]}
                    </text>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={8}
                      fill={colorMap[payload.moodLabel]}
                    />
                    <text
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      fontSize={14}
                    >
                      {emojiMap[payload.moodLabel]}
                    </text>
                  </g>
                )}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* AI Mood Predictions */}
          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-3">AI Mood Predictions</h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-full px-2">

              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const moodIndex = [2, 2, 1, 0, 1, 0, 0][i];
                const mood = ["sad", "neutral", "happy"][moodIndex];
                return (
                  <div key={day} className="flex flex-col items-center">
                    <span className="text-lg font-medium">{day}</span>
                    <span className="text-2xl">{emojiMap[mood]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Trends;
