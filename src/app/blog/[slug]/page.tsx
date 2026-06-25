'use client';
import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/store';
import { formatDate, cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import PageTransition from '@/components/animations/PageTransition';
import Button from '@/components/ui/Button';
import {
  ArrowLeft, Calendar, User, Tag, Share2, Check,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';

const categoryColors: Record<string, string> = {
  Architecture: 'bg-ochre-100 text-ochre-800',
  Culture: 'bg-purple-100 text-purple-800',
  Food: 'bg-orange-100 text-orange-800',
  Travel: 'bg-blue-100 text-blue-800',
  Nature: 'bg-pine-100 text-pine-800',
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === slug);

  const [copied, setCopied] = useState(false);

  if (!post) notFound();

  const relatedPosts = posts.filter(p => p.category === post.category && p.slug !== slug).slice(0, 3);

  const shareContent = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <PageTransition>
      <article>
        <div className="relative h-[50vh] md:h-[60vh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <FadeIn>
              <span className={cn('inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full mb-4', categoryColors[post.category] || 'bg-stone-100 text-stone-800')}>
                {post.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-white max-w-3xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-stone-400 text-sm">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />5 min read</span>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <FadeIn>
            <p className="text-lg text-stone-700 leading-relaxed font-medium mb-8">{post.excerpt}</p>
          </FadeIn>

          <FadeIn className="prose prose-stone max-w-none">
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Nestled in the heart of the Kullu Valley, Pahadi Aangan stands as a testament to Himachal Pradesh&apos;s
                rich cultural and architectural heritage. The region&apos;s traditional building techniques, passed down
                through generations, offer not just aesthetic beauty but also practical wisdom adapted to the Himalayan
                environment.
              </p>
              <p>
                The traditional architecture of Himachal is deeply connected to the land itself. Using locally sourced
                materials — stone from the riverbeds, deodar wood from the forests, and slate from the mountains —
                these structures are designed to withstand heavy snowfall, seismic activity, and extreme temperature
                variations while maintaining a harmonious relationship with the surrounding landscape.
              </p>
              <h2 className="font-serif text-2xl text-stone-900 mt-10 mb-4">The Philosophy Behind the Design</h2>
              <p>
                At Pahadi Aangan, every element tells a story. The interlocking stone-and-wood technique, known as
                Kathkuni, is more than a construction method — it&apos;s a philosophy of balance and sustainability.
                Without using mortar, the walls breathe, allowing natural insulation and ventilation that keeps the
                interiors warm in winter and cool in summer.
              </p>
              <p>
                The sloping slate roofs, wide eaves, and strategically placed windows are designed to manage the
                heavy monsoon rains and snow loads. The wooden balconies, or &ldquo;barandahs,&rdquo; offer spaces
                for community interaction, while the central courtyards serve as gathering spaces for festivals
                and ceremonies.
              </p>
              <h2 className="font-serif text-2xl text-stone-900 mt-10 mb-4">Preserving Heritage for Future Generations</h2>
              <p>
                In an era of rapid modernization, preserving traditional building techniques is more important than
                ever. Pahadi Aangan is committed to not just maintaining these architectural traditions but also
                passing them on. We collaborate with local artisans, document traditional techniques, and offer
                heritage walks that educate visitors about the significance of Himachali architecture.
              </p>
              <p>
                Whether you&apos;re an architecture enthusiast, a history buff, or simply someone seeking a unique
                travel experience, a stay at Pahadi Aangan offers a rare opportunity to live within a piece of
                living heritage — where every stone, every beam, and every carving has a story to tell.
              </p>
              {post.content && (
                <p className="italic text-stone-400 border-l-4 border-ochre-600 pl-4 my-6">{post.content}</p>
              )}
            </div>
          </FadeIn>

          <FadeIn className="mt-10 pt-8 border-t border-stone-200">
            <div className="flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-stone-400" />
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-8 pt-8 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-ochre-100 flex items-center justify-center text-ochre-700 font-bold text-lg">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{post.author}</p>
                  <p className="text-xs text-stone-500">Staff Writer at Pahadi Aangan</p>
                </div>
              </div>
              <Button onClick={shareContent} variant="outline" size="sm">
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied' : 'Share'}
              </Button>
            </div>
          </FadeIn>

          {relatedPosts.length > 0 && (
            <FadeIn className="mt-16">
              <h3 className="font-serif text-2xl text-stone-900 mb-6">Related Posts</h3>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(rp => (
                  <StaggerItem key={rp.id}>
                    <Link href={`/blog/${rp.slug}`} className="group block bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${rp.image})` }}
                        />
                      </div>
                      <div className="p-4">
                        <span className={cn('inline-block px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full mb-2', categoryColors[rp.category] || 'bg-stone-100 text-stone-800')}>
                          {rp.category}
                        </span>
                        <h4 className="font-serif text-base text-stone-900 group-hover:text-ochre-600 transition-colors line-clamp-2">{rp.title}</h4>
                        <p className="text-xs text-stone-500 mt-2">{formatDate(rp.date)}</p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          )}

          <FadeIn className="mt-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-ochre-600 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </FadeIn>
        </div>
      </article>
    </PageTransition>
  );
}
