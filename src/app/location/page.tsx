'use client';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Plane, Train, Bus, ArrowRight, Navigation } from 'lucide-react';
import { contactInfo, siteTagline } from '@/lib/data';
import PageTransition from '@/components/animations/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

const attractions = [
  { name: 'Naggar Castle', distance: '4 km', description: 'A 15th-century castle blending Himalayan and European architecture' },
  { name: 'Hadimba Devi Temple', distance: '18 km', description: 'Ancient cave temple dedicated to Hidimba Devi, set in a cedar forest' },
  { name: 'Solang Valley', distance: '22 km', description: 'Adventure hub for paragliding, skiing, and zorbing' },
  { name: 'Manali', distance: '25 km', description: 'Popular hill station with markets, temples, and scenic vistas' },
  { name: 'Rohtang Pass', distance: '52 km', description: 'High-altitude mountain pass with breathtaking glacier views' },
  { name: 'Great Himalayan National Park', distance: '60 km', description: 'UNESCO World Heritage site with diverse flora and fauna' },
];

const distances = [
  { from: 'Pahadi Aangan to Naggar Castle', km: '4 km', time: '10 min' },
  { from: 'Pahadi Aangan to Kullu Bus Stand', km: '12 km', time: '25 min' },
  { from: 'Pahadi Aangan to Bhuntar Airport', km: '15 km', time: '30 min' },
  { from: 'Pahadi Aangan to Manali', km: '25 km', time: '45 min' },
  { from: 'Pahadi Aangan to Solang Valley', km: '22 km', time: '40 min' },
  { from: 'Pahadi Aangan to Rohtang Pass', km: '52 km', time: '2 hr' },
  { from: 'Pahadi Aangan to Joginder Nagar Railway Station', km: '165 km', time: '5 hr' },
];

const gettingHere = [
  {
    icon: Plane,
    title: 'By Air',
    details: 'Kullu-Bhuntar Airport (15 km) — 30 min drive',
    description: 'Direct flights from Delhi, Chandigarh, and Shimla. We offer complimentary airport pick-up for guests staying 3+ nights.',
  },
  {
    icon: Train,
    title: 'By Rail',
    details: 'Joginder Nagar Railway Station (165 km) — 5 hr drive',
    description: 'The nearest broad-gauge railway station. Alternatively, Chandigarh Railway Station (310 km) is well-connected to major cities.',
  },
  {
    icon: Bus,
    title: 'By Road',
    details: 'Well-connected by state & private buses',
    description: 'Regular HRTC and private Volvo buses from Delhi, Chandigarh, and Shimla to Kullu. We can arrange taxi pick-up from the bus stand.',
  },
];

export default function LocationPage() {
  return (
    <PageTransition>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt="Kullu Valley mountains"
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
            <h1 className="font-serif text-5xl md:text-7xl text-clay-50 mb-4">Location</h1>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-stone-300 text-lg max-w-xl mx-auto">
              Find Us in the Kullu Valley
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn direction="left">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-600">
                Find Us
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">
                Nestled in the Serene Kullu Valley
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mt-4">
                Pahadi Aangan is located in the quaint village of Shamshi, just minutes from the historic Naggar Castle and a short drive from the bustling town of Manali. Surrounded by pine forests, apple orchards, and panoramic Himalayan views, our retreat offers the perfect base to explore the Kullu Valley.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-ochre-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-ochre-600" />
                  </div>
                  <div>
                    <h4 className="text-stone-900 font-semibold text-sm">Address</h4>
                    <p className="text-stone-500 text-sm mt-0.5">{contactInfo.addressFull}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-ochre-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-ochre-600" />
                  </div>
                  <div>
                    <h4 className="text-stone-900 font-semibold text-sm">Phone</h4>
                    {contactInfo.phones.map((phone) => (
                      <p key={phone} className="text-stone-500 text-sm mt-0.5">{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-ochre-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-ochre-600" />
                  </div>
                  <div>
                    <h4 className="text-stone-900 font-semibold text-sm">Email</h4>
                    <p className="text-stone-500 text-sm mt-0.5">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  src={contactInfo.mapEmbed}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pahadi Aangan Location"
                  className="rounded-2xl"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-clay-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Nearby Attractions"
            subtitle="Explore the Valley"
            description="The Kullu Valley is dotted with ancient temples, scenic viewpoints, and adventure hotspots — all within easy reach."
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <StaggerItem key={attraction.name}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-lg text-stone-900">{attraction.name}</h3>
                    <span className="flex items-center gap-1 text-ochre-600 font-semibold text-sm whitespace-nowrap">
                      <Navigation className="w-3.5 h-3.5" />
                      {attraction.distance}
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed">{attraction.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Distance Chart"
            subtitle="Getting Around"
            description="Approximate distances and travel times from Pahadi Aangan."
          />
          <FadeIn>
            <div className="bg-clay-50 rounded-2xl overflow-hidden shadow-sm border border-stone-200/60">
              <div className="grid grid-cols-3 gap-0 text-sm">
                <div className="bg-ochre-600 text-clay-50 font-semibold px-4 py-3">Route</div>
                <div className="bg-ochre-600 text-clay-50 font-semibold px-4 py-3 text-center">Distance</div>
                <div className="bg-ochre-600 text-clay-50 font-semibold px-4 py-3 text-center">Drive Time</div>
                {distances.map((row) => (
                  <Fragment key={row.from}>
                    <div className="px-4 py-3 text-stone-700 border-b border-stone-200">{row.from}</div>
                    <div className="px-4 py-3 text-stone-600 text-center border-b border-stone-200">{row.km}</div>
                    <div className="px-4 py-3 text-stone-600 text-center border-b border-stone-200">{row.time}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-clay-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Getting Here"
            subtitle="Travel Information"
            description="Everything you need to plan your journey to Pahadi Aangan."
          />
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {gettingHere.map((mode) => (
              <StaggerItem key={mode.title}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60 card-hover">
                  <div className="w-14 h-14 bg-ochre-100 rounded-xl flex items-center justify-center mb-4">
                    <mode.icon className="w-7 h-7 text-ochre-600" />
                  </div>
                  <h3 className="font-serif text-lg text-stone-900 mb-1">{mode.title}</h3>
                  <p className="text-ochre-600 text-sm font-semibold mb-2">{mode.details}</p>
                  <p className="text-stone-500 text-sm leading-relaxed">{mode.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 bg-stone-900">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-ochre-400">
              Plan Your Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-clay-50 mt-2 leading-tight">
              Ready to Experience the Himalayas?
            </h2>
            <p className="text-stone-400 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Book your stay at Pahadi Aangan and let the mountains welcome you. We can assist with travel arrangements and local recommendations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/booking" variant="primary" size="lg">
                Book Your Stay
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-stone-400/30 text-stone-300 hover:bg-stone-800 hover:text-clay-50">
                Get Directions
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
