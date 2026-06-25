'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, Clock, Phone, BadgeCheck } from 'lucide-react';
import { getMenuItems } from '@/lib/store';
import { MenuItem } from '@/lib/types';
import { siteTagline, contactInfo } from '@/lib/data';
import PageTransition from '@/components/animations/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

const categories = ['All', 'Starters', 'Main Course', 'Specialty', 'Soups', 'Breads', 'Desserts', 'Beverages'];

const highlights = [
  { icon: Leaf, text: 'Farm-to-table organic ingredients from local villages' },
  { icon: Sparkles, text: 'Traditional Dham thali & slow-cooked Pahadi delicacies' },
  { icon: Clock, text: 'Generations-old recipes passed down through Himachali families' },
];

export default function DiningPage() {
  const menuItems = getMenuItems();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((item: MenuItem) => item.category === activeCategory);

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
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt="Chamba Restaurant"
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
            <h1 className="font-serif text-5xl md:text-7xl text-clay-50 mb-4">Dining</h1>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-stone-300 text-lg max-w-xl mx-auto">
              A culinary journey through the heart of the Himalayas
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <FadeIn direction="left" className="order-2 md:order-1">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-600">
                Our Restaurant
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">
                Chamba — A Taste of the Hills
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mt-4">
                Named after the historic Chamba region, our restaurant brings the authentic flavors of Himachal Pradesh to your table. Every dish is crafted with locally sourced ingredients and generations-old family recipes.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed mt-3">
                From the beloved Siddu — steamed wheat dumplings stuffed with poppy seeds — to the aromatic Madra, each meal at Chamba is a celebration of Pahadi culinary heritage.
              </p>
              <div className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-ochre-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-ochre-600" />
                    </div>
                    <span className="text-stone-600 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right" className="order-1 md:order-2 relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                  alt="Chamba restaurant dining"
                  className="w-full h-[450px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-ochre-500 text-stone-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg">
                Traditional Pahadi Cuisine
              </div>
            </FadeIn>
          </div>

          <SectionHeader
            title="Our Menu"
            subtitle="Handcrafted Flavors"
            description="A carefully curated menu that celebrates the rich culinary traditions of Himachal Pradesh."
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

          <StaggerContainer className="max-w-4xl mx-auto space-y-4">
            {filteredItems.map((item: MenuItem) => (
              <StaggerItem key={item.id}>
                <div className="bg-clay-50 rounded-xl p-5 flex items-start justify-between gap-4 card-hover border border-stone-200/60">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-serif text-lg text-stone-900">{item.name}</h3>
                      {item.traditional && (
                        <span className="inline-flex items-center gap-1 text-xs bg-ochre-100 text-ochre-700 font-semibold px-2.5 py-1 rounded-full">
                          <BadgeCheck className="w-3 h-3" />
                          Traditional
                        </span>
                      )}
                    </div>
                    <p className="text-stone-500 text-sm mt-1">{item.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-ochre-600 font-bold text-lg whitespace-nowrap">{item.price}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredItems.length === 0 && (
            <p className="text-center text-stone-400 py-12">No items in this category.</p>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-400">
                Reserve a Table
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-clay-50 mt-2 leading-tight">
                Join Us at Chamba
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed mt-4">
                Whether it&apos;s a romantic dinner for two, a family celebration, or a special Himachali feast, our team will curate an unforgettable dining experience.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-stone-300 text-sm">
                  <Phone className="w-4 h-4 text-ochre-400" />
                  <span>{contactInfo.phones[0]}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300 text-sm">
                  <Clock className="w-4 h-4 text-ochre-400" />
                  <span>Open Daily: 7:00 AM — 10:00 PM</span>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="/booking" variant="primary" size="lg">
                  Reserve Your Table
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/contact" variant="outline" size="lg" className="border-stone-400/30 text-stone-300 hover:bg-stone-800 hover:text-clay-50">
                  Contact Us
                </Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                  alt="Fine dining experience"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
