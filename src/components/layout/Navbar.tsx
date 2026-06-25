'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Trees } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/dining', label: 'Dining' },
  { href: '/spa', label: 'Spa' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-ochre-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-ochre-600/20">
              <Trees className="w-5 h-5 text-clay-50" />
            </div>
            <div>
              <span className="font-serif text-lg text-white leading-tight block">Pahadi <span className="text-ochre-400">Aangan</span></span>
              <span className="text-[10px] text-stone-400 hidden sm:block leading-tight">A Heritage Retreat</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm text-stone-300 hover:text-ochre-400 transition-colors font-medium tracking-wide rounded-lg hover:bg-white/5">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919805017177" className="flex items-center gap-2 text-sm text-stone-300 hover:text-ochre-400 transition-colors">
              <Phone className="w-4 h-4" /> +91 98050 17177
            </a>
            <Link href="/booking" className="flex items-center gap-2 bg-ochre-600 text-clay-50 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-ochre-500 transition-all hover:shadow-lg hover:shadow-ochre-600/25">
              <Calendar className="w-4 h-4" /> Book Now
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-900/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                  className="block py-3 text-stone-300 hover:text-ochre-400 transition-colors font-medium">
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a href="tel:+919805017177" className="flex items-center gap-2 text-stone-300 text-sm">
                  <Phone className="w-4 h-4" /> +91 98050 17177
                </a>
                <Link href="/booking" onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-ochre-600 text-clay-50 px-5 py-3 rounded-full font-semibold">
                  <Calendar className="w-4 h-4" /> Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
