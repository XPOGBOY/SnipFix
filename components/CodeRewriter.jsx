"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { Zap, Loader2, Copy, FileCode, ArrowLeft, LogOut, History } from "lucide-react";

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
];

export default function CodeRewriter({user, onLogout, onBack }) {
  const [code, setCode] = useState("// Paste your code...");
  const [converted, setConverted] = useState("");
  const [notes, setNotes] = useState("");

  const [fromLanguage, setFromLanguage] = useState("javascript");
  const [toLanguage, setToLanguage] = useState("python");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!code.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, fromLanguage, toLanguage }),
      });

      const data = await res.json();
      setConverted(data.code || "");
      setNotes(data.notes || "");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200">

      {/* HEADER */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 py-3 flex items-center justify-between
        backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg"
      >

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* BACK */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-300"
            title="Back"
          >
            <ArrowLeft size={18}/>
          </motion.button>

          <h1 className="text-xl font-bold text-purple-400 font-mono tracking-wider">
            SnipFix — Code Converter
          </h1>

          <div className="hidden md:flex text-sm text-slate-400">
            Welcome,&nbsp;
            <span className="text-purple-300 font-semibold">
              {user?.name || "Developer"}
            </span>
          </div>
        </div>

        {/* CENTER language selectors */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <select
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            className="bg-black/30 px-2 py-1 rounded text-sm"
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>

          <span className="text-slate-400 text-xs">→</span>

          <select
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            className="bg-black/30 px-2 py-1 rounded text-sm"
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>

        {/* RIGHT actions */}
        <div className="flex items-center gap-2">

          {/* Convert */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConvert}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2 rounded-xl text-white shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Zap size={18}/>}
            Convert
          </motion.button>

          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1 backdrop-blur">

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {console.log("history")}}
              className="p-2 rounded-lg hover:bg-white/10"
              title="History"
            >
              <History size={18}/>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
              title="Logout"
            >
              <LogOut size={18}/>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* INPUT EDITOR */}
        <div className="flex-1 border-r border-white/10 bg-black/20 flex flex-col">
          <div className="px-4 py-2 border-b border-white/10 text-xs text-slate-400 flex items-center gap-2">
            <FileCode size={14}/> Input ({fromLanguage})
          </div>

          <Editor
            height="100%"
            theme="vs-dark"
            language={fromLanguage}
            value={code}
            onChange={(v)=>setCode(v || "")}
            options={{
              minimap:{enabled:false},
              wordWrap:"on",
              automaticLayout:true
            }}
          />
        </div>

        {/* OUTPUT EDITOR */}
        <div className="flex-1 bg-black/20 flex flex-col">
          <div className="px-4 py-2 border-b border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <span>Output ({toLanguage})</span>

            <button
              onClick={()=>navigator.clipboard.writeText(converted)}
              className="text-slate-400 hover:text-white"
            >
              <Copy size={16}/>
            </button>
          </div>

          <Editor
            height="100%"
            theme="vs-dark"
            language={toLanguage}
            value={converted}
            options={{
              readOnly:true,
              minimap:{enabled:false},
              wordWrap:"on",
              automaticLayout:true
            }}
          />

          {notes && (
            <div className="p-3 border-t border-white/10 text-xs text-slate-400">
              {notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}