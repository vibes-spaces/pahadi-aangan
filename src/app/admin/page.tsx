'use client';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Trees, Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { loginAdmin, isAdmin } from '@/lib/auth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function AdminLoginInner() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking] = useState(() => isAdmin());
  const router = useRouter();
  const searchParams = useSearchParams();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdmin()) {
      const redirectTo = searchParams.get('redirect') || '/admin/dashboard';
      router.replace(redirectTo);
    } else {
      usernameRef.current?.focus();
    }
  }, [router, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await loginAdmin(username, password);
    if (ok) {
      toast.success('Welcome back, Admin!');
      setLoading(false);
      const redirectTo = searchParams.get('redirect') || '/admin/dashboard';
      setTimeout(() => router.push(redirectTo), 300);
    } else {
      toast.error('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80" alt="Pahadi Aangan" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center p-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-ochre-600 rounded-2xl flex items-center justify-center shadow-xl shadow-ochre-600/20">
                <Trees className="w-7 h-7 text-clay-50" />
              </div>
              <div>
                <h1 className="font-serif text-3xl text-white">Pahadi <span className="text-ochre-400">Aangan</span></h1>
                <p className="text-stone-400 text-sm">Admin Panel</p>
              </div>
            </div>
            <p className="text-stone-300 text-lg leading-relaxed max-w-md">
              Heritage management system for Pahadi Aangan — your traditional Himachali retreat in the Kullu Valley.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-stone-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-ochre-600 rounded-xl flex items-center justify-center">
                <Trees className="w-6 h-6 text-clay-50" />
              </div>
              <div>
                <h1 className="font-serif text-xl text-stone-900">Pahadi <span className="text-ochre-600">Aangan</span></h1>
                <p className="text-stone-400 text-xs">Admin Panel</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-ochre-400" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-stone-900">Admin Login</h2>
              <p className="text-stone-500 text-sm">Sign in to manage your property</p>
            </div>
          </div>

          {checking ? (
            <div className="flex justify-center py-8">
              <span className="w-6 h-6 border-2 border-stone-300 border-t-ochre-600 rounded-full animate-spin" />
            </div>
          ) : (
          <>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-ochre-600 transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </Link>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 transition-all placeholder:text-stone-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 transition-all placeholder:text-stone-400 pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-ochre-600 text-clay-50 py-3 rounded-xl font-semibold hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Shield className="w-4 h-4" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          </>)}
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex items-center gap-2 text-stone-400">
          <span className="w-5 h-5 border-2 border-stone-300 border-t-ochre-600 rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    }>
      <AdminLoginInner />
    </Suspense>
  );
}
