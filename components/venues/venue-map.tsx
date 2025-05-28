"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DUMMY_VENUES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

// Fix leaflet marker icon issue
useEffect(() => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
}, []);

interface VenueMapProps {
  venueId?: string;
  singleVenue?: boolean;
}

export function VenueMap({ venueId, singleVenue = false }: VenueMapProps) {
  const router = useRouter();
  const [venues] = useState(DUMMY_VENUES);
  const [position, setPosition] = useState<[number, number]>([37.7749, -122.4194]); // Default to San Francisco
  
  // Set map position based on selected venue or user location
  useEffect(() => {
    if (singleVenue && venueId) {
      const venue = venues.find((v) => v.id === venueId);
      if (venue) {
        // In a real app, we would use the venue's actual coordinates
        setPosition([37.7749 + Math.random() * 0.02 - 0.01, -122.4194 + Math.random() * 0.02 - 0.01]);
      }
    } else {
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition([position.coords.latitude, position.coords.longitude]);
          },
          () => {
            // Use default position if geolocation fails
          }
        );
      }
    }
  }, [venueId, singleVenue, venues]);

  // Filter venues if a specific venue is requested
  const mapVenues = singleVenue && venueId
    ? venues.filter((v) => v.id === venueId)
    : venues;

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Update map center when position changes */}
        <SetMapView position={position} />
        
        {mapVenues.map((venue) => (
          <Marker 
            key={venue.id}
            // In a real app, we would use the venue's actual coordinates
            position={[37.7749 + Math.random() * 0.02 - 0.01, -122.4194 + Math.random() * 0.02 - 0.01]}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-semibold">{venue.name}</h3>
                <p className="text-xs">{venue.address}</p>
                <div className="mt-2">
                  <Button 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => router.push(`/venues/${venue.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Helper component to set map view
function SetMapView({ position }: { position: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  
  return null;
}