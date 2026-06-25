'use client';
import { ArrowRight, UtensilsCrossed, Leaf, Sparkles } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

const highlights = [
  { icon: Leaf, text: 'Farm-to-table organic ingredients from local villages' },
  { icon: Sparkles, text: 'Traditional Dham thali & slow-cooked Pahadi delicacies' },
  { icon: UtensilsCrossed, text: 'Handcrafted recipes passed down through generations' },
];

export default function DiningPreview() {
  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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

            <div className="mt-8">
              <Button href="/dining" variant="primary">
                View Our Menu
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="right" className="order-1 md:order-2 relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Chamba restaurant interior"
                loading="lazy"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-ochre-500 text-stone-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg">
              Traditional Pahadi Cuisine
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
