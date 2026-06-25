'use client';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getExperiences } from '@/lib/store';
import { Clock, IndianRupee, Check, ArrowLeft } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const experiences = getExperiences();
  const exp = experiences.find(e => e.slug === slug);

  if (!exp) notFound();

  return (
    <PageTransition>
      <div className="min-h-screen bg-clay-50">
        <div className="relative h-[50vh] min-h-[400px]">
          <div className="absolute inset-0">
            <img src={exp.images[0]} alt={exp.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <FadeIn>
              <Link href="/experiences" className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-sm transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Experiences
              </Link>
              <span className="inline-block px-3 py-1 bg-ochre-600 text-white text-xs font-semibold uppercase rounded-full mb-3">{exp.category}</span>
              <h1 className="font-serif text-3xl md:text-5xl text-white">{exp.title}</h1>
              <p className="text-stone-300 text-lg mt-2">{exp.subtitle}</p>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <FadeIn>
                <h2 className="font-serif text-2xl text-stone-900">About This Experience</h2>
                <p className="text-stone-600 leading-relaxed">{exp.description}</p>
              </FadeIn>

              {exp.included.length > 0 && (
                <FadeIn>
                  <h2 className="font-serif text-2xl text-stone-900">What&apos;s Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {exp.included.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                        <Check className="w-4 h-4 text-pine-600 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>

            <div>
              <FadeIn className="sticky top-24">
                <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">Duration</span>
                    <span className="flex items-center gap-1.5 font-medium text-stone-900"><Clock className="w-4 h-4 text-ochre-600" />{exp.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">Price</span>
                    <span className="flex items-center gap-1.5 font-bold text-ochre-600 text-lg"><IndianRupee className="w-4 h-4" />{exp.price}</span>
                  </div>
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <Button href="/booking" className="w-full" size="md">Book Your Stay</Button>
                    <Link href="/contact" className="block text-center text-xs text-stone-400 hover:text-ochre-600 transition-colors">Have a question? Contact us</Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}