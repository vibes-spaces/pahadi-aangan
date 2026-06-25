'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Heart, Leaf, Users, Tent, Home, Star, Quote } from 'lucide-react';
import PageTransition from '@/components/animations/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { siteTagline } from '@/lib/data';

const stats = [
  { icon: Home, end: 2019, suffix: '', label: 'Established' },
  { icon: Star, end: 5, suffix: '', label: 'Heritage Rooms' },
  { icon: Heart, end: 50, suffix: '+', label: '5-Star Reviews' },
  { icon: Award, end: 8, suffix: '+', label: 'Awards Won' },
];

const values = [
  {
    icon: Tent,
    title: 'Preservation',
    description: 'Dedicated to preserving the ancient Kathkuni building technique and Himachali craftsmanship through every stone and beam of our property.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We source from local artisans, employ village residents, and collaborate with Himachali families to keep traditions alive.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'From solar heating to rainwater harvesting and organic farming, we honor the mountains by treading lightly on the land.',
  },
  {
    icon: Heart,
    title: 'Hospitality',
    description: 'Himachali hospitality is rooted in the belief that a guest is a blessing. Every stay is a heartfelt welcome into our Pahadi family.',
  },
];

const team = [
  {
    name: 'Mohan Verma',
    role: 'Founder & General Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    quote: '"Pahadi Aangan is my homage to the land that raised me. Every Kathkuni wall tells the story of generations past."',
  },
  {
    name: 'Gita Devi',
    role: 'Co-Founder & Hospitality Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    quote: '"Our guests leave as family. That is the Pahadi way — warmth that lingers long after the journey ends."',
  },
  {
    name: 'Rajinder Thakur',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    quote: '"Every dish at Chamba carries the taste of Himachali grandmothers — recipes that have never been written down, only felt."',
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1597074866935-eaedd6607122?w=1600&q=80"
            alt="Traditional Himachali architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        </motion.div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <FadeIn delay={0.3}>
            <span className="text-ochre-400 text-sm tracking-[0.25em] uppercase mb-4 block">
              {siteTagline}
            </span>
          </FadeIn>
          <FadeIn delay={0.5}>
            <h1 className="font-serif text-5xl md:text-7xl text-clay-50 mb-4">Our Story</h1>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-stone-300 text-lg max-w-xl mx-auto">
              Where ancient Kathkuni architecture meets the timeless beauty of the Himalayas
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80"
                  alt="Kathkuni stone and wood architecture"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-ochre-500 text-stone-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg">
                Kathkuni Architecture
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-600">
                Built by Generations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">
                The Art of Kathkuni
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mt-4">
                Kathkuni is an ancient Himachali building technique where stones and deodar wood are carefully interlocked without a single drop of mortar. This earthquake-resistant method has sheltered mountain communities for over a thousand years.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed mt-3">
                At Pahadi Aangan, we worked with master Kathkuni artisans from the Kullu and Shimla regions to bring this vanishing craft to life. Each wall, window, and beam is a living museum of Himachali heritage — a testament to the wisdom of mountain builders who understood that the strongest structures are built in harmony with nature.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-clay-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" className="order-2 md:order-1">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-600">
                About the Property
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">
                A Retreat Woven into the Mountains
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mt-4">
                Spread across two acres of pine-forested land in the Kullu Valley, Pahadi Aangan offers five uniquely designed heritage rooms, a traditional restaurant, a yoga pavilion, and sprawling apple orchards — all framed by the snow-capped Dhauladhar range.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed mt-3">
                Every corner of our property has been thoughtfully designed to immerse you in Himachali culture. From the hand-painted murals in the Pahadi Mahal Suite to the rustic warmth of the Kathkuni Kutiya, each space tells a story of the mountains and the people who call them home.
              </p>
            </FadeIn>
            <FadeIn direction="right" className="order-1 md:order-2 relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
                  alt="Pahadi Aangan courtyard"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-clay-50 rounded-2xl p-6 text-center shadow-sm border border-stone-200/60 card-hover">
                <div className="w-12 h-12 bg-ochre-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-ochre-600" />
                </div>
                <div className="font-serif text-3xl font-bold text-stone-900">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-stone-500 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-clay-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Meet Our Team"
            subtitle="The People Behind Pahadi Aangan"
            description="Passionate custodians of Himachali heritage who pour their hearts into every guest's experience."
          />
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60 card-hover text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-ochre-100">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-serif text-lg text-stone-900">{member.name}</h3>
                  <p className="text-ochre-600 text-xs font-semibold uppercase tracking-wider mt-1">{member.role}</p>
                  <div className="mt-4 text-stone-500 text-sm italic leading-relaxed flex items-start gap-2">
                    <Quote className="w-4 h-4 text-ochre-400 flex-shrink-0 mt-0.5" />
                    <span>{member.quote}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Our Values"
            subtitle="What We Stand For"
            description="The principles that guide everything we do — from building to serving."
            light
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center card-hover">
                  <div className="w-14 h-14 bg-ochre-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-ochre-400" />
                  </div>
                  <h3 className="font-serif text-lg text-clay-50 mb-2">{value.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-600">
              Experience the Himalayas
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">
              Become Part of Our Story
            </h2>
            <p className="text-stone-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Every stay at Pahadi Aangan is a journey into the heart of Himachali heritage. Book your escape to the mountains and create memories that will last a lifetime.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/booking" variant="primary" size="lg">
                Book Your Stay
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/" variant="outline" size="lg">
                Back to Home
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
