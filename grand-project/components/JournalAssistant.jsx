'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const JournalAssistant = () => {
  const [entry, setEntry] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const chatEndRef = useRef(null);
  const [error, setError] = useState("");


  // ✅ Get user ID from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error('User fetch error:', error);
      else setUserId(data?.user?.id);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchMessages = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
  
      if (!accessToken) return;
  
      try {
        const res = await fetch("/api/ai-journal", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(accessToken)
  
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          const formatted = data.flatMap((session) => {
            const msgs = [];
        
            if (session.entry) {
              msgs.push({ type: 'user', text: session.entry });
            }
        
            if (session.summary) {
              msgs.push({ type: 'ai', text: session.summary });
            }
        
            if (Array.isArray(session.questions) && session.questions.length > 0) {
              msgs.push({
                type: 'ai',
                text: '💬 Reflection Questions:\n' + session.questions.map(q => `- ${q}`).join('\n'),
              });
            }
        
            return msgs;
          });
        
          setMessages(formatted);
        }
        
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };
  
    fetchMessages();
  }, []);
  

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!entry.trim()) return;
    setTyping(true);
    const timeout = setTimeout(() => {
      handleSubmit(entry.trim());
      setTyping(false);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [entry]);

  const handleSubmit = async (text) => {
    if (!text) return;
  
    setMessages((prev) => [...prev, { type: 'user', text }]);
    setEntry('');
    setLoading(true);
    setError('');
  
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    const accessToken = session?.access_token;
  
    if (!accessToken) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }
  
    try {
      const res = await fetch('/api/ai-journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ entry: text }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        if (data.summary) {
          setMessages((prev) => [
            ...prev,
            { type: 'ai', text: data.summary },
          ]);
        }
  
        if (data.questions?.length) {
          setMessages((prev) => [
            ...prev,
            {
              type: 'ai',
              text:
                '💬 Reflection Questions:\n' +
                data.questions.map((q) => `- ${q}`).join('\n'),
            },
          ]);
        }
      } else {
        setError(data.error || "Failed to generate response.");
      }
    } catch (error) {
      console.error('AI Error:', error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[80vh] border rounded-xl shadow bg-white overflow-hidden">
      <div className="bg-blue-100 px-4 py-3 font-semibold text-center">
        How are you feeling today?
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-xl whitespace-pre-wrap shadow ${
              msg.type === 'user'
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-100 text-gray-800 self-start mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-100 p-3 rounded-xl shadow w-fit text-sm text-gray-600">
            AI is thinking...
          </div>
        )}

        {typing && (
          <div className="text-gray-400 text-sm italic">Typing...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input + Send Button */}
      <form
        className="flex items-center border-t px-4 py-2 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(entry.trim());
        }}
      >
        <textarea
          className="flex-1 resize-none border rounded-xl p-2 focus:outline-none min-h-[48px] max-h-[120px]"
          placeholder="Type something..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />

        <button
          type="submit"
          disabled={!entry.trim()}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
        >
          <ArrowUpRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default JournalAssistant;
