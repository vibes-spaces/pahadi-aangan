'use client';
import { useState } from 'react';
import { Trees, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Instagram, Facebook, YT } from '@/lib/icons';
import { getSiteSettings } from '@/lib/store';
import type { SiteSettings } from '@/lib/store';
import { contactInfo } from '@/lib/data';

const quickLinks = ['Home', 'Rooms', 'Experiences', 'Dining', 'Spa', 'Events', 'Gallery', 'Blog', 'Contact'];
const traditions = [
  { label: 'Kathkuni Architecture', href: '/blog/kathkuni-architecture-guide' },
  { label: 'Pahadi Cuisine', href: '/dining' },
  { label: 'Heritage Walks', href: '/experiences' },
  { label: 'Cultural Evenings', href: '/events' },
  { label: 'Apple Orchard', href: '/experiences' },
];

export default function Footer() {
  const [settings] = useState<SiteSettings | null>(() => {
    try { return getSiteSettings(); } catch { return null; }
  });

  const s = settings || {
    addressFull: contactInfo.addressFull,
    phones: contactInfo.phones,
    email: contactInfo.email,
  } as SiteSettings;

  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="relative">
        <div className="absolute inset-0 bg-kathkuni opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                <div className="w-10 h-10 bg-ochre-600 rounded-xl flex items-center justify-center">
                  <Trees className="w-5 h-5 text-clay-50" />
                </div>
                <span className="font-serif text-xl text-white">Pahadi <span className="text-ochre-400">Aangan</span></span>
              </Link>
              <p className="text-sm leading-relaxed mb-6">A heritage retreat celebrating the timeless beauty of traditional Himachali architecture. Experience the mountains the Pahadi way.</p>
              <div className="flex gap-3">
                <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-stone-700 rounded-xl flex items-center justify-center hover:border-ochre-500 hover:text-ochre-400 transition-all" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
                <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-stone-700 rounded-xl flex items-center justify-center hover:border-ochre-500 hover:text-ochre-400 transition-all" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
                <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-stone-700 rounded-xl flex items-center justify-center hover:border-ochre-500 hover:text-ochre-400 transition-all" aria-label="YouTube"><YT className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 font-serif">Quick Links</h4>
              <div className="space-y-2.5">
                {quickLinks.map((link) => (
                  <Link key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="block text-sm hover:text-ochre-400 transition-colors">{link}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 font-serif">Our Traditions</h4>
              <div className="space-y-2.5">
                {traditions.map(({ label, href }) => (
                  <Link key={label} href={href} className="block text-sm hover:text-ochre-400 transition-colors">{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 font-serif">Contact Info</h4>
              <div className="space-y-3.5 text-sm">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(s.addressFull)}`} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-ochre-400 transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-ochre-500" />
                  <span>{s.addressFull}</span>
                </a>
                {s.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="flex gap-3 hover:text-ochre-400 transition-colors">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0 text-ochre-500" />
                    <span>{phone}</span>
                  </a>
                ))}
                <a href={`mailto:${s.email}`} className="flex gap-3 hover:text-ochre-400 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-ochre-500" />
                  <span>{s.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 text-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Pahadi Aangan. All rights reserved. | A Heritage Hospitality Venture</p>
        </div>
      </div>
    </footer>
  );
}
