"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VenueCard } from "@/components/venues/venue-card";
import { DUMMY_VENUES } from "@/lib/constants";

export function FeaturedVenues() {
  const [venues] = useState(DUMMY_VENUES);

  return (
    <div id="featured">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
    </div>
  );
}