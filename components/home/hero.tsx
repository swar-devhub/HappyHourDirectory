"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationAutocomplete } from "@/components/venues/location-autocomplete";


interface HeroProps {
  onSearch: (params: {
    latitude: number;
    longitude: number;
    distance: number;
  }) => void;
}
export function Hero({ onSearch }: HeroProps) {
  // const router = useRouter();
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [distance, setDistance] = useState<number>(10);

  
  const handleSearch = () => {
      if (!coords) {
        console.warn("no coords yet!");
        return;
      }
      // console.log(coords.lat,coords.lon)
      
      
      onSearch({
        latitude: coords.lat,
        longitude: coords.lon,
        distance,
      });
   };
      // Suppose your autocomplete also returns { lat, lng }:
    // For demo, let’s fake:
    // const latitude  = /* geocode(location).lat */;
    // const longitude = /* geocode(location).lng */;

    // Invoke the parent‐provided callback
    // onSearch({ latitude, longitude, distance });
  // };

  return (
    <div className="relative w-full bg-gradient-to-b from-primary/10 to-background">
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            Find the Best
            <span className="text-chart-1"> Happy Hours </span>
            Near You
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            Discover great drink and food specials at the best local spots.
            Search by location, time, and type of special to find your perfect
            happy hour.
          </motion.p>

          <motion.div
            className="mt-8 w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="relative">
              <LocationAutocomplete
                onLocationSelect={(location, coordinates) => {
                  setPlace(location);
                  setCoords(coordinates);
                  onSearch({
                    latitude: coordinates.lat,
                    longitude: coordinates.lon,
                    distance,
                  });
                }}
                placeholder="Enter your location"
              />
              <Button
                onClick={handleSearch}
                className="absolute right-0 top-0 h-full rounded-l-none">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm">
                Mumbai
              </Button>
              <Button variant="outline" size="sm">
                Banglore
              </Button>
              <Button variant="outline" size="sm">
                Chennai
              </Button>
              <Button variant="outline" size="sm">
                Pune
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <Button size="lg" asChild>
              <a href="/venues">Find Happy Hours</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#featured">View Popular Spots</a>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}