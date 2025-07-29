'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const JournalAssistant = () => {
  const [entry, setEntry] = useState('');
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [questions, setQuestions] = useState([]);
  const [debouncedEntry, setDebouncedEntry] = useState('');

  // Debounce entry to auto-submit like chat after typing stops
  useEffect(() => {
    if (!entry.trim()) return;
    setTyping(true);
    const timeout = setTimeout(() => {
      setDebouncedEntry(entry);
      setTyping(false);
    }, 1200); // 1.2s pause triggers submit
    return () => clearTimeout(timeout);
  }, [entry]);

  // Auto submit when debounced entry is ready
  useEffect(() => {
    if (!debouncedEntry.trim()) return;
    handleSubmit(debouncedEntry);
  }, [debouncedEntry]);

  const handleSubmit = async (text) => {
    setLoading(true);
    setSummary('');
    setQuestions([]);
    try {
      const res = await fetch('/api/ai-journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry: text }),
      });
      const data = await res.json();
      console.log('n8n response:', data);
      setSummary(data.summary);
      setQuestions(Array.isArray(data.questions) ? data.questions : []);
    } catch (error) {
      console.error('AI Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-center"
      >
        How are you feeling today?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-4 rounded-xl shadow border"
      >
        <textarea
          className="w-full p-3 border rounded-xl focus:outline-none min-h-[120px]"
          placeholder="Type your journal entry..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        {typing && (
          <motion.p
            className="text-sm text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Typing...
          </motion.p>
        )}
      </motion.div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-3 shadow w-fit"
        >
          <span className="text-gray-600 font-medium">AI is thinking</span>
          <motion.div
            className="flex space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <span className="dot w-2 h-2 bg-gray-500 rounded-full" />
            <span className="dot w-2 h-2 bg-gray-500 rounded-full" />
            <span className="dot w-2 h-2 bg-gray-500 rounded-full" />
          </motion.div>
        </motion.div>
      )}

      {summary && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-blue-100 text-blue-900 p-4 rounded-xl shadow w-fit max-w-full"
        >
          <h3 className="font-semibold mb-1">🧠 Summary</h3>
          <p className="whitespace-pre-wrap">{summary}</p>
        </motion.div>
      )}

      {questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-green-100 text-green-900 p-4 rounded-xl shadow w-fit max-w-full"
        >
          <h3 className="font-semibold mb-1">💬 Reflection Questions</h3>
          <ul className="list-disc pl-5 space-y-1">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default JournalAssistant;
