"use client";
import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 z-50">
      
      <div className="text-center">
        
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold font-mono text-gray-800"
        >
          AI_CODE_REVIEWER
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mt-3"
        >
          Analyze • Improve • Ship better code
        </motion.p>

        {/* Loader line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.6 }}
          className="origin-left h-1 w-48 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mt-6"
        />
      </div>
    </div>
  );
}