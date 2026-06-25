'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Bed, ArrowRight, BadgeCheck, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { getRooms } from '@/lib/store';
import { siteTagline } from '@/lib/data';
import PageTransition from '@/components/animations/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

const categories = ['All', 'Featured', 'Family', 'Mountain View', 'Orchard'];

export default function RoomsPage() {
  const allRooms = getRooms();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRooms = allRooms.filter((room) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Featured') return room.featured;
    if (activeCategory === 'Family') return room.capacity >= 4;
    if (activeCategory === 'Mountain View') return room.title.toLowerCase().includes('view');
    if (activeCategory === 'Orchard') return room.title.toLowerCase().includes('orchard');
    return true;
  });

  return (
    <PageTransition>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1615571022219-eb45cf7faa36?w=1600&q=80"
            alt="Heritage rooms at Pahadi Aangan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        </motion.div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <FadeIn delay={0.3}>
            <span className="text-ochre-400 text-sm tracking-[0.25em] uppercase mb-4 block">
              {siteTagline}
            </span>
          </FadeIn>
          <FadeIn delay={0.5}>
            <h1 className="font-serif text-5xl md:text-7xl text-clay-50 mb-4">Our Rooms</h1>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-stone-300 text-lg max-w-xl mx-auto">
              Each room is a handcrafted sanctuary — a blend of ancient traditions and modern comfort
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Choose Your Heritage Stay"
            subtitle="Handcrafted Stays"
            description="From Kathkuni stone cottages to panoramic mountain suites, find the room that speaks to your soul."
          />

          <FadeIn className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-ochre-600 text-clay-50 shadow-lg shadow-ochre-600/20'
                    : 'bg-stone-100 text-stone-600 hover:bg-ochre-100 hover:text-ochre-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <StaggerItem key={room.id}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/60 card-hover h-full flex flex-col group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                    {room.traditional && (
                      <span className="absolute top-4 left-4 bg-ochre-500/90 backdrop-blur-sm text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Traditional
                      </span>
                    )}
                    {room.featured && (
                      <span className="absolute top-4 right-4 bg-pine-600/90 backdrop-blur-sm text-clay-50 text-xs font-semibold px-3 py-1.5 rounded-full">
                        Featured
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl text-clay-50">{room.title}</h3>
                      <p className="text-stone-300 text-sm mt-1">{room.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">{room.description}</p>
                    {room.traditional && (
                      <p className="text-xs text-ochre-600 italic mt-2 line-clamp-2">{room.traditional}</p>
                    )}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <Users className="w-4 h-4 text-ochre-500" />
                        <span>Up to {room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <Bed className="w-4 h-4 text-ochre-500" />
                        <span>{room.bedType}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="text-xs bg-clay-50 text-stone-600 px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="text-xs bg-clay-50 text-stone-400 px-2 py-1 rounded-full">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100">
                      <div className="flex items-center gap-1 text-ochre-600 font-bold">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-lg">{room.price.toLocaleString('en-IN')}</span>
                        <span className="text-stone-400 text-xs font-normal">/night</span>
                      </div>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ochre-600 hover:text-ochre-500 transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredRooms.length === 0 && (
            <p className="text-center text-stone-400 py-12">No rooms match this category.</p>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-clay-50">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-600">
              Ready to Escape?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">
              Book Your Himalayan Retreat
            </h2>
            <p className="text-stone-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Choose your perfect room and let the mountains embrace you. Early booking discounts available.
            </p>
            <div className="mt-8">
              <Button href="/booking" variant="primary" size="lg">
                Book Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
