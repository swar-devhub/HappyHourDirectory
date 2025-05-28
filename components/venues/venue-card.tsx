"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BiDrink, BiRestaurant, BiTime, BiHeart } from "react-icons/bi";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { VenueDisplay } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  venue: VenueDisplay;
}

export function VenueCard({ venue }: VenueCardProps) {
  const [isFavorite, setIsFavorite] = useState(venue.isFavorite || false);
  const { toast } = useToast();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      description: !isFavorite 
        ? `${venue.name} has been added to your favorites.` 
        : `${venue.name} has been removed from your favorites.`,
      duration: 3000,
    });
  };

  return (
    <Link href={`/venues/${venue.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-4">
            <h3 className="text-xl font-bold text-white">{venue.name}</h3>
            <p className="text-white/90 text-sm">{venue.address}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm",
              isFavorite ? "text-destructive hover:text-destructive" : "text-muted-foreground"
            )}
            onClick={handleFavoriteToggle}
          >
            <Heart 
              className={cn("h-4 w-4", isFavorite ? "fill-current" : "")} 
            />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {venue.venueType.map((type) => (
              <Badge key={type} variant="outline">
                {type}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BiTime className="h-4 w-4 flex-shrink-0" />
              <span>
                {venue.happyHours.length > 0
                  ? `${venue.happyHours[0].day} ${venue.happyHours[0].startTime} - ${venue.happyHours[0].endTime}`
                  : "No happy hours listed"}
              </span>
            </div>

            {venue.happyHours.length > 0 && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="flex-shrink-0 mt-1">
                  <BiDrink className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  {venue.happyHours[0].drinkSpecials.slice(0, 2).join(", ")}
                  {venue.happyHours[0].drinkSpecials.length > 2 && "..."}
                </div>
              </div>
            )}

            {venue.happyHours.length > 0 && venue.happyHours[0].foodSpecials.length > 0 && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="flex-shrink-0 mt-1">
                  <BiRestaurant className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  {venue.happyHours[0].foodSpecials.slice(0, 2).join(", ")}
                  {venue.happyHours[0].foodSpecials.length > 2 && "..."}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(venue.rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-muted-foreground">
              ({venue.numRatings})
            </span>
          </div>
          
          {venue.distance && (
            <span className="text-sm text-muted-foreground">
              {venue.distance} miles away
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}