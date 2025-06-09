"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { VenueCard } from "@/components/venues/venue-card";
import { VenueCardSkeleton } from "@/components/venues/venue-card-skeleton";
import type { VenueDisplay } from "@/lib/types";

interface FeaturedVenuesProps {
  latitude?: number;
  longitude?: number;
  distance?: number;
}

export function FeaturedVenues({ latitude, longitude, distance = 10 }: FeaturedVenuesProps) {
  const [venues, setVenues] = useState<VenueDisplay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12; // Number of venues per page

  const observer = useRef<IntersectionObserver | null>(null);

  // Reset venues when location changes
  useEffect(() => {
    setVenues([]);
    setPage(1);
    setTotal(0);
  }, [latitude, longitude, distance]);

  // Fetch venues
  useEffect(() => {
    if (latitude == null || longitude == null) return;

    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.append('latitude', latitude.toString());
        params.append('longitude', longitude.toString());
        params.append('distance', distance.toString());
        params.append('limit', limit.toString());
        params.append('page', page.toString());

        const response = await fetch(`/api/venues?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch venues');
        const data = await response.json();

        setVenues(prev => page === 1 ? (data.venues || []) : [...prev, ...(data.venues || [])]);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [latitude, longitude, distance, page]);

  // Infinite scroll observer
  const lastVenueRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting && venues.length < total) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, venues.length, total]);

  if (loading && venues.length === 0) {
    return (
      <div id="featured">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <VenueCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="featured">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load venues: {error}</p>
        </div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div id="featured">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No venues found in this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="featured">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {venues.map((venue, index) => {
          if (index === venues.length - 1 && venues.length < total) {          // ...inside your loading state and while loading more venues...
          <div className="h-64 rounded-lg skeleton" />
            // Attach ref to last item only if there are more to load
            return (
              <motion.div
                key={venue._id}
                ref={lastVenueRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VenueCard venue={venue} />
              </motion.div>
            );
          }
          return (
            <motion.div
              key={venue._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VenueCard venue={venue} />
            </motion.div>
          );
        })}
      </motion.div>
      {loading && venues.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {[...Array(6)].map((_, idx) => (
          <VenueCardSkeleton key={idx} />
        ))}
      </div>
    )}
    </div>
  );
}