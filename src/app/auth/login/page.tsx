'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem('guest_auth', JSON.stringify({ email, name: email.split('@')[0], loggedInAt: new Date().toISOString() }));
        toast.success('Welcome back!');
        router.push('/guest');
      } catch {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        <div className="hidden lg:block relative flex-1">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent" />
          <div className="absolute bottom-12 left-12 text-white max-w-md">
            <h1 className="font-serif text-4xl mb-3">Welcome Back</h1>
            <p className="text-stone-300">Continue your journey through the Himalayas. Sign in to manage your bookings and explore more of Pahadi Aangan.</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-clay-50">
          <FadeIn className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="font-serif text-2xl text-stone-900">Pahadi Aangan</Link>
              <p className="text-stone-500 text-sm mt-1">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500 bg-white"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-end">
                <Link href="/auth/forgot-password" className="text-xs text-ochre-600 hover:text-ochre-500 font-medium">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="text-center text-sm text-stone-500 mt-8">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-ochre-600 hover:text-ochre-500 font-medium">Create one</Link>
            </p>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
