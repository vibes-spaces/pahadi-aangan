'use client';
import { motion } from 'framer-motion';
import { Home, BedDouble, Mountain } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90" />
      </div>

      {/* Floating mountains decoration */}
      <motion.div
        className="absolute top-1/4 left-[10%] text-stone-600/10"
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Mountain className="w-24 h-24 md:w-32 md:h-32" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-[10%] text-stone-600/10"
        animate={{ y: [0, -20, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Mountain className="w-20 h-20 md:w-28 md:h-28" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-[20%] text-stone-600/5"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <Mountain className="w-16 h-16 md:w-20 md:h-20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="block font-serif text-[9rem] md:text-[12rem] leading-none text-ochre-500/80 select-none"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            404
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-2xl md:text-3xl text-white mt-2 mb-3">
            Lost in the Mountains?
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed mb-8">
            The trail you&apos;re looking for doesn&apos;t exist on our map.
            Let us guide you back to the path.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/">
            <Button variant="primary" size="lg">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/rooms">
            <Button variant="outline" size="lg">
              <BedDouble className="w-4 h-4" />
              View Rooms
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-stone-600 text-xs"
        >
          Pahadi Aangan &middot; A Heritage Retreat in the Himalayas
        </motion.p>
      </div>
    </div>
  );
}
