'use client';
import { ArrowRight, Award, Calendar, Home, Star } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import Button from '@/components/ui/Button';

const stats = [
  { icon: Calendar, end: 2019, suffix: '', label: 'Established' },
  { icon: Home, end: 5, suffix: '', label: 'Heritage Rooms' },
  { icon: Star, end: 50, suffix: '+', label: '5-Star Reviews' },
  { icon: Award, end: 8, suffix: '+', label: 'Awards Won' },
];

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-28 px-4 bg-clay-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1597074866935-eaedd6607122?w=800&q=80"
                alt="Traditional Himachali architecture details"
                loading="lazy"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-ochre-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-pine-500/10 rounded-full blur-3xl" />
          </FadeIn>

          <FadeIn direction="right">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-600">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">
              Where Heritage Meets the Himalayas
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mt-4">
              Nestled in the serene Kullu Valley, Pahadi Aangan is a heritage retreat that celebrates the timeless beauty of traditional Himachali architecture. Every stone and beam tells a story of craftsmanship passed down through generations.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed mt-3">
              Inspired by the ancient Kathkuni building technique — where stone and deodar wood interlock without mortar — our retreat offers an authentic Himalayan experience with modern comforts woven seamlessly into the heritage fabric.
            </p>
            <div className="mt-6">
              <Button href="/about" variant="primary">
                Discover Our Heritage
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-16 md:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-200/60 card-hover">
                <div className="w-12 h-12 bg-ochre-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-ochre-600" />
                </div>
                <div className="font-serif text-3xl font-bold text-stone-900">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-stone-500 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
