"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  // ⏱️ show splash only 1.6s
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* METEORS BACKGROUND */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100"
          >
            <Meteors number={30} />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="text-center">
              
              {/* LOGO */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="text-5xl md:text-6xl font-bold font-mono text-gray-800"
              >
                SnipFix
              </motion.h1>

              {/* TAGLINE */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 mt-3"
              >
                Analyze • Improve • Ship better code
              </motion.p>

              {/* LOADER LINE — 1.6s */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                className="origin-left h-1 w-56 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mt-6"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}