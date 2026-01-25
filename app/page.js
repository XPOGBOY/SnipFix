'use client';
import { useState, useEffect } from 'react';
import LoginPage from '../components/LoginPage.jsx';
import CodeReviewer from '../components/CodeReviewer.jsx';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('codeReviewerCurrentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user:', e);
      }
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('codeReviewerCurrentUser');
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400 font-mono mb-4">AI_CODE_REVIEWER</div>
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <main>
      {user ? (
        <CodeReviewer user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onAuthSuccess={handleAuthSuccess} />
      )}
    </main>
  );
}
