'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, IndianRupee, Check, Phone, Mail, Heart, Building2, Cake, Tent, VenetianMask } from 'lucide-react';
import { contactInfo } from '@/lib/data';
import { getEvents } from '@/lib/store';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const categories = ['All', 'Wedding', 'Corporate', 'Celebration', 'Cultural'] as const;
const categoryMap: Record<string, string> = {
  Wedding: 'wedding',
  Corporate: 'corporate',
  Celebration: 'celebration',
  Cultural: 'cultural',
};

const iconMap: Record<string, React.ReactNode> = {
  Ring: <Heart className="w-5 h-5" />,
  Building: <Building2 className="w-5 h-5" />,
  Cake: <Cake className="w-5 h-5" />,
  Temple: <Tent className="w-5 h-5" />,
};

export default function EventsPage() {
  const events = getEvents();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All' ? events : events.filter(e => e.category === categoryMap[activeCategory]);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1600&q=80"
            alt="Celebration event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        </div>
        <FadeIn className="relative z-10 text-center px-4">
          <span className="text-ochre-400 text-xs font-semibold tracking-[0.2em] uppercase">Celebrate</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-2">Events & Celebrations</h1>
          <p className="text-stone-300 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Celebrate in the Himalayas
          </p>
          <div className="w-16 h-0.5 bg-ochre-500 mx-auto mt-5" />
        </FadeIn>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-clay-100 sticky top-16 z-20 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-ochre-600 text-clay-50 shadow-md shadow-ochre-600/20'
                    : 'bg-white text-stone-600 hover:bg-ochre-50 hover:text-ochre-700 border border-stone-200'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 md:py-20 bg-clay-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <StaggerContainer key={activeCategory} className="grid md:grid-cols-2 gap-8">
              {filtered.map(event => (
                <StaggerItem key={event.id}>
                  <motion.div
                    layout
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 card-hover p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-ochre-100 text-ochre-600 flex items-center justify-center flex-shrink-0">
                        {iconMap[event.icon] || <VenetianMask className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-stone-900">{event.title}</h3>
                        <span className="inline-block mt-1 bg-ochre-50 text-ochre-700 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-5">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mb-5 text-xs text-stone-500">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-ochre-500" />
                        {event.capacity}
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-stone-700">
                        <IndianRupee className="w-3.5 h-3.5 text-pine-600" />
                        {event.pricing}
                      </span>
                    </div>
                    {event.features.length > 0 && (
                      <div className="pt-4 border-t border-stone-100">
                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-3">Features</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {event.features.map((feat, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-xs text-stone-500">
                              <Check className="w-3 h-3 text-pine-500 flex-shrink-0" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center text-stone-400 py-12">No events match this category.</p>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-kathkuni opacity-30" />
        <FadeIn className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Plan Your Event</h2>
          <p className="text-stone-400 text-sm mb-8 max-w-lg mx-auto">
            Let us help you create an unforgettable celebration in the heart of the Himalayas.
            Reach out to our events team for a personalized consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}>
              <Button variant="primary" size="lg">
                <Phone className="w-4 h-4" />
                {contactInfo.phones[0]}
              </Button>
            </a>
            <a href={`mailto:${contactInfo.email}`}>
              <Button variant="outline" size="lg">
                <Mail className="w-4 h-4" />
                Email Inquiries
              </Button>
            </a>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
