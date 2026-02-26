"use client";

import { motion } from "framer-motion";
import { Code2, RefreshCcw, LogOut } from "lucide-react";

export default function Home({ user, onSelect, onLogout }) {
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-white via-blue-50 to-indigo-100 px-6">

      <div className="max-w-4xl w-full text-center">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

        <p className="text-gray-500 mt-2">
          What do you want to do today?
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">

          {/* REVIEW */}
          <motion.div
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:.97 }}
            onClick={()=>onSelect("review")}
            className="cursor-pointer backdrop-blur-xl bg-white/60 border border-white/70 shadow-xl rounded-2xl p-8"
          >
            <Code2 className="mx-auto mb-4 text-blue-600" size={36}/>
            <h2 className="text-xl font-bold text-gray-800">Review Code</h2>
            <p className="text-gray-500 text-sm mt-2">
              Find bugs and improve quality
            </p>
          </motion.div>

          {/* REWRITE */}
          <motion.div
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:.97 }}
            onClick={()=>onSelect("rewrite")}
            className="cursor-pointer backdrop-blur-xl bg-white/60 border border-white/70 shadow-xl rounded-2xl p-8"
          >
            <RefreshCcw className="mx-auto mb-4 text-purple-600" size={36}/>
            <h2 className="text-xl font-bold text-gray-800">Rewrite Code</h2>
            <p className="text-gray-500 text-sm mt-2">
              Convert code using AI
            </p>
          </motion.div>
        </div>

        {/* LOGOUT */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="mt-10 text-sm text-red-500 flex items-center gap-2 mx-auto
          px-4 py-2 rounded-xl
          hover:bg-red-500/10
          transition relative overflow-hidden"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -2 }}
            className="flex items-center gap-2"
          >
            <LogOut size={16}/>
            Logout
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}