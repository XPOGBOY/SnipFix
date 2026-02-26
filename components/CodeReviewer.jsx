"use client";
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
<<<<<<< HEAD
import { Clipboard, Check, Play, AlertCircle, Loader2, Zap, History, Trash2, Copy, LogOut } from 'lucide-react';
=======
import { Clipboard, Check, Play, AlertCircle, Loader2, Zap, History, Trash2, Copy, LogOut, FileCode, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
>>>>>>> 513d8d9 (Initial commit)

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
];

const detectLanguage = (codeText) => {
  if (!codeText || codeText.length < 5) return 'javascript';
  
  const lowerCode = codeText.toLowerCase();
  
  // Python patterns
  if (lowerCode.match(/^\s*(def|import|from|class)\s+|print\(|if __name__/m)) {
    return 'python';
  }
  
  // Java patterns
  if (lowerCode.match(/public\s+class\s+\w+|import\s+java\.|System\.out\.println/)) {
    return 'java';
  }
  
  // C++ patterns
  if (lowerCode.match(/#include|using namespace std|std::|cout|cin/)) {
    return 'cpp';
  }
  
  // C# patterns
  if (lowerCode.match(/using\s+System|public\s+class\s+\w+|Console\.WriteLine/)) {
    return 'csharp';
  }
  
  // PHP patterns
  if (lowerCode.match(/<\?php|echo\s|function\s+\w+\s*\(|foreach\s*\(/)) {
    return 'php';
  }
  
  // Ruby patterns
  if (lowerCode.match(/def\s+\w+|puts\s|@\w+|:\w+\s*=>/)) {
    return 'ruby';
  }
  
  // Go patterns
  if (lowerCode.match(/package\s+\w+|import\s*\(|func\s+\w+|fmt\./)) {
    return 'go';
  }
  
  // Rust patterns
  if (lowerCode.match(/fn\s+\w+|let\s+mut\s+\w+|println!|use\s+\w+/)) {
    return 'rust';
  }
  
  // HTML patterns
  if (lowerCode.match(/<html|<body|<head|<!DOCTYPE/i)) {
    return 'html';
  }
  
  // CSS patterns
  if (lowerCode.match(/\{\s*color:|border:|padding:|margin:|background:/)) {
    return 'css';
  }
  
  // JSON patterns
  if (lowerCode.match(/^\s*[\{\[]|":\s*["\d\{\[]/)) {
    return 'json';
  }
  
  // SQL patterns
  if (lowerCode.match(/SELECT\s+|FROM\s+|WHERE\s+|INSERT INTO|UPDATE\s+/i)) {
    return 'sql';
  }
  
  // TypeScript patterns
  if (lowerCode.match(/:\s*(string|number|boolean|any|interface|type\s+\w+)\s*[=\{;]/)) {
    return 'typescript';
  }
  
  // Default to JavaScript
  return 'javascript';
};

<<<<<<< HEAD
export default function CodeReviewer({ user, onLogout }) {
=======
export default function CodeReviewer({ user, onLogout, onBack }) {
>>>>>>> 513d8d9 (Initial commit)
  const [code, setCode] = useState("// Paste your code here...");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [detectedLanguage, setDetectedLanguage] = useState('javascript');
  const [severityFilter, setSeverityFilter] = useState('all'); // 'all', 'critical', 'warning', 'info'
  const [sortBy, setSortBy] = useState('line'); // 'line' or 'severity'
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
<<<<<<< HEAD
=======
    document.title = "SnipFix | AI Code Reviewer";
>>>>>>> 513d8d9 (Initial commit)
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('codeReviewHistory');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error('Failed to load history:', e);
        }
      }
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (typeof window !== 'undefined' && history.length > 0) {
      localStorage.setItem('codeReviewHistory', JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    const detected = detectLanguage(code);
    setDetectedLanguage(detected);
  }, [code]);

  const handleReview = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify({ code, language: selectedLanguage }),
      });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);

      // Save to history
      if (Array.isArray(data) && data.length > 0) {
        const historyItem = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          language: selectedLanguage,
          codeSnippet: code.substring(0, 100) + (code.length > 100 ? '...' : ''),
          reviewCount: data.length,
          criticalCount: data.filter(r => r.severity?.toLowerCase() === 'critical').length,
          code: code,
          reviews: data,
        };
        setHistory([historyItem, ...history.slice(0, 49)]); // Keep last 50 reviews
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoDetect = () => {
    setSelectedLanguage(detectedLanguage);
  };

  const loadFromHistory = (historyItem) => {
    setCode(historyItem.code);
    setSelectedLanguage(historyItem.language);
    setReviews(historyItem.reviews);
    setShowHistory(false);
  };

  const deleteHistoryItem = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    if (confirm('Are you sure you want to clear all review history?')) {
      setHistory([]);
      localStorage.removeItem('codeReviewHistory');
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity?.toLowerCase()) {
      case 'critical':
        return { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-700/50', icon: '🔴' };
      case 'warning':
        return { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-700/50', icon: '🟡' };
      case 'info':
        return { bg: 'bg-blue-900/30', text: 'text-blue-400', border: 'border-blue-700/50', icon: '🔵' };
      default:
        return { bg: 'bg-slate-900/30', text: 'text-slate-400', border: 'border-slate-700/50', icon: '⚪' };
    }
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = reviews;
    
    if (severityFilter !== 'all') {
      filtered = reviews.filter(r => r.severity?.toLowerCase() === severityFilter);
    }
    
    if (sortBy === 'severity') {
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      filtered = [...filtered].sort((a, b) => 
        (severityOrder[a.severity?.toLowerCase()] || 3) - (severityOrder[b.severity?.toLowerCase()] || 3)
      );
    } else {
      filtered = [...filtered].sort((a, b) => a.line - b.line);
    }
    
    return filtered;
  };

  const getSeverityCounts = () => {
    return {
      critical: reviews.filter(r => r.severity?.toLowerCase() === 'critical').length,
      warning: reviews.filter(r => r.severity?.toLowerCase() === 'warning').length,
      info: reviews.filter(r => r.severity?.toLowerCase() === 'info').length,
    };
  };

  const copyFix = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200">
      {/* Header */}
<<<<<<< HEAD
      <nav className="p-4 border-b border-slate-800 flex justify-between items-center gap-4 bg-[#1e293b]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-400 font-mono">AI_CODE_REVIEWER</h1>
          <div className="text-sm text-slate-400">
            Welcome, <span className="text-blue-300 font-semibold">{user.name}</span>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Auto-detect Button */}
          <button
            onClick={handleAutoDetect}
            title={`Auto-detected: ${LANGUAGE_OPTIONS.find(l => l.value === detectedLanguage)?.label}`}
            className="mt-5 p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors text-slate-300 hover:text-white"
          >
            <Zap size={18} />
          </button>
        </div>

        {/* Review Button */}
        <button 
          onClick={handleReview}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-2 rounded-md transition-all font-medium text-white"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
          {loading ? "Analyzing..." : "Review Code"}
        </button>

        {/* History Button */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium ${
            showHistory
              ? 'bg-slate-600 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
          }`}
          title={`${history.length} reviews saved`}
        >
          <History size={18} />
          <span className="text-sm">{history.length}</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md transition-all font-medium text-white"
          title="Logout"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </nav>
=======
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 py-3 flex items-center justify-between
        backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg"
      >
        {/* LEFT — Brand + user */}
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

          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-blue-500 font-mono tracking-wider"
          >
            SnipFix-Code Reviewer
          </motion.h1>

          <div className="hidden md:flex text-sm text-slate-400">
            Welcome,&nbsp;
            <span className="text-blue-300 font-semibold">
              {user?.name || "Developer"}
            </span>
          </div>
        </div>

        {/* CENTER — Language tools */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 backdrop-blur">

          <motion.select
            whileFocus={{ scale: 1.03 }}
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className=" outline-none bg-black/30 p-1 px-2 rounded-xl text-sm text-white"
          >
            {LANGUAGE_OPTIONS.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </motion.select>

          <motion.button
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAutoDetect}
            className="p-1.5 rounded-lg hover:bg-white/10"
            title="Auto detect"
          >
            <Zap size={18} />
          </motion.button>
        </div>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-2">

          {/* Review primary */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReview}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 rounded-xl text-white shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Play size={18}/>}
            Review
          </motion.button>

          {/* Icon group */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1 backdrop-blur">

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowHistory(!showHistory)}
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
>>>>>>> 513d8d9 (Initial commit)

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* History Panel */}
<<<<<<< HEAD
        {showHistory && (
          <div className="w-80 border-r border-slate-800 bg-[#1e293b] flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-400">Review History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {history.length === 0 ? (
              <div className="p-4 text-center text-slate-500">
                <History className="mx-auto mb-2 opacity-20" size={32} />
                <p className="text-sm">No reviews yet</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-700 rounded-lg p-3 hover:border-blue-500 transition-colors cursor-pointer group"
=======
        <AnimatePresence>
        {showHistory && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: -360, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -360, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed left-0 top-0 bottom-0 w-80 z-50
              backdrop-blur-xl bg-white/5 border-r border-white/10
              shadow-2xl flex flex-col"
            >
              {/* HEADER */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-bold text-blue-400">Review History</h2>

                <motion.button
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowHistory(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </motion.button>
              </div>

              {/* EMPTY */}
              {history.length === 0 ? (
                <div className="p-4 text-center text-slate-500">
                  <History className="mx-auto mb-2 opacity-20" size={32} />
                  <p className="text-sm">No reviews yet</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer group backdrop-blur"
>>>>>>> 513d8d9 (Initial commit)
                    >
                      <button
                        onClick={() => loadFromHistory(item)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between mb-2">
<<<<<<< HEAD
                          <span className="text-xs font-bold px-2 py-1 bg-blue-900/30 text-blue-400 rounded">
                            {LANGUAGE_OPTIONS.find(l => l.value === item.language)?.label}
                          </span>
                          {item.criticalCount > 0 && (
                            <span className="text-xs font-bold px-2 py-1 bg-red-900/30 text-red-400 rounded">
=======
                          <span className="text-xs font-bold px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                            {LANGUAGE_OPTIONS.find(l => l.value === item.language)?.label}
                          </span>

                          {item.criticalCount > 0 && (
                            <span className="text-xs font-bold px-2 py-1 bg-red-500/20 text-red-300 rounded">
>>>>>>> 513d8d9 (Initial commit)
                              🔴 {item.criticalCount}
                            </span>
                          )}
                        </div>
<<<<<<< HEAD
                        <p className="text-xs text-slate-300 line-clamp-2 mb-2">{item.codeSnippet}</p>
=======

                        <p className="text-xs text-slate-300 line-clamp-2 mb-2">
                          {item.codeSnippet}
                        </p>

>>>>>>> 513d8d9 (Initial commit)
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{item.reviewCount} issues</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </button>

<<<<<<< HEAD
                      <div className="flex gap-2 mt-2 pt-2 border-t border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
=======
                      {/* ACTIONS */}
                      <div className="flex gap-2 mt-2 pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
>>>>>>> 513d8d9 (Initial commit)
                          onClick={(e) => {
                            e.stopPropagation();
                            loadFromHistory(item);
                          }}
<<<<<<< HEAD
                          className="flex-1 text-xs py-1 bg-blue-600 hover:bg-blue-500 rounded text-white flex items-center justify-center gap-1"
                        >
                          <Copy size={12} /> Load
                        </button>
                        <button
=======
                          className="flex-1 text-xs py-1 bg-blue-600 rounded text-white flex items-center justify-center gap-1"
                        >
                          <Copy size={12}/> Load
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
>>>>>>> 513d8d9 (Initial commit)
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteHistoryItem(item.id);
                          }}
<<<<<<< HEAD
                          className="flex-1 text-xs py-1 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div className="p-4 border-t border-slate-800">
                <button
                  onClick={clearAllHistory}
                  className="w-full text-xs py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded font-medium transition-colors"
                >
                  Clear All History
                </button>
              </div>
            )}
          </div>
        )}

        {/* Editor and Reviews Section */}
        {/* Editor (Left) */}
        <div className="flex-1 border-r border-slate-800">
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedLanguage}
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{ fontSize: 14, minimap: { enabled: false } }}
          />
        </div>

        {/* Feedback Sidebar (Right) */}
        <div className="w-96 p-4 overflow-y-auto bg-[#0f172a] space-y-4 border-l border-slate-800 flex flex-col">
          {reviews.length > 0 && (
            <div className="space-y-3">
              {/* Severity Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-red-900/20 border border-red-700/30 rounded p-2 text-center">
                  <div className="font-bold text-red-400">{getSeverityCounts().critical}</div>
                  <div className="text-red-300">Critical</div>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-700/30 rounded p-2 text-center">
                  <div className="font-bold text-yellow-400">{getSeverityCounts().warning}</div>
                  <div className="text-yellow-300">Warning</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-700/30 rounded p-2 text-center">
                  <div className="font-bold text-blue-400">{getSeverityCounts().info}</div>
                  <div className="text-blue-300">Info</div>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setSeverityFilter('all')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    severityFilter === 'all'
                      ? 'bg-slate-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSeverityFilter('critical')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    severityFilter === 'critical'
                      ? 'bg-red-700 text-white'
                      : 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                  }`}
                >
                  Critical
                </button>
                <button
                  onClick={() => setSeverityFilter('warning')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    severityFilter === 'warning'
                      ? 'bg-yellow-700 text-white'
                      : 'bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/40'
                  }`}
                >
                  Warning
                </button>
                <button
                  onClick={() => setSeverityFilter('info')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    severityFilter === 'info'
                      ? 'bg-blue-700 text-white'
                      : 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/40'
                  }`}
                >
                  Info
                </button>
              </div>

              {/* Sort Options */}
              <div className="flex gap-1">
                <button
                  onClick={() => setSortBy('line')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors flex-1 ${
                    sortBy === 'line'
                      ? 'bg-slate-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  By Line
                </button>
                <button
                  onClick={() => setSortBy('severity')}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors flex-1 ${
                    sortBy === 'severity'
                      ? 'bg-slate-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  By Severity
                </button>
              </div>
            </div>
          )}
          {reviews.length === 0 && !loading && (
            <div className="text-center text-slate-500 mt-20">
              <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
              <p>No reviews yet. Click the button to start.</p>
            </div>
          )}

          {getFilteredAndSortedReviews().map((item, idx) => {
            const severity = getSeverityColor(item.severity);
            return (
              <div key={idx} className={`${severity.bg} border ${severity.border} rounded-lg p-4 shadow-xl`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 ${severity.bg} ${severity.text} rounded`}>
                      {severity.icon} {item.severity?.toUpperCase() || 'UNKNOWN'}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Line {item.line}
                    </span>
                  </div>
                  <button 
                    onClick={() => copyFix(item.fix, idx)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    {copiedIdx === idx ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
                  </button>
                </div>
                <p className="text-sm text-slate-300 mb-3">{item.error}</p>
                <div className="p-2 bg-black rounded text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800">
                  {item.fix}
                </div>
              </div>
            );
          })}
=======
                          className="flex-1 text-xs py-1 bg-red-500/20 text-red-300 rounded flex items-center justify-center gap-1"
                        >
                          <Trash2 size={12}/>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* FOOTER */}
              {history.length > 0 && (
                <div className="p-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearAllHistory}
                    className="w-full text-xs py-2 bg-red-500/20 text-red-300 rounded-xl font-medium"
                  >
                    Clear All History
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
        </AnimatePresence>

        {/* Editor and Reviews Section */}
        {/* Editor (Left) */}
        <div className="flex-1 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col">

          {/* ===== EDITOR TOOLBAR ===== */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 backdrop-blur"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <FileCode size={16} />
                <span className="uppercase text-xs tracking-wider">
                  {selectedLanguage}
                </span>
              </div>

              <div className="text-xs text-slate-500">
                {code.split("\n").length} lines
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">

              {/* Copy */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigator.clipboard.writeText(code)}
                className="p-2 rounded-lg hover:bg-white/10 text-slate-300"
                title="Copy code"
              >
                <Copy size={16} />
              </motion.button>

              {/* Clear */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (confirm("Clear editor?")) setCode("");
                }}
                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                title="Clear code"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* ===== MONACO ===== */}
          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              language={selectedLanguage}
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                smoothScrolling: true,
                cursorSmoothCaretAnimation: true,
                padding: { top: 12 },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Feedback Sidebar (Right) */}
        <div className="w-96 p-4 overflow-y-auto space-y-4 border-l border-white/10 backdrop-blur-xl bg-white/5 flex flex-col">
          {/* ===== HEADER STATS ===== */}
          {reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { label: "Critical", color: "red", value: getSeverityCounts().critical },
                  { label: "Warning", color: "yellow", value: getSeverityCounts().warning },
                  { label: "Info", color: "blue", value: getSeverityCounts().info },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-${s.color}-500/20 border border-${s.color}-500/30 rounded-xl p-2 text-center`}
                  >
                    <div className={`font-bold text-${s.color}-400`}>{s.value}</div>
                    <div className={`text-${s.color}-300`}>{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                {["all", "critical", "warning", "info"].map((f) => (
                  <motion.button
                    key={f}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSeverityFilter(f)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium backdrop-blur border transition ${
                      severityFilter === f
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
                    }`}
                  >
                    {f}
                  </motion.button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                {["line", "severity"].map((s) => (
                  <motion.button
                    key={s}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSortBy(s)}
                    className={`flex-1 px-3 py-1 rounded-xl text-xs font-medium backdrop-blur border ${
                      sortBy === s
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    By {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* EMPTY */}
          {reviews.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-500 mt-20"
            >
              <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
              <p>No reviews yet. Click the button to start.</p>
            </motion.div>
          )}

          {/* ===== REVIEW CARDS ===== */}
          <AnimatePresence>
            {getFilteredAndSortedReviews().map((item, idx) => {
              const severity = getSeverityColor(item.severity);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`${severity.bg} border ${severity.border} rounded-xl p-4 shadow-xl backdrop-blur-lg bg-white/5`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 ${severity.text} rounded`}>
                        {severity.icon} {item.severity?.toUpperCase()}
                      </span>

                      <span className="text-xs text-slate-400">
                        Line {item.line}
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyFix(item.fix, idx)}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedIdx === idx ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Clipboard size={16} />
                      )}
                    </motion.button>
                  </div>

                  <p className="text-sm text-slate-300 mb-3">{item.error}</p>

                  <div className="p-2 bg-black/70 rounded text-xs font-mono text-emerald-400 overflow-x-auto border border-white/10">
                    {item.fix}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
>>>>>>> 513d8d9 (Initial commit)
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 513d8d9 (Initial commit)
