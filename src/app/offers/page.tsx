'use client';
import { motion } from 'framer-motion';
import { Tag, Calendar, Copy, Percent } from 'lucide-react';
import { getOffers } from '@/lib/store';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import SectionHeader from '@/components/ui/SectionHeader';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function OffersPage() {
  const offers = getOffers();
  const featured = offers.filter(o => o.featured);
  const regular = offers.filter(o => !o.featured);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied "${code}" to clipboard!`);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(193,96,20,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-kathkuni opacity-20" />
        </div>
        <FadeIn className="relative z-10 text-center px-4">
          <Percent className="w-8 h-8 text-ochre-400 mx-auto mb-3" />
          <span className="text-ochre-400 text-xs font-semibold tracking-[0.2em] uppercase">Save on Your Stay</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-2">Special Offers</h1>
          <p className="text-stone-300 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Exclusive packages and seasonal deals for your Himalayan escape
          </p>
          <div className="w-16 h-0.5 bg-ochre-500 mx-auto mt-5" />
        </FadeIn>
      </section>

      {/* Featured Offers */}
      {featured.length > 0 && (
        <section className="py-16 md:pt-20 pb-8 bg-clay-50">
          <div className="max-w-6xl mx-auto px-4">
            <FadeIn className="mb-10">
              <SectionHeader
                title="Featured Offers"
                subtitle="Best Value"
                description="Hand-picked packages offering the best value for your Himalayan retreat"
              />
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {featured.map(offer => (
                <StaggerItem key={offer.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative bg-white rounded-2xl overflow-hidden shadow-md border border-ochre-200 card-hover"
                  >
                    <div className="absolute top-0 right-0">
                      <div className="bg-saffron-500 text-stone-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-bl-xl">
                        Featured
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-serif text-xl text-stone-900">{offer.title}</h3>
                        </div>
                        <span className="flex items-center gap-1 bg-ochre-100 text-ochre-700 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                          <Tag className="w-3 h-3" />
                          {offer.discount}
                        </span>
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed mb-5">{offer.description}</p>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-5">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-ochre-500" />
                          Valid until {formatDate(offer.validUntil)}
                        </span>
                      </div>
                      {offer.code && (
                        <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                          <span className="text-xs font-mono font-bold text-stone-800 flex-1">{offer.code}</span>
                          <button
                            onClick={() => copyCode(offer.code!)}
                            className="flex items-center gap-1 text-xs font-semibold text-ochre-600 hover:text-ochre-500 transition px-3 py-1.5 rounded-lg hover:bg-ochre-50"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Regular Offers */}
      <section className={cn('pb-16 md:pb-20', featured.length > 0 ? 'bg-clay-50' : 'py-16 md:py-20 bg-clay-50')}>
        <div className="max-w-6xl mx-auto px-4">
          {regular.length > 0 && (
            <>
              {featured.length > 0 && (
                <FadeIn className="mb-10">
                  <SectionHeader
                    title="More Offers"
                    subtitle="Additional Savings"
                  />
                </FadeIn>
              )}
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regular.map(offer => (
                  <StaggerItem key={offer.id}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 card-hover"
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-serif text-base text-stone-900 pr-2">{offer.title}</h3>
                          <span className="flex items-center gap-1 bg-ochre-100 text-ochre-700 text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                            <Tag className="w-2.5 h-2.5" />
                            {offer.discount}
                          </span>
                        </div>
                        <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-1">{offer.description}</p>
                        <div className="flex items-center text-xs text-stone-500 mb-3">
                          <Calendar className="w-3.5 h-3.5 text-ochre-500 mr-1.5" />
                          Valid until {formatDate(offer.validUntil)}
                        </div>
                        {offer.code && (
                          <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                            <span className="text-xs font-mono font-bold text-stone-800 flex-1">{offer.code}</span>
                            <button
                              onClick={() => copyCode(offer.code!)}
                              className="flex items-center gap-1 text-xs font-semibold text-ochre-600 hover:text-ochre-500 transition px-2 py-1 rounded-lg hover:bg-ochre-50"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
