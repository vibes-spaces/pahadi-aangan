'use client';
import { ArrowRight, Sparkles, Wind, Droplets } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

const treatments = [
  { icon: Sparkles, text: 'Himalayan Herbal Massages' },
  { icon: Wind, text: 'Ayurvedic Panchakarma Therapies' },
  { icon: Droplets, text: 'Hot Stone & Aromatherapy' },
];

export default function SpaPreview() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
          alt="Himalayan spa treatment"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-stone-900/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <FadeIn>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-400">
            Wellness & Rejuvenation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-clay-50 mt-2 leading-tight">
            Himalayan Spa Sanctuary
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mt-4 max-w-xl mx-auto">
            Drawing from centuries-old Himalayan healing traditions, our spa therapies combine rare mountain herbs, warm essential oils, and ancient techniques to restore balance to body and soul.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {treatments.map((t) => (
              <div key={t.text} className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-3">
                <t.icon className="w-4 h-4 text-ochre-400" />
                <span className="text-clay-50 text-sm font-medium">{t.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/spa" variant="primary" size="lg">
              Explore Spa Therapies
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
