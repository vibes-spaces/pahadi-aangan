'use client';
import FadeIn from '@/components/animations/FadeIn';

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeader({ title, subtitle, description, light }: Props) {
  return (
    <FadeIn className="text-center max-w-2xl mx-auto mb-12">
      {subtitle && (
        <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? 'text-ochre-300' : 'text-ochre-600'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-serif text-3xl md:text-4xl mt-2 ${light ? 'text-white' : 'text-stone-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-sm leading-relaxed ${light ? 'text-stone-400' : 'text-stone-500'}`}>
          {description}
        </p>
      )}
      <div className={`w-16 h-0.5 mx-auto mt-5 ${light ? 'bg-ochre-500' : 'bg-ochre-600'}`} />
    </FadeIn>
  );
}
