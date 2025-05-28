"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Heart, MapPin, Globe, Phone, Clock } from "lucide-react";
import { BiDrink, BiRestaurant, BiTime } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DUMMY_VENUES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface VenueDetailsProps {
  id: string;
}

export function VenueDetails({ id }: VenueDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  // In a real app, we would fetch this data from an API
  const venue = DUMMY_VENUES.find((v) => v.id === id) || DUMMY_VENUES[0];

  const handleFavoriteToggle = () => {
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
    <div className="space-y-8">
      <div className="relative rounded-lg overflow-hidden">
        <div className="aspect-video relative">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{venue.name}</h1>
              <div className="flex items-center text-white/90 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{venue.fullAddress}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={isFavorite ? "destructive" : "secondary"}
                className="gap-2"
                onClick={handleFavoriteToggle}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div className="text-sm text-muted-foreground">(415) 555-1234</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium">Website</div>
              <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Visit Website</a>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium">Happy Hour</div>
              <div className="text-sm text-muted-foreground">Mon-Fri, 4-7 PM</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex mr-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.floor(venue.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        <span className="text-lg font-medium">{venue.rating}</span>
        <span className="text-muted-foreground">({venue.numRatings} reviews)</span>
        
        <div className="ml-auto flex gap-2">
          {venue.venueType.map((type) => (
            <Badge key={type} variant="outline">
              {type}
            </Badge>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="happy-hour" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="happy-hour">Happy Hour</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="happy-hour" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venue.happyHours.map((happyHour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <BiTime className="mr-2 h-5 w-5 text-primary" />
                      {happyHour.day}: {happyHour.startTime} - {happyHour.endTime}
                    </h3>
                    
                    {happyHour.drinkSpecials.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium flex items-center mb-2">
                          <BiDrink className="mr-2 h-4 w-4" />
                          Drink Specials
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground pl-6 list-disc">
                          {happyHour.drinkSpecials.map((special, i) => (
                            <li key={i}>{special}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {happyHour.foodSpecials.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium flex items-center mb-2">
                          <BiRestaurant className="mr-2 h-4 w-4" />
                          Food Specials
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground pl-6 list-disc">
                          {happyHour.foodSpecials.map((special, i) => (
                            <li key={i}>{special}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold">About {venue.name}</h3>
          <p className="text-muted-foreground">
            {venue.name} is a popular {venue.venueType.join("/")} located in the heart of the city.
            They offer a variety of food and drink options, with special happy hour deals available
            multiple days a week. The venue is known for its welcoming atmosphere and excellent service.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Regular Hours</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="font-medium">Monday - Thursday</div>
              <div className="text-muted-foreground">11:00 AM - 11:00 PM</div>
            </div>
            <div>
              <div className="font-medium">Friday - Saturday</div>
              <div className="text-muted-foreground">11:00 AM - 1:00 AM</div>
            </div>
            <div>
              <div className="font-medium">Sunday</div>
              <div className="text-muted-foreground">12:00 PM - 10:00 PM</div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-sm">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>Outdoor Seating</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>Full Bar</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>TV Screens</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>Wi-Fi</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>Wheelchair Accessible</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>Parking Available</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold">Reviews</h3>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b pb-4 last:border-0">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">User {i + 1}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          "h-4 w-4",
                          j < 4 + Math.floor(Math.random() * 2)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Visited on {new Date().toLocaleDateString()}</div>
                <p className="text-sm">
                  {[
                    "Great happy hour deals! The drinks were excellent and the atmosphere was perfect for after-work relaxation.",
                    "I love this place for their half-price appetizers during happy hour. The service is always friendly too.",
                    "One of the best happy hours in town. Good selection of drinks and the food specials are a great value."
                  ][i]}
                </p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            Read More Reviews
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}