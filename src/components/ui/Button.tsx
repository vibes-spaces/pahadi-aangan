'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'ochre';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({ children, href, onClick, variant = 'primary', size = 'md', className, type = 'button', disabled }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 btn-hover rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500/50 focus-visible:ring-offset-2';
  const variants = {
    primary: 'bg-ochre-600 text-clay-50 hover:bg-ochre-500 shadow-lg shadow-ochre-600/20',
    secondary: 'bg-pine-600 text-clay-50 hover:bg-pine-500',
    outline: 'border-2 border-ochre-600 text-ochre-600 hover:bg-ochre-600 hover:text-clay-50',
    ghost: 'text-stone-300 hover:text-ochre-400 hover:bg-white/5',
    ochre: 'bg-ochre-500 text-stone-900 hover:bg-ochre-400',
  };
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className);

  if (href) {
    if (disabled) {
      return <span className={classes} aria-disabled="true">{children}</span>;
    }
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} className={classes} disabled={disabled}>{children}</button>;
}
