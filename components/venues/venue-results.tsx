"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { BiSortAlt2 } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VenueCard } from "@/components/venues/venue-card";
import { EmptyState } from "@/components/ui/empty-state";
import { DUMMY_VENUES } from "@/lib/constants";
import { Search } from "lucide-react";

interface VenueResultsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function VenueResults({ searchParams }: VenueResultsProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>("distance");
  const [venues] = useState(DUMMY_VENUES);

  // In a real implementation, this would filter venues based on searchParams
  const filteredVenues = venues;
  
  if (filteredVenues.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-12 w-12" />}
        title="No results found"
        description="Try adjusting your search or filters to find more happy hours."
        action={
          <Button onClick={() => router.push("/venues")}>Clear filters</Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredVenues.length} results found
        </div>
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[160px]">
              <BiSortAlt2 className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence>
        <div className="space-y-4">
          {filteredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <VenueCard venue={venue} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}