'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getBookings, getStats } from '@/lib/store';
import { DashboardStats, Booking } from '@/lib/types';
import { formatPrice, formatDate, getStatusColor, cn } from '@/lib/utils';
import {
  CalendarCheck, IndianRupee, Users, Percent,
  ArrowRight, Clock, CheckCircle, LogIn, XCircle,
} from 'lucide-react';

const statCards = [
  { label: 'Total Bookings', icon: CalendarCheck, key: 'totalBookings' as const, color: 'text-ochre-600 bg-ochre-100' },
  { label: 'Total Revenue', icon: IndianRupee, key: 'totalRevenue' as const, color: 'text-pine-600 bg-pine-100', isCurrency: true },
  { label: 'Active Guests', icon: Users, key: 'activeGuests' as const, color: 'text-blue-600 bg-blue-100' },
  { label: 'Occupancy Rate', icon: Percent, key: 'occupancyRate' as const, color: 'text-saffron-600 bg-saffron-100', suffix: '%' },
];

const quickActions = [
  { label: 'Pending', icon: Clock, countKey: 'pendingBookings' as const, href: '/admin/bookings', color: 'text-ochre-600' },
  { label: 'Confirmed', icon: CheckCircle, countKey: 'confirmedBookings' as const, href: '/admin/bookings', color: 'text-pine-600' },
  { label: 'Checked In', icon: LogIn, countKey: 'checkedIn' as const, href: '/admin/bookings', color: 'text-blue-600' },
  { label: 'Cancelled', icon: XCircle, countKey: 'cancelledBookings' as const, href: '/admin/bookings', color: 'text-red-600' },
];

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats | null>(() => {
    try { return getStats(); } catch { return null; }
  });
  const [recentBookings] = useState<Booking[]>(() => {
    try { return getBookings().slice(-5).reverse(); } catch { return []; }
  });
  const [error] = useState<string | null>(() => {
    try { return getStats() ? null : 'No data available'; } catch { return 'Failed to load dashboard data'; }
  });

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center gap-4 py-24">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-sm text-stone-500">{error || 'No data available'}</p>
        <button onClick={() => window.location.reload()} className="rounded-lg bg-ochre-600 px-5 py-2 text-sm font-medium text-white hover:bg-ochre-500 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, icon: Icon, key, color, isCurrency, suffix }, idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.3 }}
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">{label}</span>
              <div className={cn('rounded-lg p-2', color)}>
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-stone-900">
              {isCurrency ? formatPrice(stats[key]) : key === 'occupancyRate' ? `${stats[key]}%` : stats[key].toLocaleString()}
              {suffix || ''}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-stone-200 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
              <h2 className="text-sm font-semibold text-stone-800">Recent Bookings</h2>
              <Link href="/admin/bookings" className="inline-flex items-center gap-1 text-xs font-medium text-ochre-600 hover:text-ochre-700">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {recentBookings.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-stone-400">
                <CalendarCheck className="h-10 w-10" />
                <p className="text-sm">No bookings yet</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {recentBookings.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-clay-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs text-stone-400 w-14">{b.id}</span>
                      <span className="text-sm font-medium text-stone-800 truncate">{b.guestName}</span>
                      <span className="hidden md:inline text-xs text-stone-400 truncate">{b.roomTitle}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="hidden lg:inline text-xs text-stone-400">{formatDate(b.checkIn)}</span>
                      <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', getStatusColor(b.status))}>{b.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-stone-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(({ label, icon: Icon, countKey, href, color }) => (
                <Link
                  key={countKey}
                  href={href}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-stone-200 bg-clay-50/50 p-3.5 text-center transition-all hover:bg-ochre-50 hover:border-ochre-200 hover:shadow-sm"
                >
                  <Icon className={cn('h-5 w-5', color)} />
                  <span className="text-xs font-medium text-stone-600">{label}</span>
                  <span className="text-xl font-bold text-stone-900">{stats[countKey]}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}