import { VenueDetails } from '@/components/venues/venue-details';
import { VenueMap } from '@/components/venues/venue-map';
import { SimilarVenues } from '@/components/venues/similar-venues';
import { Suspense } from 'react';
import { VenueDetailsSkeleton } from '@/components/skeletons/venue-details-skeleton';
import { MapSkeleton } from '@/components/skeletons/map-skeleton';
import { VenueCardSkeleton } from '@/components/skeletons/venue-card-skeleton';

export default function VenuePage({ params }: { params: { id: string } }) {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 xl:col-span-8">
          <Suspense fallback={<VenueDetailsSkeleton />}>
            <VenueDetails id={params.id} />
          </Suspense>
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 space-y-8">
            <div className="h-[400px] rounded-lg overflow-hidden">
              <Suspense fallback={<MapSkeleton />}>
                <VenueMap venueId={params.id} singleVenue />
              </Suspense>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Happy Hour Schedule</h3>
              <Suspense fallback={<div className="animate-pulse space-y-4"><div className="h-6 bg-muted rounded"></div><div className="h-6 bg-muted rounded"></div></div>}>
                <VenueSchedule id={params.id} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Places Nearby</h2>
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><VenueCardSkeleton /><VenueCardSkeleton /><VenueCardSkeleton /></div>}>
          <SimilarVenues id={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

// This is a dummy component that would fetch and display the schedule
function VenueSchedule({ id }: { id: string }) {
  // In a real implementation, this would fetch the venue's happy hour schedule
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="font-medium">Monday - Friday</div>
        <div>4:00 PM - 7:00 PM</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-medium">Saturday</div>
        <div>3:00 PM - 6:00 PM</div>
      </div>
    </div>
  );
}