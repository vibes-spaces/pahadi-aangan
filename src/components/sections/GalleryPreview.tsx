'use client';
import { ArrowRight, Maximize2 } from 'lucide-react';
import Link from 'next/link';
import { getGallery } from '@/lib/store';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

export default function GalleryPreview() {
  const items = getGallery().slice(0, 6);

  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="A Glimpse of Paradise"
          subtitle="Photo Gallery"
          description="From golden sunsets over the Dhauladhar range to the intricate details of Kathkuni craftsmanship."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((item, i) => (
            <Link
              key={item.id}
              href="/gallery"
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? 'row-span-2 col-span-2' : ''
              }`}
            >
              <div className={`${i === 0 ? 'h-[400px] md:h-[500px]' : 'h-[200px] md:h-[250px]'}`}>
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/gallery" variant="outline" size="lg">
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
