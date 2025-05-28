import { z } from 'zod';

export const LocationSearchSchema = z.object({
  query: z.string().min(1, { message: 'Search query is required' }),
  limit: z.number().optional().default(5),
});

export type LocationSearchParams = z.infer<typeof LocationSearchSchema>;

export const VenueFilterSchema = z.object({
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  distance: z.number().optional(),
  category: z.array(z.string()).optional(),
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
});

export type VenueFilterParams = z.infer<typeof VenueFilterSchema>;

export interface LocationSuggestion {
  place_id: number;
  osm_id: number;
  display_name: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  importance: number;
  address?: {
    country?: string;
  };
}