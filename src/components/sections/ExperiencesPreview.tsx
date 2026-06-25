'use client';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { getExperiences } from '@/lib/store';
import SectionHeader from '@/components/ui/SectionHeader';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import Button from '@/components/ui/Button';

export default function ExperiencesPreview() {
  const experiences = getExperiences().slice(0, 4);

  return (
    <section className="py-20 md:py-28 px-4 bg-clay-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Experiences at Pahadi Aangan"
          subtitle="Curated Adventures"
          description="From heritage village walks to apple orchard picnics — every experience is designed to immerse you in the soul of Himachal."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <StaggerItem key={exp.id}>
              <Link href={`/experiences`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/60 card-hover">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={exp.images[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                      alt={exp.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {exp.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-ochre-600 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1 line-clamp-2">{exp.subtitle}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-ochre-600 text-sm font-semibold">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>{exp.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Button href="/experiences" variant="outline" size="lg">
            Explore All Experiences
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
