'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBookings, updateBookingStatus } from '@/lib/store';
import { Booking } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatPrice, formatDate, getStatusColor, cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  Search,
  ChevronUp,
  Check,
  X,
  Eye,
  CalendarCheck,
} from 'lucide-react';

const statusTabs = ['All', 'Pending', 'Confirmed', 'Checked In', 'Checked Out', 'Cancelled'] as const;
const statusMap: Record<string, Booking['status']> = {
  'Pending': 'pending',
  'Confirmed': 'confirmed',
  'Checked In': 'checked-in',
  'Checked Out': 'checked-out',
  'Cancelled': 'cancelled',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try { return getBookings(); } catch { return []; }
  });
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.roomTitle.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'All' || b.status === statusMap[activeTab];
    return matchesSearch && matchesTab;
  });

  const handleStatusChange = (id: string, status: Booking['status']) => {
    try {
      updateBookingStatus(id, status);
      setBookings(getBookings());
      toast.success(`Booking marked as ${status}`);
    } catch {
      toast.error('Failed to update booking');
    }
  };

  const handleCancelConfirm = () => {
    if (cancelConfirmId) {
      handleStatusChange(cancelConfirmId, 'cancelled');
      setCancelConfirmId(null);
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Bookings</h1>
            <p className="mt-0.5 text-sm text-stone-500">{bookings.length} total bookings</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-9 pr-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-ochre-400 focus:ring-1 focus:ring-ochre-400 transition-colors"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-1 border-b border-stone-200">
          {statusTabs.map((tab) => {
            const count = tab === 'All'
              ? bookings.length
              : bookings.filter((b) => b.status === statusMap[tab]).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'relative px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px inline-flex items-center gap-2',
                  activeTab === tab
                    ? 'border-ochre-500 text-ochre-700'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                )}
              >
                {tab}
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  activeTab === tab ? 'bg-ochre-100 text-ochre-700' : 'bg-stone-100 text-stone-500'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 text-left">
                  <th className="px-4 py-3 font-semibold text-stone-600">ID</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Guest</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Room</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Dates</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Amount</th>
                  <th className="px-4 py-3 font-semibold text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex flex-col items-center gap-3 py-12 text-stone-400">
                        <CalendarCheck className="h-10 w-10" />
                        <p className="text-sm font-medium">No bookings found</p>
                        <p className="text-xs">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <React.Fragment key={b.id}>
                      <tr
                        className="group transition-colors hover:bg-clay-50/50 cursor-pointer"
                        onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-stone-500">{b.id}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-stone-800">{b.guestName}</div>
                          <div className="text-xs text-stone-400">{b.guestEmail}</div>
                        </td>
                        <td className="px-4 py-3 text-stone-600">{b.roomTitle}</td>
                        <td className="px-4 py-3 text-xs text-stone-500 whitespace-nowrap">
                          {formatDate(b.checkIn)} — {formatDate(b.checkOut)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', getStatusColor(b.status))}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-stone-800">{formatPrice(b.totalAmount)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                              className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
                              title={expandedId === b.id ? 'Hide details' : 'View details'}
                            >
                              {expandedId === b.id ? <ChevronUp className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                            {b.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(b.id, 'confirmed')}
                                  className="rounded-lg p-1.5 text-pine-600 hover:bg-pine-50 transition-colors"
                                  title="Confirm"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setCancelConfirmId(b.id)}
                                  className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 transition-colors"
                                  title="Cancel"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {b.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(b.id, 'checked-in')}
                                  className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Check In"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setCancelConfirmId(b.id)}
                                  className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 transition-colors"
                                  title="Cancel"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {b.status === 'checked-in' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'checked-out')}
                                className="rounded-lg px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Check Out"
                              >
                                Check Out
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      <AnimatePresence>
                        {expandedId === b.id && (
                          <tr>
                            <td colSpan={7} className="p-0">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-stone-100 bg-clay-50/30 px-6 py-4">
                                  <div className="grid gap-4 sm:grid-cols-3 text-sm">
                                    <div>
                                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Contact</span>
                                      <p className="mt-1 text-stone-700">{b.guestEmail}</p>
                                      <p className="text-stone-700">{b.guestPhone}</p>
                                    </div>
                                    <div>
                                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Booking Details</span>
                                      <p className="mt-1 text-stone-700">Room: {b.roomTitle}</p>
                                      <p className="text-stone-700">Guests: {b.guests}</p>
                                      <p className="text-stone-700">Payment: <span className="capitalize">{b.paymentStatus}</span></p>
                                      <p className="text-stone-700">Created: {formatDate(b.createdAt)}</p>
                                    </div>
                                    <div>
                                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Special Requests</span>
                                      <p className="mt-1 italic text-stone-600">{b.specialRequests || 'None'}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      <ConfirmModal
        open={!!cancelConfirmId}
        onClose={() => setCancelConfirmId(null)}
        onConfirm={handleCancelConfirm}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="Cancel Booking"
      />
    </div>
  );
}
