"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VenueCard } from "@/components/venues/venue-card";
import { DUMMY_VENUES } from "@/lib/constants";

interface SimilarVenuesProps {
  id: string;
}

export function SimilarVenues({ id }: SimilarVenuesProps) {
  // In a real app, we would fetch similar venues based on the current venue
  const [venues] = useState(
    DUMMY_VENUES.filter((venue) => venue.id !== id)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue, index) => (
        <motion.div
          key={venue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <VenueCard venue={venue} />
        </motion.div>
      ))}
    </div>
  );
}