import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import RoomsPreview from '@/components/sections/RoomsPreview';
import ExperiencesPreview from '@/components/sections/ExperiencesPreview';
import DiningPreview from '@/components/sections/DiningPreview';
import SpaPreview from '@/components/sections/SpaPreview';
import GalleryPreview from '@/components/sections/GalleryPreview';
import ReviewsSlider from '@/components/sections/ReviewsSlider';
import CTASection from '@/components/sections/CTASection';
import BlogPreview from '@/components/sections/BlogPreview';
import PageTransition from '@/components/animations/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <AboutPreview />
      <RoomsPreview />
      <ExperiencesPreview />
      <DiningPreview />
      <SpaPreview />
      <GalleryPreview />
      <ReviewsSlider />
      <CTASection />
      <BlogPreview />
    </PageTransition>
  );
}
