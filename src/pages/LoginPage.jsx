import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { HeroParticles } from '../components/3d/HeroParticles';

export const LoginPage = ({ onNavigate }) => {
  const { login } = useStore();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const res = login(email.trim(), password);
      setIsLoading(false);
      if (res.success) {
        onNavigate('/marketplace');
      } else {
        setError(res.error || 'Authentication failed. Please verify your credentials.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col selection:bg-cx-0 selection:text-cx-950">
      <Navbar currentPath="/login" onNavigate={onNavigate} />

      <main className="flex-1 flex items-center justify-center relative py-12 px-4">
        {/* Particle background */}
        <HeroParticles className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-cx-950/60 to-cx-950/90 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cx-0 text-cx-950 mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-cx-0">Welcome Back</h1>
            <p className="text-xs font-mono text-cx-500">Sign in with your email and password</p>
          </div>

          {/* Card */}
          <div className="bg-cx-900/80 backdrop-blur-xl border border-cx-800 rounded-2xl p-8 space-y-5">

            {/* Error state */}
            {error && (
              <div className="flex items-start space-x-3 bg-cx-950 border border-cx-700 rounded-xl p-4">
                <AlertCircle className="w-4 h-4 text-cx-400 shrink-0 mt-0.5" />
                <p className="text-xs font-mono text-cx-300">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-cx-400 block">Email</label>
                <div className="relative flex items-center bg-cx-950 border border-cx-700 rounded-xl focus-within:border-cx-500 transition-colors">
                  <Mail className="w-4 h-4 text-cx-500 ml-3.5 shrink-0" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    required
                    className="w-full bg-transparent px-3 py-3 text-sm text-cx-0 placeholder-cx-600 focus:outline-none font-sans"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-cx-400">Password</label>
                  <button
                    type="button"
                    className="text-[11px] font-mono text-cx-500 hover:text-cx-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center bg-cx-950 border border-cx-700 rounded-xl focus-within:border-cx-500 transition-colors">
                  <Lock className="w-4 h-4 text-cx-500 ml-3.5 shrink-0" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    required
                    className="w-full bg-transparent px-3 py-3 text-sm text-cx-0 placeholder-cx-600 focus:outline-none font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="mr-3.5 text-cx-500 hover:text-cx-300 transition-colors shrink-0"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center space-x-2.5 cursor-pointer group">
                <div
                  onClick={() => setRememberMe((v) => !v)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                    rememberMe ? 'bg-cx-0 border-cx-0' : 'bg-transparent border-cx-600'
                  }`}
                >
                  {rememberMe && (
                    <svg className="w-2.5 h-2.5 text-cx-950" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-mono text-cx-500 group-hover:text-cx-300 transition-colors">
                  Remember this device
                </span>
              </label>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Marketplace
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-cx-800" />
              <span className="text-[11px] font-mono text-cx-600">OR</span>
              <div className="flex-1 h-px bg-cx-800" />
            </div>

            {/* Google SSO (placeholder) */}
            <button
              type="button"
              className="w-full flex items-center justify-center space-x-3 border border-cx-700 rounded-xl px-4 py-3 text-sm text-cx-300 hover:border-cx-500 hover:text-cx-0 transition-colors font-mono font-medium"
            >
              {/* Simple G icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#c4c4c4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#a0a0a0"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#808080"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#606060"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer link */}
          <p className="text-center text-xs font-mono text-cx-600 mt-6">
            New student?{' '}
            <button
              onClick={() => onNavigate('/signup')}
              className="text-cx-300 hover:text-cx-0 transition-colors underline underline-offset-2"
            >
              Create a campus account
            </button>
          </p>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
