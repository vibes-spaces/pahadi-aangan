'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, IndianRupee, Check, Mountain, ChefHat, Compass, Sparkles, Leaf } from 'lucide-react';
import { getExperiences } from '@/lib/store';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const categories = ['All', 'Culture', 'Food', 'Adventure', 'Wellness', 'Nature'];
const categoryIcons: Record<string, React.ReactNode> = {
  Culture: <Mountain className="w-3.5 h-3.5" />,
  Food: <ChefHat className="w-3.5 h-3.5" />,
  Adventure: <Compass className="w-3.5 h-3.5" />,
  Wellness: <Sparkles className="w-3.5 h-3.5" />,
  Nature: <Leaf className="w-3.5 h-3.5" />,
};

export default function ExperiencesPage() {
  const experiences = getExperiences();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? experiences : experiences.filter(e => e.category === activeCategory);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt="Himalayan trek"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        </div>
        <FadeIn className="relative z-10 text-center px-4">
          <span className="text-ochre-400 text-xs font-semibold tracking-[0.2em] uppercase">Discover</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-2">Experiences</h1>
          <p className="text-stone-300 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Immersive Experiences in the Himalayas
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
                  'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-ochre-600 text-clay-50 shadow-md shadow-ochre-600/20'
                    : 'bg-white text-stone-600 hover:bg-ochre-50 hover:text-ochre-700 border border-stone-200'
                )}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-20 bg-clay-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <StaggerContainer key={activeCategory} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(exp => (
                <StaggerItem key={exp.id}>
                  <motion.div
                    layout
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 card-hover group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exp.images[0]}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute top-3 left-3 bg-ochre-600 text-clay-50 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                        {exp.category}
                      </span>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-serif text-lg text-white">{exp.title}</h3>
                        <p className="text-stone-300 text-xs">{exp.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
                        {exp.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-ochre-500" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-stone-700">
                          <IndianRupee className="w-3.5 h-3.5 text-pine-600" />
                          {exp.price}
                        </span>
                      </div>
                      {exp.included.length > 0 && (
                        <div className="pt-3 border-t border-stone-100">
                          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Included</p>
                          <div className="grid grid-cols-1 gap-1.5">
                            {exp.included.map((item, i) => (
                              <span key={i} className="flex items-center gap-1.5 text-xs text-stone-500">
                                <Check className="w-3 h-3 text-pine-500 flex-shrink-0" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <Link href={`/experiences/${exp.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center text-stone-400 py-12">No experiences match this category.</p>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
