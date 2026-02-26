'use client';
import { useState, useEffect } from 'react';
import LoginPage from '../components/LoginPage.jsx';
import CodeReviewer from '../components/CodeReviewer.jsx';
import CodeRewriter from '../components/CodeRewriter.jsx'
import SplashScreen from '../components/SplashScreen.jsx';
import Home from '../components/Home.jsx';
import { AnimatePresence } from 'framer-motion';

export default function Main() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // ⭐ NEW — which screen after login
  const [mode, setMode] = useState(null); 

  /* ===== Load user + splash ===== */
  useEffect(() => {
    const savedUser = localStorage.getItem('codeReviewerCurrentUser');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user:', e);
      }
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = (userData) => {
    localStorage.setItem("codeReviewerCurrentUser", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('codeReviewerCurrentUser');
      setUser(null);
      setMode(null);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      {/* Splash */}
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      {!showSplash && (
        <main>

          {!user && (
            <LoginPage onAuthSuccess={handleAuthSuccess} />
          )}

          {user && !mode && (
            <Home
              user={user}
              onSelect={setMode}
              onLogout={handleLogout}
            />
          )}

          {user && mode === "review" && (
            <CodeReviewer
              user={user}
              onLogout={handleLogout}
              onBack={() => setMode(null)}
            />
          )}

          {/* CONVERTER */}
          {user && mode === "rewrite" && (
            <CodeRewriter
              user={user}
              onLogout={handleLogout}
              onBack={() => setMode(null)}
            />
          )}

        </main>
      )}
    </>
  );
}
