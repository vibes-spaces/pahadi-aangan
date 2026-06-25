'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getBookings } from '@/lib/store';
import { formatPrice, formatDate, getStatusColor, cn } from '@/lib/utils';
import type { Booking } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import {
  CalendarCheck, BedDouble, Clock, CreditCard, ArrowRight,
  LogIn, User, Mail, Phone, MapPin,
} from 'lucide-react';

interface GuestAuth {
  name: string;
  email: string;
  phone?: string;
  loggedInAt: string;
}

const storedAuth: GuestAuth | null = (() => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('guest_auth');
    return raw ? JSON.parse(raw) as GuestAuth : null;
  } catch { return null; }
})();

export default function GuestDashboardPage() {
  const [auth] = useState<GuestAuth | null>(storedAuth);
  const [bookings] = useState<Booking[]>(() => {
    if (!storedAuth) return [];
    try {
      const all = getBookings();
      return all.filter(b => b.guestEmail.toLowerCase() === storedAuth.email.toLowerCase());
    } catch { return []; }
  });

  if (!auth) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-clay-50 px-4">
          <FadeIn className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-ochre-100 flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-ochre-600" />
            </div>
            <h1 className="font-serif text-3xl text-stone-900 mb-3">Welcome, Guest</h1>
            <p className="text-stone-500 mb-8">Please sign in to access your dashboard and manage your bookings.</p>
            <Button href="/auth/login" size="lg">
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
            <p className="text-sm text-stone-400 mt-4">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-ochre-600 hover:text-ochre-500 font-medium">Create one</Link>
            </p>
          </FadeIn>
        </div>
      </PageTransition>
    );
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'checked-out').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalSpent: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
  };

  const recentBookings = bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  return (
    <PageTransition>
      <div className="min-h-screen bg-clay-50">
        <div className="bg-stone-900 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <FadeIn>
              <h1 className="font-serif text-3xl md:text-4xl text-white">Welcome back, {auth.name}!</h1>
              <p className="text-stone-400 mt-2 text-sm">Manage your stays and explore more of Pahadi Aangan.</p>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-6">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-lg mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="w-14 h-14 rounded-full bg-ochre-100 flex items-center justify-center text-ochre-700 font-bold text-xl shrink-0">
                  {auth.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-stone-900">{auth.name}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-stone-500 mt-1">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{auth.email}</span>
                    {auth.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{auth.phone}</span>}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button href="/booking" size="sm">Book a Room</Button>
                  <button
                    onClick={() => { localStorage.removeItem('guest_auth'); window.location.reload(); }}
                    className="text-xs text-stone-400 hover:text-red-500 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total Bookings', value: stats.total, icon: CalendarCheck, color: 'text-ochre-600 bg-ochre-50' },
              { label: 'Confirmed', value: stats.confirmed, icon: BedDouble, color: 'text-pine-600 bg-pine-50' },
              { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-ochre-500 bg-ochre-50' },
              { label: 'Completed', value: stats.completed, icon: CalendarCheck, color: 'text-blue-600 bg-blue-50' },
              { label: 'Total Spent', value: formatPrice(stats.totalSpent), icon: CreditCard, color: 'text-stone-600 bg-stone-100' },
            ].map(stat => (
              <StaggerItem key={stat.label}>
                <div className="bg-white rounded-xl border border-stone-200 p-4 text-center">
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2', stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-lg font-bold text-stone-900">{stat.value}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-stone-900">Recent Bookings</h2>
                  <Button href="/guest/bookings" variant="outline" size="sm">
                    View All <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </FadeIn>
              {recentBookings.length === 0 ? (
                <FadeIn>
                  <div className="bg-white rounded-xl border border-stone-200 p-8 text-center">
                    <BedDouble className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-500 text-sm">No bookings yet. Start your Pahadi Aangan experience!</p>
                    <Button href="/booking" size="sm" className="mt-4">Book Now</Button>
                  </div>
                </FadeIn>
              ) : (
                <div className="space-y-3">
                  {recentBookings.map((b, i) => (
                    <FadeIn key={b.id} delay={i * 0.05}>
                      <Link href="/guest/bookings" className="block bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-stone-900 text-sm">{b.roomTitle}</p>
                            <p className="text-xs text-stone-500 mt-0.5">{formatDate(b.checkIn)} - {formatDate(b.checkOut)}</p>
                          </div>
                          <div className="text-right">
                            <span className={cn('inline-block px-2.5 py-1 text-[10px] font-semibold uppercase rounded-full', getStatusColor(b.status))}>{b.status}</span>
                            <p className="text-ochre-600 font-bold text-sm mt-1">{formatPrice(b.totalAmount)}</p>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>

            <div>
              <FadeIn>
                <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 sticky top-24">
                  <h2 className="font-serif text-lg text-stone-900">Quick Links</h2>
                  <div className="space-y-2">
                    <Link href="/booking" className="flex items-center gap-3 p-3 rounded-xl bg-ochre-50 text-ochre-700 text-sm font-medium hover:bg-ochre-100 transition-colors">
                      <BedDouble className="w-4 h-4" /> Book a Room
                    </Link>
                    <Link href="/guest/bookings" className="flex items-center gap-3 p-3 rounded-xl bg-stone-100 text-stone-700 text-sm font-medium hover:bg-stone-200 transition-colors">
                      <CalendarCheck className="w-4 h-4" /> My Bookings
                    </Link>
                    <Link href="/" className="flex items-center gap-3 p-3 rounded-xl bg-stone-100 text-stone-700 text-sm font-medium hover:bg-stone-200 transition-colors">
                      <MapPin className="w-4 h-4" /> Explore Resort
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
