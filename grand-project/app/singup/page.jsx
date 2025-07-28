"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) setStatus("Magic link sent! Check your email.");
    else setStatus("Error sending magic link.");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      {/* SVG Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block w-1/2 p-8"
      >
        <img src="/login-illustration.svg" alt="Login Illustration" className="w-full h-auto" />
      </motion.div>

      {/* Login Form */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-8 rounded-xl shadow max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 flex items-center justify-center gap-2">
          <MdEmail /> Login with Magic Link
        </h2>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded focus:outline-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Send Magic Link
        </button>
        {status && <p className="text-center text-sm text-gray-600">{status}</p>}
      </motion.form>
    </div>
  );
};

export default SignUp;