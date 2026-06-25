'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Instagram, Facebook, YT as Youtube } from '@/lib/icons';
import { contactInfo } from '@/lib/data';
import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      const existing = JSON.parse(localStorage.getItem('pa_contact_messages') || '[]');
      existing.push({ ...form, id: Date.now(), timestamp: new Date().toISOString() });
      localStorage.setItem('pa_contact_messages', JSON.stringify(existing));
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const contactCards = [
    { icon: <MapPin className="w-5 h-5" />, title: 'Address', content: contactInfo.addressFull },
    { icon: <Phone className="w-5 h-5" />, title: 'Phone', content: contactInfo.phones.join(' / ') },
    { icon: <Mail className="w-5 h-5" />, title: 'Email', content: contactInfo.email },
    {
      icon: <Instagram className="w-5 h-5" />,
      title: 'Follow Us',
      content: 'Social Media',
      links: [
        { label: 'Instagram', href: contactInfo.instagram, icon: <Instagram className="w-4 h-4" /> },
        { label: 'Facebook', href: contactInfo.facebook, icon: <Facebook className="w-4 h-4" /> },
        { label: 'YouTube', href: contactInfo.youtube, icon: <Youtube className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <div className="absolute inset-0 bg-kathkuni opacity-20" />
        </div>
        <FadeIn className="relative z-10 text-center px-4">
          <span className="text-ochre-400 text-xs font-semibold tracking-[0.2em] uppercase">Connect</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-2">Get in Touch</h1>
          <p className="text-stone-300 text-sm md:text-base mt-4 max-w-xl mx-auto">
            We&apos;d love to hear from you
          </p>
          <div className="w-16 h-0.5 bg-ochre-500 mx-auto mt-5" />
        </FadeIn>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-clay-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <FadeIn className="lg:col-span-3" direction="left">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
                <h3 className="font-serif text-xl text-stone-900 mb-1">Send us a Message</h3>
                <p className="text-stone-400 text-xs mb-6">We typically respond within 24 hours</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-clay-50 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-clay-50 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 transition"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-clay-50 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 transition"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-clay-50 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 transition"
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="events">Events & Celebrations</option>
                        <option value="spa">Spa & Wellness</option>
                        <option value="dining">Dining</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-clay-50 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 transition resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </FadeIn>

            {/* Info Cards */}
            <FadeIn className="lg:col-span-2" direction="right">
              <div className="space-y-4">
                {contactCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ochre-100 text-ochre-600 flex items-center justify-center flex-shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm text-stone-900 mb-0.5">{card.title}</h4>
                        {'links' in card && card.links ? (
                          <div className="flex flex-wrap gap-3 mt-1.5">
                            {card.links.map((link, j) => (
                              <a
                                key={j}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-ochre-600 transition"
                              >
                                {link.icon}
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="text-stone-500 text-xs leading-relaxed">{card.content}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-stone-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h3 className="font-serif text-xl text-white mb-6 text-center">Find Us</h3>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-700">
            <iframe
              src={contactInfo.mapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pahadi Aangan Location"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
