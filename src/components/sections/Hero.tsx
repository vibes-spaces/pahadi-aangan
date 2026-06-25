'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1600&q=80"
          alt="Pahadi Aangan heritage retreat"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/30 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <FadeIn delay={0.2}>
          <span className="inline-flex items-center gap-2 text-ochre-400 text-sm tracking-[0.25em] uppercase mb-6">
            <MapPin className="w-4 h-4" />
            Kullu Valley, Himachal Pradesh
          </span>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-clay-50 mb-4 leading-tight">
            Pahadi
            <span className="block text-ochre-400">Aangan</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-stone-300 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Where ancient Kathkuni architecture meets the timeless beauty of the Himalayas — a heritage retreat woven into the mountains.
          </p>
        </FadeIn>

        <FadeIn delay={0.8} className="flex flex-col sm:flex-row gap-4">
          <Button href="/booking" variant="primary" size="lg">
            <Calendar className="w-5 h-5" />
            Book Your Stay
          </Button>
          <Button href="/rooms" variant="outline" size="lg" className="border-clay-50/30 text-clay-50 hover:bg-clay-50 hover:text-stone-900">
            Explore Rooms
            <ArrowRight className="w-5 h-5" />
          </Button>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="bg-stone-900/60 backdrop-blur-sm border border-ochre-500/20 rounded-full px-6 py-3 inline-flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-ochre-500 animate-pulse" />
            <span className="text-clay-50/80 text-sm font-medium tracking-wide">
              Traditional Kathkuni Architecture
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-stone-400/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-stone-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
