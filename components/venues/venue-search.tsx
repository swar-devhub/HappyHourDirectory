"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BiSearchAlt, BiX } from "react-icons/bi";
import { Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DAYS_OF_WEEK, VENUE_TYPES, SPECIAL_TYPES, DISTANCE_OPTIONS } from "@/lib/constants";
import { LocationAutocomplete } from "@/components/venues/location-autocomplete";

export function VenueSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [location, setLocation] = useState<string>(searchParams.get("location") || "");
  const [distance, setDistance] = useState<number>(Number(searchParams.get("distance")) || 5);
  const [day, setDay] = useState<string>(searchParams.get("day") || "");
  const [time, setTime] = useState<string>(searchParams.get("time") || "");
  const [venueTypes, setVenueTypes] = useState<string[]>(
    searchParams.get("venueType")?.split(",") || []
  );
  const [specialTypes, setSpecialTypes] = useState<string[]>(
    searchParams.get("specialType")?.split(",") || []
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (location) params.append("location", location);
    if (distance) params.append("distance", distance.toString());
    if (day) params.append("day", day);
    if (time) params.append("time", time);
    if (venueTypes.length) params.append("venueType", venueTypes.join(","));
    if (specialTypes.length) params.append("specialType", specialTypes.join(","));
    
    router.push(`/venues?${params.toString()}`);
  };

  const clearFilters = () => {
    setDistance(5);
    setDay("");
    setTime("");
    setVenueTypes([]);
    setSpecialTypes([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <LocationAutocomplete 
            onLocationSelect={(location) => setLocation(location)}
            placeholder="Enter a location"
            initialValue={location}
          />
        </div>
        
        <div className="flex gap-2">
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96 p-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Distance</Label>
                  <div className="flex items-center justify-between">
                    <Select value={distance.toString()} onValueChange={(value) => setDistance(Number(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select distance" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISTANCE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Day</Label>
                    <Select value={day} onValueChange={setDay}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any day</SelectItem>
                        {DAYS_OF_WEEK.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any time</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Venue Type</Label>
                  <ScrollArea className="h-28 rounded-md border p-2">
                    <div className="space-y-2">
                      {VENUE_TYPES.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`venue-${type}`} 
                            checked={venueTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setVenueTypes([...venueTypes, type]);
                              } else {
                                setVenueTypes(venueTypes.filter((t) => t !== type));
                              }
                            }}
                          />
                          <label
                            htmlFor={`venue-${type}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="space-y-2">
                  <Label>Special Types</Label>
                  <ScrollArea className="h-28 rounded-md border p-2">
                    <div className="space-y-2">
                      {SPECIAL_TYPES.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`special-${type}`} 
                            checked={specialTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSpecialTypes([...specialTypes, type]);
                              } else {
                                setSpecialTypes(specialTypes.filter((t) => t !== type));
                              }
                            }}
                          />
                          <label
                            htmlFor={`special-${type}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <Button className="w-full" onClick={() => {
                  handleSearch();
                  setIsFiltersOpen(false);
                }}>
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      {/* Active filters display */}
      {(venueTypes.length > 0 || specialTypes.length > 0 || day || time || distance !== 5) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {distance !== 5 && (
            <Badge onClose={() => setDistance(5)}>
              Within {distance} miles
            </Badge>
          )}
          
          {day && (
            <Badge onClose={() => setDay("")}>
              {day}
            </Badge>
          )}
          
          {time && (
            <Badge onClose={() => setTime("")}>
              Around {time.slice(0, 2)}:{time.slice(2)} 
            </Badge>
          )}
          
          {venueTypes.map((type) => (
            <Badge 
              key={`venue-${type}`} 
              onClose={() => setVenueTypes(venueTypes.filter((t) => t !== type))}
            >
              {type}
            </Badge>
          ))}
          
          {specialTypes.map((type) => (
            <Badge 
              key={`special-${type}`} 
              onClose={() => setSpecialTypes(specialTypes.filter((t) => t !== type))}
            >
              {type} Specials
            </Badge>
          ))}
          
          <button 
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

// Badge component with close button
function Badge({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
      {children}
      <button 
        type="button"
        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
        onClick={onClose}
      >
        <BiX className="h-3 w-3" />
        <span className="sr-only">Remove filter</span>
      </button>
    </div>
  );
}