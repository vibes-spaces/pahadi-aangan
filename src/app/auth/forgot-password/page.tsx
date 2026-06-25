'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      toast.success('Password reset link sent to your email');
    }, 1500);
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
            <h1 className="font-serif text-4xl mb-3">Reset Password</h1>
            <p className="text-stone-300">Forgot your password? No worries. Enter your email and we&apos;ll send you a reset link.</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-clay-50">
          <FadeIn className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="font-serif text-2xl text-stone-900">Pahadi Aangan</Link>
              <p className="text-stone-500 text-sm mt-1">Reset your password</p>
            </div>

            {sent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-pine-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-pine-600" />
                </div>
                <p className="text-stone-700 font-medium">Reset link sent!</p>
                <p className="text-sm text-stone-500">Check your inbox at <strong className="text-stone-900">{email}</strong> and follow the instructions to reset your password.</p>
                <Button onClick={() => { setSent(false); setEmail(''); }} variant="outline" size="sm">
                  Send again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">Email Address</label>
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
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            )}

            <div className="text-center mt-8">
              <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-ochre-600 hover:text-ochre-500 font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
