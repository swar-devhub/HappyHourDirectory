"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LocationSuggestion } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface LocationAutocompleteProps {
  onLocationSelect: (location: string, coordinates?: { lat: number; lon: number }) => void;
  placeholder?: string;
  initialValue?: string;
}

export function LocationAutocomplete({
  onLocationSelect,
  placeholder = "Enter a location",
  initialValue = "",
}: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if location permission was previously denied
    const locationDenied = localStorage.getItem('locationPermissionDenied');
    
    if (!locationDenied && !initialValue) {
      setShowLocationDialog(true);
    }
  }, [initialValue]);

  const setMumbaiAsDefault = () => {
    const mumbaiLocation = {
      display_name: "Mumbai, Maharashtra, India",
      lat: "19.0760",
      lon: "72.8777"
    };
    
    setQuery(mumbaiLocation.display_name);
    onLocationSelect(mumbaiLocation.display_name, { 
      lat: parseFloat(mumbaiLocation.lat), 
      lon: parseFloat(mumbaiLocation.lon) 
    });
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocode to get address
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            
            // Check if the location is in India
            if (data.address.country === "India") {
              const locationName = data.display_name;
              setQuery(locationName);
              onLocationSelect(locationName, { lat: latitude, lon: longitude });
            } else {
              setMumbaiAsDefault();
              toast({
                title: "Location Outside India",
                description: "We currently only support locations in India. Setting Mumbai as default location.",
              });
            }
          } catch (error) {
            console.error("Error getting location:", error);
            setMumbaiAsDefault();
          }
          
          setIsLoading(false);
          setShowLocationDialog(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          localStorage.setItem('locationPermissionDenied', 'true');
          setMumbaiAsDefault();
          setIsLoading(false);
          setShowLocationDialog(false);
        }
      );
    }
  };

  const searchLocations = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery + ", India"
        )}&format=json&addressdetails=1&limit=5&countrycodes=in`
      );
      
      const data = await response.json();
      setSuggestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      searchLocations(query);
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleSelect = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.display_name);
    onLocationSelect(suggestion.display_name, {
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon)
    });
    setOpen(false);
  };

  return (
    <>
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Location Services</DialogTitle>
            <DialogDescription>
              Allow us to access your location to find the best happy hours near you. 
              We'll only use your location to show relevant results.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => {
              setMumbaiAsDefault();
              setShowLocationDialog(false);
            }}>
              Use Mumbai
            </Button>
            <Button onClick={getUserLocation}>
              Allow Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full">
              <Input
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => setOpen(true)}
                className="w-full pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  getUserLocation();
                }}
                className="absolute right-0 top-0 h-full px-3"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span className="sr-only">Use current location</span>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-full" align="start">
            <Command>
              <CommandInput
                placeholder="Search location..."
                value={query}
                onValueChange={setQuery}
              />
              <CommandList>
                <CommandEmpty>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    "No locations found in India."
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.place_id}
                      value={suggestion.display_name}
                      onSelect={() => handleSelect(suggestion)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      <span className="text-sm truncate">
                        {suggestion.display_name}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}