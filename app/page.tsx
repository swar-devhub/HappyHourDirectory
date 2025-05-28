import { Suspense } from 'react';
import { Hero } from '@/components/home/hero';
import { FeaturedVenues } from '@/components/home/featured-venues';
import { HowItWorks } from '@/components/home/how-it-works';
import { Newsletter } from '@/components/home/newsletter';
import { SearchSkeleton } from '@/components/skeletons/search-skeleton';
import { VenueCardSkeleton } from '@/components/skeletons/venue-card-skeleton';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Suspense fallback={<SearchSkeleton />}>
        <Hero />
      </Suspense>

      <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Happy Hours</h2>
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><VenueCardSkeleton /><VenueCardSkeleton /><VenueCardSkeleton /></div>}>
          <FeaturedVenues />
        </Suspense>
      </section>

      <HowItWorks />
      <Newsletter />
    </div>
  );
}