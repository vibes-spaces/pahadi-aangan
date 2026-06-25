'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, IndianRupee, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { contactInfo } from '@/lib/data';
import { getSpaTreatments } from '@/lib/store';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const categories = ['All', 'Massage', 'Ayurveda', 'Body', 'Steam', 'Couple'];

export default function SpaPage() {
  const treatments = getSpaTreatments();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? treatments : treatments.filter(t => t.category === activeCategory);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80"
            alt="Spa treatment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        </div>
        <FadeIn className="relative z-10 text-center px-4">
          <span className="text-ochre-400 text-xs font-semibold tracking-[0.2em] uppercase">Rejuvenate</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-2">Spa & Wellness</h1>
          <p className="text-stone-300 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Himalayan Wellness Sanctuary
          </p>
          <div className="w-16 h-0.5 bg-ochre-500 mx-auto mt-5" />
        </FadeIn>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-clay-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center max-w-3xl mx-auto mb-4">
            <p className="text-stone-500 text-sm md:text-base leading-relaxed">
              Drawing from ancient Himalayan healing traditions, our spa offers a sanctuary for body, mind, and soul.
              Each treatment uses locally sourced herbs, essential oils, and time-honored techniques
              passed down through generations of Pahadi healers.
            </p>
          </FadeIn>
        </div>
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

      {/* Treatments Grid */}
      <section className="py-16 md:py-20 bg-clay-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <StaggerContainer key={activeCategory} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(treatment => (
                <StaggerItem key={treatment.id}>
                  <motion.div
                    layout
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 card-hover group h-full flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={treatment.image}
                        alt={treatment.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-3 left-3 bg-ochre-600 text-clay-50 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                        {treatment.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1 space-y-3">
                      <h3 className="font-serif text-base text-stone-900">{treatment.title}</h3>
                      <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 flex-1">
                        {treatment.description}
                      </p>
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-stone-100">
                        <span className="flex items-center gap-1 text-stone-500">
                          <Clock className="w-3.5 h-3.5 text-ochre-500" />
                          {treatment.duration}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-stone-800">
                          <IndianRupee className="w-3.5 h-3.5 text-pine-600" />
                          {treatment.price}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center text-stone-400 py-12">No treatments match this category.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-kathkuni opacity-30" />
        <FadeIn className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 text-ochre-400 mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Book Your Spa Appointment</h2>
          <p className="text-stone-400 text-sm mb-8 max-w-lg mx-auto">
            Call us to reserve your preferred treatment time. Walk-ins welcome subject to availability.
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
                Email Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
