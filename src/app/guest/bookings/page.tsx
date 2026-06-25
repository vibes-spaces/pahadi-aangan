'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getBookings, updateBookingStatus } from '@/lib/store';
import { formatPrice, formatDate, getStatusColor, cn } from '@/lib/utils';
import type { Booking } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import {
  BedDouble, User, LogIn, ArrowLeft,
  XCircle, CalendarDays, Phone, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface GuestAuth {
  name: string;
  email: string;
  phone?: string;
}

const storedAuth: GuestAuth | null = (() => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('guest_auth');
    return raw ? JSON.parse(raw) as GuestAuth : null;
  } catch { return null; }
})();

export default function GuestBookingsPage() {
  const [auth] = useState<GuestAuth | null>(storedAuth);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (!storedAuth) return [];
    try {
      const all = getBookings();
      return all.filter(b => b.guestEmail.toLowerCase() === storedAuth.email.toLowerCase());
    } catch { return []; }
  });
  const [cancelling, setCancelling] = useState<string | null>(null);

  const handleCancel = (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(bookingId);
    setTimeout(() => {
      try {
        updateBookingStatus(bookingId, 'cancelled');
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b));
        toast.success('Booking cancelled successfully');
      } catch {
        toast.error('Failed to cancel booking');
      } finally {
        setCancelling(null);
      }
    }, 500);
  };

  const canCancel = (status: string) => ['pending', 'confirmed'].includes(status);

  if (!auth) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-clay-50 px-4">
          <FadeIn className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-ochre-100 flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-ochre-600" />
            </div>
            <h1 className="font-serif text-3xl text-stone-900 mb-3">My Bookings</h1>
            <p className="text-stone-500 mb-8">Please sign in to view your bookings.</p>
            <Button href="/auth/login" size="lg">
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
          </FadeIn>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-clay-50">
        <div className="bg-stone-900 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <FadeIn>
              <Link href="/guest" className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-sm transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl text-white">My Bookings</h1>
              <p className="text-stone-400 mt-2 text-sm">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} found</p>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-6 pb-12">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-6 shadow-lg mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ochre-100 flex items-center justify-center text-ochre-700 font-bold text-lg shrink-0">
                  {auth.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">{auth.name}</p>
                  <p className="text-xs text-stone-500">{auth.email}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {bookings.length === 0 ? (
            <FadeIn>
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center shadow-lg">
                <BedDouble className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                <h2 className="font-serif text-xl text-stone-900 mb-2">No Bookings Yet</h2>
                <p className="text-stone-500 text-sm mb-6">Start planning your heritage retreat in the Himalayas.</p>
                <Button href="/booking" size="lg">Book Your Stay</Button>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="space-y-4">
              {bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((b) => (
                <StaggerItem key={b.id}>
                  <div className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className={cn('px-3 py-1 text-[10px] font-semibold uppercase rounded-full', getStatusColor(b.status))}>{b.status}</span>
                          <span className="text-xs text-stone-400">{b.id}</span>
                        </div>
                        <h3 className="font-semibold text-stone-900">{b.roomTitle}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                          <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />{formatDate(b.checkIn)} - {formatDate(b.checkOut)}</span>
                          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{b.guests} Guest{b.guests > 1 ? 's' : ''}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{b.guestPhone}</span>
                        </div>
                        {b.specialRequests && (
                          <p className="text-xs text-stone-400 italic">&ldquo;{b.specialRequests}&rdquo;</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="text-lg font-bold text-ochre-600">{formatPrice(b.totalAmount)}</p>
                        <span className={cn('text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full', getStatusColor(b.paymentStatus))}>{b.paymentStatus}</span>
                        {canCancel(b.status) && (
                          <Button
                            onClick={() => handleCancel(b.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            disabled={cancelling === b.id}
                          >
                            {cancelling === b.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
