"use client";
import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage({ onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (isSignup) {
      if (!formData.name) {
        setError('Please enter your name');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (isSignup) {
        // Signup logic
        const users = JSON.parse(localStorage.getItem('codeReviewerUsers') || '[]');
        
        if (users.some(u => u.email === formData.email)) {
          setError('Email already registered');
          setLoading(false);
          return;
        }

        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password, // In production, this should be hashed
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem('codeReviewerUsers', JSON.stringify(users));
      } else {
        // Login logic
        const users = JSON.parse(localStorage.getItem('codeReviewerUsers') || '[]');
        const user = users.find(u => u.email === formData.email && u.password === formData.password);

        if (!user) {
          setError('Invalid email or password');
          setLoading(false);
          return;
        }
      }

      // Store current user session
      const currentUser = {
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('codeReviewerCurrentUser', JSON.stringify(currentUser));
      onAuthSuccess(currentUser);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="text-4xl font-bold text-blue-400 font-mono">AI_CODE_REVIEWER</div>
          </div>
          <p className="text-slate-400">Review and improve your code with AI</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-lg p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setIsSignup(false);
                setError('');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
              className={`flex-1 py-2 rounded-md font-semibold transition-colors ${
                !isSignup
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsSignup(true);
                setError('');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
              className={`flex-1 py-2 rounded-md font-semibold transition-colors ${
                isSignup
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup only) */}
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup only) */}
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-700/50 text-red-400 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Your data is stored locally in your browser
        </p>
      </div>
    </div>
  );
}
