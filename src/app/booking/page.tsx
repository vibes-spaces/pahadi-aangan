'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getRooms, addBooking } from '@/lib/store';
import { formatPrice, calculateNights, cn } from '@/lib/utils';
import type { Room } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import {
  ArrowLeft, ArrowRight, Check, CalendarDays, Users, BedDouble,
  User, Mail, Phone, MessageSquare, CreditCard, Loader2,
  Smartphone, Building2, ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

const steps = ['Dates', 'Room', 'Details', 'Payment', 'Confirm'];

type PaymentMethod = 'card' | 'upi' | 'netbanking';

function readTempBooking() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('pa_temp_booking');
    if (raw) {
      const data = JSON.parse(raw);
      localStorage.removeItem('pa_temp_booking');
      return data as Record<string, unknown>;
    }
  } catch {}
  return null;
}

export default function BookingPage() {
  const router = useRouter();
  const rooms = getRooms();
  const temp = useState(readTempBooking)[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [checkIn, setCheckIn] = useState(temp?.checkIn ? String(temp.checkIn) : '');
  const [checkOut, setCheckOut] = useState(temp?.checkOut ? String(temp.checkOut) : '');
  const [guests, setGuests] = useState(temp?.guests ? String(temp.guests) : '2');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(
    temp?.roomType ? rooms.find(r => r.id === temp.roomType) || null : null
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const totalAmount = selectedRoom ? nights * selectedRoom.price : 0;

  const canGoNext = () => {
    if (currentStep === 1) return checkIn && checkOut && parseInt(guests) > 0;
    if (currentStep === 2) return selectedRoom !== null;
    if (currentStep === 3) return name.trim() && email.trim() && phone.trim();
    if (currentStep === 4) {
      if (paymentMethod === 'card') return cardNumber.trim().length >= 16 && cardName.trim() && cardExpiry.trim() && cardCvv.trim().length >= 3;
      if (paymentMethod === 'upi') return upiId.trim().includes('@');
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (!canGoNext()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setCurrentStep(s => Math.min(s + 1, 5));
  };

  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const processPayment = (): Promise<boolean> => {
    return new Promise(resolve => {
      setPaymentProcessing(true);
      setTimeout(() => {
        setPaymentProcessing(false);
        setPaymentComplete(true);
        resolve(true);
      }, 2000);
    });
  };

  const handleConfirm = async () => {
    if (!selectedRoom || !checkIn || !checkOut) return;
    setSubmitting(true);
    try {
      const paid = await processPayment();
      if (!paid) {
        toast.error('Payment failed. Please try again.');
        setSubmitting(false);
        return;
      }
      addBooking({
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        roomType: selectedRoom.id,
        roomTitle: selectedRoom.title,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        status: 'pending',
        totalAmount,
        paymentStatus: 'paid',
        specialRequests: requests || undefined,
      });
      toast.success('Booking confirmed! Redirecting...');
      setTimeout(() => router.push('/guest/bookings'), 1500);
    } catch {
      toast.error('Failed to create booking');
      setSubmitting(false);
    }
  };

  const formatCardInput = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim().slice(0, 19);
  };

  const pmIcons: Record<PaymentMethod, React.ReactNode> = {
    card: <CreditCard className="w-5 h-5" />,
    upi: <Smartphone className="w-5 h-5" />,
    netbanking: <Building2 className="w-5 h-5" />,
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-clay-50">
        <div className="bg-stone-900 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <FadeIn>
              <h1 className="font-serif text-3xl md:text-4xl text-white text-center">Book Your Stay</h1>
              <p className="text-stone-400 text-center mt-2 text-sm">Experience the heritage of Himachal</p>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-6">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between">
                {steps.map((label, i) => {
                  const stepNum = i + 1;
                  const isActive = currentStep === stepNum;
                  const isComplete = currentStep > stepNum;
                  return (
                    <div key={label} className="flex items-center flex-1">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                          isComplete ? 'bg-ochre-600 text-white' : isActive ? 'bg-ochre-600 text-white ring-4 ring-ochre-200' : 'bg-stone-100 text-stone-400'
                        )}>
                          {isComplete ? <Check className="w-4 h-4" /> : stepNum}
                        </div>
                        <span className={cn('text-xs font-medium hidden md:inline', isActive ? 'text-ochre-600' : 'text-stone-400')}>{label}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={cn('flex-1 h-0.5 mx-2 md:mx-4', currentStep > stepNum ? 'bg-ochre-600' : 'bg-stone-200')} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-lg mb-8">
            {currentStep === 1 && (
              <FadeIn>
                <SectionHeader title="Select Dates" subtitle="Step 1" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-ochre-600" /> Check-in
                    </label>
                    <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-ochre-600" /> Check-out
                    </label>
                    <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-ochre-600" /> Guests
                    </label>
                    <select value={guests} onChange={e => setGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500">
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {nights > 0 && <p className="text-center text-sm text-stone-500 mt-4">{nights} night{nights > 1 ? 's' : ''}</p>}
              </FadeIn>
            )}

            {currentStep === 2 && (
              <FadeIn>
                <SectionHeader title="Select Room" subtitle="Step 2" />
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rooms.filter(r => r.available).map(room => (
                    <StaggerItem key={room.id}>
                      <button onClick={() => setSelectedRoom(room)}
                        className={cn('w-full text-left bg-white rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md',
                          selectedRoom?.id === room.id ? 'border-ochre-600 shadow-md shadow-ochre-200' : 'border-stone-200')}>
                        <div className="flex gap-4">
                          <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${room.images[0]})` }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-stone-900 text-sm">{room.title}</h3>
                                <p className="text-xs text-stone-500 mt-0.5">{room.subtitle}</p>
                              </div>
                              <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
                                selectedRoom?.id === room.id ? 'border-ochre-600' : 'border-stone-300')}>
                                {selectedRoom?.id === room.id && <div className="w-2.5 h-2.5 rounded-full bg-ochre-600" />}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-stone-500">
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{room.capacity}</span>
                              <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" />{room.bedType}</span>
                            </div>
                            <p className="text-ochre-600 font-bold text-sm mt-1">{formatPrice(room.price)} <span className="text-stone-400 font-normal text-xs">/ night</span></p>
                          </div>
                        </div>
                      </button>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeIn>
            )}

            {currentStep === 3 && (
              <FadeIn>
                <SectionHeader title="Guest Details" subtitle="Step 3" />
                <div className="max-w-xl mx-auto space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-ochre-600" /> Full Name
                    </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-ochre-600" /> Email
                    </label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-ochre-600" /> Phone
                    </label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-ochre-600" /> Special Requests
                    </label>
                    <textarea value={requests} onChange={e => setRequests(e.target.value)} placeholder="Any special requirements..." rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500 resize-none" />
                  </div>
                </div>
              </FadeIn>
            )}

            {currentStep === 4 && (
              <FadeIn>
                <SectionHeader title="Payment" subtitle="Step 4" />
                <div className="max-w-xl mx-auto space-y-5">
                  <div className="bg-clay-50 rounded-xl p-4 text-sm flex items-center justify-between">
                    <span className="text-stone-500">Total Amount</span>
                    <span className="text-xl font-bold text-ochre-600">{formatPrice(totalAmount)}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-3 uppercase tracking-wider">Payment Method</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(Object.entries({ card: 'Card', upi: 'UPI', netbanking: 'Net Banking' }) as [PaymentMethod, string][]).map(([key, label]) => (
                        <button key={key} onClick={() => setPaymentMethod(key)}
                          className={cn('flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                            paymentMethod === key ? 'border-ochre-600 bg-ochre-50' : 'border-stone-200 bg-white hover:border-stone-300')}>
                          {pmIcons[key]}
                          <span className="text-xs font-medium text-stone-700">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-stone-600 mb-1">Card Number</label>
                        <input type="text" value={cardNumber} onChange={e => setCardNumber(formatCardInput(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-600 mb-1">Cardholder Name</label>
                        <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name on card"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-stone-600 mb-1">Expiry</label>
                          <input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').slice(0, 5))} placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-stone-600 mb-1">CVV</label>
                          <input type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="***" maxLength={4}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="pt-2">
                      <label className="block text-xs font-medium text-stone-600 mb-1">UPI ID</label>
                      <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="example@upi"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500" />
                      <p className="text-xs text-stone-400 mt-1.5">Enter your UPI ID (e.g., name@paytm, name@upi)</p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="pt-2">
                      <label className="block text-xs font-medium text-stone-600 mb-1">Select Bank</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500">
                        <option value="">Select a bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                      </select>
                    </div>
                  )}
                </div>
              </FadeIn>
            )}

            {currentStep === 5 && (
              <FadeIn>
                <SectionHeader title="Confirm Booking" subtitle="Step 5" />
                <div className="max-w-xl mx-auto space-y-4">
                  <div className="bg-clay-50 rounded-xl p-5 space-y-3">
                    <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-stone-500">Room</span><span className="text-stone-900 font-medium">{selectedRoom?.title}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Check-in</span><span className="text-stone-900">{checkIn}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Check-out</span><span className="text-stone-900">{checkOut}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Guests</span><span className="text-stone-900">{guests}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Nights</span><span className="text-stone-900">{nights}</span></div>
                      <div className="border-t border-stone-200 pt-2 flex justify-between">
                        <span className="text-stone-500">Room Rate</span>
                        <span className="text-stone-900">{formatPrice(selectedRoom?.price || 0)} / night</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Payment</span>
                        <span className="text-stone-900 capitalize">{paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Payment Status</span>
                        <span className="inline-flex items-center gap-1 text-pine-600 font-medium text-xs"><ShieldCheck className="w-3.5 h-3.5" />Paid</span>
                      </div>
                      <div className="border-t border-stone-200 pt-2 flex justify-between text-lg">
                        <span className="font-semibold text-stone-900">Total</span>
                        <span className="font-bold text-ochre-600">{formatPrice(totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-clay-50 rounded-xl p-5 space-y-2 text-sm">
                    <h3 className="font-semibold text-stone-900 text-sm uppercase tracking-wider">Guest Information</h3>
                    <div className="flex justify-between"><span className="text-stone-500">Name</span><span className="text-stone-900">{name}</span></div>
                    <div className="flex justify-between"><span className="text-stone-500">Email</span><span className="text-stone-900">{email}</span></div>
                    <div className="flex justify-between"><span className="text-stone-500">Phone</span><span className="text-stone-900">{phone}</span></div>
                    {requests && <div className="flex justify-between"><span className="text-stone-500">Requests</span><span className="text-stone-900 text-right max-w-[200px]">{requests}</span></div>}
                  </div>
                  <Button onClick={handleConfirm} className="w-full" size="lg" disabled={submitting}>
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    {submitting ? (paymentComplete ? 'Confirmed!' : 'Processing Payment...') : 'Confirm & Complete Booking'}
                  </Button>
                </div>
              </FadeIn>
            )}
          </div>

          <FadeIn className="flex items-center justify-between pb-12">
            <div>
              {currentStep > 1 ? (
                <Button onClick={prevStep} variant="outline" size="md">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : (
                <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-ochre-600 transition-colors text-sm">
                  <ArrowLeft className="w-4 h-4" /> Cancel
                </Link>
              )}
            </div>
            {currentStep < 5 && (
              <Button onClick={nextStep} size="md">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}