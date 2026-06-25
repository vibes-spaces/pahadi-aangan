'use client';
import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { getReviews } from '@/lib/store';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ReviewsSlider() {
  const reviews = getReviews().filter((r) => r.approved);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scroll = () => {
      if (isPaused) return;
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
    };

    const timer = setInterval(scroll, 30);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="py-20 md:py-28 px-4 bg-clay-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Guest Stories"
          subtitle="Testimonials"
          description="Hear from travelers who have experienced the magic of Pahadi Aangan."
        />

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="flex-shrink-0 w-[350px] bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-saffron-400 text-saffron-400' : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-ochre-200" />
              </div>

              <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">&ldquo;{review.text}&rdquo;</p>

              <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="font-semibold text-stone-900 text-sm">{review.name}</p>
                <p className="text-stone-400 text-xs">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
