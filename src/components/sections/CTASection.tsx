'use client';
import { ArrowRight, Calendar } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80"
          alt="Himalayan sunset over mountains"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/70 to-stone-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <FadeIn>
          <span className="inline-block px-4 py-1.5 bg-ochre-500/20 border border-ochre-500/30 rounded-full text-ochre-400 text-xs font-semibold tracking-wider uppercase mb-6">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-clay-50 leading-tight">
            Ready to Experience the Himalayas?
          </h2>
          <p className="text-stone-300 text-lg mt-4 max-w-lg mx-auto">
            Book Your Heritage Stay Today — where every sunrise paints a new memory and every evening brings the warmth of Pahadi hospitality.
          </p>
          <div className="mt-8">
            <Button href="/booking" variant="primary" size="lg">
              <Calendar className="w-5 h-5" />
              Reserve Your Retreat
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
