'use client';
import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getRooms } from '@/lib/store';
import { calculateNights } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import {
  ArrowLeft, Users, BedDouble, Maximize2, Wifi, Tv, Coffee,
  Wind, ShieldCheck, Bath, Snowflake, UtensilsCrossed, Car,
  TreePine, Flame,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const amenityIcons: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi className="w-5 h-5" />,
  'Smart TV': <Tv className="w-5 h-5" />,
  'Tea/Coffee Maker': <Coffee className="w-5 h-5" />,
  'Rain Shower': <Bath className="w-5 h-5" />,
  'Hair Dryer': <Wind className="w-5 h-5" />,
  'In-room Safe': <ShieldCheck className="w-5 h-5" />,
  'Eco-friendly Toiletries': <ShieldCheck className="w-5 h-5" />,
  'Private Sit-out': <Maximize2 className="w-5 h-5" />,
  'Traditional Pahadi Weaves': <Maximize2 className="w-5 h-5" />,
  'Handcrafted Stone & Wood Interior': <TreePine className="w-5 h-5" />,
  'Mini Bar': <Coffee className="w-5 h-5" />,
  'Fireplace': <Flame className="w-5 h-5" />,
  'Private Terrace': <Maximize2 className="w-5 h-5" />,
  'Copper Soaking Tub': <Bath className="w-5 h-5" />,
  'Hand-painted Murals': <Maximize2 className="w-5 h-5" />,
  'Carved Wood Ceiling': <TreePine className="w-5 h-5" />,
  'Traditional Kullu Weaves': <Maximize2 className="w-5 h-5" />,
  'Orchard Views': <TreePine className="w-5 h-5" />,
  'Traditional Jhoola (Swing)': <Maximize2 className="w-5 h-5" />,
  'Hand-block-printed Textiles': <Maximize2 className="w-5 h-5" />,
  'Garden Access': <TreePine className="w-5 h-5" />,
  'Bicycle on Request': <Car className="w-5 h-5" />,
  'Bonfire Access': <Flame className="w-5 h-5" />,
  'Panoramic Mountain Views': <Maximize2 className="w-5 h-5" />,
  'Private Balcony': <Maximize2 className="w-5 h-5" />,
  'Slate Floor Heating': <Snowflake className="w-5 h-5" />,
  'Himalayan Cedar Furniture': <TreePine className="w-5 h-5" />,
  'Premium Toiletries': <ShieldCheck className="w-5 h-5" />,
  'Two Bedrooms': <BedDouble className="w-5 h-5" />,
  'Private Courtyard': <Maximize2 className="w-5 h-5" />,
  'Living & Dining Area': <UtensilsCrossed className="w-5 h-5" />,
  'Full Kitchenette': <UtensilsCrossed className="w-5 h-5" />,
  'Refrigerator': <Snowflake className="w-5 h-5" />,
  'Traditional Pahadi Quilts': <Maximize2 className="w-5 h-5" />,
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
];

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const rooms = getRooms();
  const room = rooms.find(r => r.slug === slug);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  if (!room) notFound();

  const images = room.images.length >= 4 ? room.images : [...room.images, ...fallbackImages].slice(0, 4);

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    const nights = calculateNights(checkIn, checkOut);
    const total = nights * room.price;
    const bookingData = {
      roomType: room.id,
      roomTitle: room.title,
      checkIn,
      checkOut,
      guests: parseInt(guests) || 2,
      totalAmount: total,
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      specialRequests: '',
    };
    localStorage.setItem('pa_temp_booking', JSON.stringify(bookingData));
    router.push('/booking');
  };

  return (
    <PageTransition>
      <div>
        <div className="relative h-[60vh] md:h-[70vh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${room.images[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <FadeIn>
              <span className="inline-block px-4 py-1.5 bg-ochre-600 text-clay-50 text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
                Traditional Heritage Room
              </span>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-2">{room.title}</h1>
              <p className="text-stone-300 text-lg md:text-xl">{room.subtitle}</p>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <FadeIn>
                <p className="text-stone-600 text-lg leading-relaxed">{room.description}</p>
                <p className="text-stone-500 mt-4 leading-relaxed">{room.longDescription}</p>
              </FadeIn>

              <FadeIn>
                <SectionHeader title="Amenities" subtitle="Room Features" />
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity) => (
                    <StaggerItem key={amenity}>
                      <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:border-ochre-300 transition-colors">
                        <span className="text-ochre-600 shrink-0 mt-0.5">
                          {amenityIcons[amenity] || <Maximize2 className="w-5 h-5" />}
                        </span>
                        <span className="text-sm text-stone-700">{amenity}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeIn>

              <FadeIn>
                <SectionHeader title="Traditional Architecture" subtitle="Heritage Craftsmanship" />
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80)` }}
                  />
                  <div className="absolute inset-0 bg-stone-900/60" />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center max-w-2xl">
                      <p className="text-white text-lg md:text-xl font-serif italic">&ldquo;{room.traditional}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <SectionHeader title="Gallery" subtitle="Room Photos" />
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <StaggerItem key={i}>
                      <div className="relative h-48 rounded-xl overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeIn>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FadeIn>
                  <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-lg">
                    <div>
                      <span className="text-3xl font-bold text-ochre-600">{room.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span>
                      <span className="text-stone-500 text-sm"> / night</span>
                    </div>
                    <div className="space-y-3 text-sm text-stone-600">
                      <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                        <Maximize2 className="w-4 h-4 text-ochre-600" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                        <Users className="w-4 h-4 text-ochre-600" />
                        <span>Up to {room.capacity} guests</span>
                      </div>
                      <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                        <BedDouble className="w-4 h-4 text-ochre-600" />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Maximize2 className="w-4 h-4 text-ochre-600" />
                        <span className="capitalize">{room.slug.replace(/-/g, ' ')}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">Check-in</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={e => setCheckIn(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">Check-out</label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={e => setCheckOut(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase tracking-wider">Guests</label>
                        <select
                          value={guests}
                          onChange={e => setGuests(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/40 focus:border-ochre-500"
                        >
                          {Array.from({ length: room.capacity }, (_, i) => i + 1).map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {checkIn && checkOut && (
                      <div className="text-sm text-stone-600 flex justify-between items-center pb-3 border-b border-stone-100">
                        <span>Total ({calculateNights(checkIn, checkOut)} nights)</span>
                        <span className="font-bold text-ochre-600">{(calculateNights(checkIn, checkOut) * room.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span>
                      </div>
                    )}
                    <Button onClick={handleBooking} className="w-full" size="lg">
                      Book This Room
                    </Button>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          <FadeIn className="mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-ochre-600 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
