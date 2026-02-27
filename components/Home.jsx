"use client";

import { motion } from "framer-motion";
import { Code2, RefreshCcw, LogOut } from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function Home({ user, onSelect, onLogout }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-white via-blue-50 to-indigo-100 px-6"
    >
      <div className="max-w-4xl w-full text-center">

        {/* HEADER */}
        <motion.h1
          variants={item}
          className="text-4xl font-bold font-mono
          bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600
          bg-[length:200%_100%] bg-clip-text text-transparent"
        >
          <motion.span
            animate={{ backgroundPosition: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600
            bg-[length:200%_100%] bg-clip-text text-transparent"
          >
            Welcome, {user?.name || "Developer"}
          </motion.span>
        </motion.h1>

        <motion.p variants={item} className="text-gray-500 mt-2">
          What do you want to do today?
        </motion.p>

        {/* CARDS */}
        <motion.div className="grid md:grid-cols-2 gap-6 mt-12">

          {/* REVIEW */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect("review")}
            className="cursor-pointer backdrop-blur-xl bg-white/60 border border-white/70 shadow-xl rounded-2xl p-8"
          >
            <Code2 className="mx-auto mb-4 text-blue-600" size={36} />
            <h2 className="text-xl font-bold text-gray-800">Review Code</h2>
            <p className="text-gray-500 text-sm mt-2">
              Find bugs and improve quality
            </p>
          </motion.div>

          {/* REWRITE */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect("rewrite")}
            className="cursor-pointer backdrop-blur-xl bg-white/60 border border-white/70 shadow-xl rounded-2xl p-8"
          >
            <RefreshCcw className="mx-auto mb-4 text-purple-600" size={36} />
            <h2 className="text-xl font-bold text-gray-800">Rewrite Code</h2>
            <p className="text-gray-500 text-sm mt-2">
              Convert code using AI
            </p>
          </motion.div>
        </motion.div>

        {/* LOGOUT */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="mt-10 text-sm text-red-500 flex items-center gap-2 mx-auto
          px-4 py-2 rounded-xl
          hover:bg-red-500/10
          transition"
        >
          <LogOut size={16} />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
}