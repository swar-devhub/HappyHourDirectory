import { Suspense } from 'react';
import { VenueSearch } from '@/components/venues/venue-search';
import { VenueResults } from '@/components/venues/venue-results';
import { VenueMap } from '@/components/venues/venue-map';
import { VenueListSkeleton } from '@/components/skeletons/venue-list-skeleton';
import { MapSkeleton } from '@/components/skeletons/map-skeleton';

export default function VenuesPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-muted py-8">
        <div className="container max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Find Happy Hours</h1>
          <VenueSearch />
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1">
            <Suspense fallback={<VenueListSkeleton />}>
              <VenueResults searchParams={searchParams} />
            </Suspense>
          </div>
          <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
            <div className="sticky top-24 h-[calc(100vh-10rem)] rounded-lg overflow-hidden">
              <Suspense fallback={<MapSkeleton />}>
                <VenueMap />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}