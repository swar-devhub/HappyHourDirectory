"use client";

import { useState } from 'react';
import { VenueCard } from '@/components/venues/venue-card';
import { Button } from '@/components/ui/button';
import { DUMMY_VENUES } from '@/lib/constants';
import { EmptyState } from '@/components/ui/empty-state';
import { FaRegSadTear } from 'react-icons/fa';

export default function FavoritesPage() {
  const [favorites] = useState(DUMMY_VENUES.slice(0, 2));

  if (favorites.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
        
        <EmptyState
          icon={<FaRegSadTear className="h-12 w-12" />}
          title="No favorites yet"
          description="When you find happy hours you love, save them here for easy access."
          action={
            <Button href="/venues\" variant="default">Find Happy Hours</Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((venue) => (
          <VenueCard key={venue.id} venue={{...venue, isFavorite: true}} />
        ))}
      </div>
    </div>
  );
}