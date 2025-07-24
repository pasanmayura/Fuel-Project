'use client';

import { Lock } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import { login } from '@/service/authservice';

export default function LoginPage() {
  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      console.log('Login successful:', response);
      // Handle successful login (e.g., save token, redirect)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-200 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Login container */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-lg bg-white/70 rounded-3xl p-8 shadow-2xl border border-indigo-200 hover:bg-white/80 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">Welcome Back</h1>
            <p className="text-indigo-500">Sign in to your account</p>
          </div>

          {/* Auth Form */}
          <AuthForm
            onSubmit={handleLogin}
            submitLabel="Sign In"
            showSignUpLink={true}
            showSignInLink={false}
          />
        </div>
      </div>
    </div>
  );
}