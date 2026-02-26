"use client";
import React, { useState, useEffect } from "react";
import { Mail, Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage({ onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ================= AUTH LOGIC ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("codeReviewerUsers") || "[]");

    if (isSignup) {
      if (!formData.name || !formData.email || !formData.password) {
        alert("Fill all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      if (users.some((u) => u.email === formData.email)) {
        alert("Email already registered");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem(
        "codeReviewerUsers",
        JSON.stringify([...users, newUser])
      );

      localStorage.setItem(
        "codeReviewerCurrentUser",
        JSON.stringify(newUser)
      );

      onAuthSuccess(newUser);
    } else {
      const user = users.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password
      );

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem(
        "codeReviewerCurrentUser",
        JSON.stringify(user)
      );

      onAuthSuccess(user);
    }
  };

    useEffect(() => {
      isSignup ? document.title = "Signup | AI Code Reviewer" : document.title = "Login | AI Code Reviewer";
    }, [isSignup]);

  /* ================= UI ================= */

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-indigo-100 overflow-hidden">
        <motion.div
          className="absolute w-[420px] h-[420px] bg-blue-300 rounded-full blur-3xl opacity-30"
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[360px] h-[360px] bg-purple-300 rounded-full blur-3xl opacity-30 right-0"
          animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 className="text-4xl font-bold text-gray-800 font-mono">
            AI_CODE_REVIEWER
          </motion.h1>
          <p className="text-gray-500 mt-2">
            Review and improve your code with AI
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-2xl p-8">
          
          {/* Toggle */}
          <div className="relative flex bg-gray-100 rounded-xl p-1 mb-8 overflow-hidden">
            <motion.div
              className="absolute top-1 bottom-1 w-1/2 bg-white rounded-lg shadow"
              animate={{ x: isSignup ? "100%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => setIsSignup(false)}
              className={`relative z-10 flex-1 py-2 font-semibold ${
                !isSignup ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsSignup(true)}
              className={`relative z-10 flex-1 py-2 font-semibold ${
                isSignup ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <AnimatePresence>
              {isSignup && (
                <motion.div initial={{ opacity:0,y:-10 }} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                  <Input icon={<User size={18}/>} name="name" value={formData.name} onChange={handleInputChange} placeholder="Full name"/>
                </motion.div>
              )}
            </AnimatePresence>

            <Input icon={<Mail size={18}/>} name="email" value={formData.email} onChange={handleInputChange} placeholder="Email"/>

            <div className="relative">
              <Input
                icon={<Lock size={18}/>}
                name="password"
                type={showPassword?"text":"password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>

            <AnimatePresence>
              {isSignup && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <Input icon={<Lock size={18}/>} name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm password"/>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileTap={{scale:0.95}}
              whileHover={{scale:1.02}}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <LogIn size={18}/>
              {isSignup ? "Create Account" : "Sign In"}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Your data is stored locally
        </p>
      </motion.div>
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
}
