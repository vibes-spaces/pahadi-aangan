'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getGallery } from '@/lib/store';
import { GalleryItem } from '@/lib/types';
import { siteTagline } from '@/lib/data';
import PageTransition from '@/components/animations/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const categories = ['All', 'Architecture', 'Rooms', 'Dining', 'Exterior', 'Experiences', 'Events'];

export default function GalleryPage() {
  const allItems = getGallery();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All'
    ? allItems
    : allItems.filter((item: GalleryItem) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredItems.length : null);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredItems.length]);

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
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80"
            alt="Pahadi Aangan gallery"
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
            <h1 className="font-serif text-5xl md:text-7xl text-clay-50 mb-4">Gallery</h1>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-stone-300 text-lg max-w-xl mx-auto">
              Moments from Pahadi Aangan
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
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

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item: GalleryItem, index: number) => (
              <StaggerItem key={item.id}>
                <button
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-xl w-full block text-left"
                >
                  <div className="h-72">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-clay-50 font-semibold text-sm">{item.title}</h3>
                          <span className="text-stone-400 text-xs">{item.category}</span>
                        </div>
                        <div className="w-8 h-8 bg-ochre-500/90 rounded-full flex items-center justify-center">
                          <Maximize2 className="w-3.5 h-3.5 text-stone-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredItems.length === 0 && (
            <p className="text-center text-stone-400 py-12">No images in this category.</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-md flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-clay-50 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null)}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-clay-50 hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredItems.length : null)}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-clay-50 hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto px-4"
            >
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[80vh] w-auto mx-auto rounded-xl shadow-2xl"
              />
              <div className="text-center mt-4">
                <h3 className="text-clay-50 text-lg font-serif">{filteredItems[lightboxIndex].title}</h3>
                {filteredItems[lightboxIndex].caption && (
                  <p className="text-stone-400 text-sm mt-1">{filteredItems[lightboxIndex].caption}</p>
                )}
                <span className="text-ochre-400 text-xs uppercase tracking-wider mt-2 block">
                  {filteredItems[lightboxIndex].category} &mdash; {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
