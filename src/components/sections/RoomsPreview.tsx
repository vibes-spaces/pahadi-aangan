'use client';
import { ArrowRight, Users, IndianRupee, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { getRooms } from '@/lib/store';
import SectionHeader from '@/components/ui/SectionHeader';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import Button from '@/components/ui/Button';

export default function RoomsPreview() {
  const rooms = getRooms().filter((r) => r.featured);

  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Our Heritage Rooms"
          subtitle="Handcrafted Stays"
          description="Each room is a tribute to Himachali craftsmanship — from Kathkuni stone cottages to apple orchard retreats."
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <StaggerItem key={room.id}>
              <Link href={`/rooms/${room.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/60 card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'}
                      alt={room.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-ochre-500/90 backdrop-blur-sm text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Traditional
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-xl text-clay-50 group-hover:text-ochre-300 transition-colors">
                        {room.title}
                      </h3>
                      <p className="text-stone-300 text-sm mt-1">{room.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <Users className="w-4 h-4" />
                        <span>Up to {room.capacity} guests</span>
                      </div>
                      <div className="flex items-center gap-1 text-ochre-600 font-semibold">
                        <IndianRupee className="w-4 h-4" />
                        <span>{room.price.toLocaleString('en-IN')}/night</span>
                      </div>
                    </div>
                    <p className="text-stone-500 text-sm mt-3 line-clamp-2">{room.description}</p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Button href="/rooms" variant="outline" size="lg">
            View All Rooms
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
