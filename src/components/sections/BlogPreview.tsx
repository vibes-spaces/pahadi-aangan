'use client';
import { ArrowRight, CalendarDays, User } from 'lucide-react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import SectionHeader from '@/components/ui/SectionHeader';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import Button from '@/components/ui/Button';

export default function BlogPreview() {
  const posts = getBlogPosts().filter((p) => p.featured);

  return (
    <section className="py-20 md:py-28 px-4 bg-clay-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="From the Pahadi Journal"
          subtitle="Our Blog"
          description="Stories, guides, and insights from the heart of the Himalayas."
        />

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/60 card-hover">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                    <span className="absolute top-3 left-3 bg-ochre-500/90 backdrop-blur-sm text-stone-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-stone-400 text-xs mb-2">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-ochre-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-2 line-clamp-2">
                      {post.excerpt?.length > 120 ? `${(post.excerpt || '').slice(0, 120)}...` : post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Button href="/blog" variant="outline" size="lg">
            Read All Articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
