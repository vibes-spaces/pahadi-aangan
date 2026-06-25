'use client';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export default function FadeIn({ children, delay = 0, direction = 'up', className }: Props) {
  const dirOffset = direction === 'none' ? 0 : 30;
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? dirOffset : direction === 'down' ? -dirOffset : 0,
      x: direction === 'left' ? dirOffset : direction === 'right' ? -dirOffset : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
