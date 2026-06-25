'use client';
import { cn } from '@/lib/utils';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ size = 'md', className, text }: Props) {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' };
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className={cn(sizes[size], 'rounded-full border-ochre-200 border-t-ochre-600 animate-spin')} />
      {text && <p className="text-sm text-stone-500">{text}</p>}
    </div>
  );
}