'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/store';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import { formatDate, cn } from '@/lib/utils';
import Link from 'next/link';

const categories = ['All', 'Architecture', 'Culture', 'Food', 'Travel', 'Nature'];

export default function BlogPage() {
  const posts = getBlogPosts();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <div className="absolute inset-0 bg-kathkuni opacity-20" />
        </div>
        <FadeIn className="relative z-10 text-center px-4">
          <span className="text-ochre-400 text-xs font-semibold tracking-[0.2em] uppercase">Journal</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-2">Pahadi Aangan Blog</h1>
          <p className="text-stone-300 text-sm md:text-base mt-4 max-w-xl mx-auto">
            Stories from the Himalayas
          </p>
          <div className="w-16 h-0.5 bg-ochre-500 mx-auto mt-5" />
        </FadeIn>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-clay-100 sticky top-16 z-20 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-ochre-600 text-clay-50 shadow-md shadow-ochre-600/20'
                    : 'bg-white text-stone-600 hover:bg-ochre-50 hover:text-ochre-700 border border-stone-200'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20 bg-clay-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <StaggerContainer key={activeCategory} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <StaggerItem key={post.id}>
                  <motion.article
                    layout
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 card-hover group h-full flex flex-col"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <span className="absolute top-3 left-3 bg-ochre-600 text-clay-50 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="font-serif text-base text-stone-900 mb-2 line-clamp-2 group-hover:text-ochre-600 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-1">
                        {post.excerpt.length > 150 ? post.excerpt.slice(0, 150) + '...' : post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-stone-100">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ochre-600 hover:text-ochre-500 transition"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center text-stone-400 py-12">No posts match this category.</p>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
