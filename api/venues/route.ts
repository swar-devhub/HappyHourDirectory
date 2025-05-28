import { NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Venue from '@/models/Venue';
import { VenueFilterSchema } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const filters = {
      location: searchParams.get('location') || undefined,
      latitude: searchParams.get('latitude') ? parseFloat(searchParams.get('latitude') as string) : undefined,
      longitude: searchParams.get('longitude') ? parseFloat(searchParams.get('longitude') as string) : undefined,
      distance: searchParams.get('distance') ? parseFloat(searchParams.get('distance') as string) : undefined,
      category: searchParams.get('category') ? searchParams.get('category')?.split(',') : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10,
    };
    
    // Validate filters
    const validatedFilters = VenueFilterSchema.parse(filters);
    
    await dbConnect();
    
    // Build query
    const query: any = {};
    
    if (validatedFilters.latitude && validatedFilters.longitude && validatedFilters.distance) {
      // Convert distance from miles to meters (1 mile = 1609.34 meters)
      const radiusInMeters = validatedFilters.distance * 1609.34;
      
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [validatedFilters.longitude, validatedFilters.latitude]
          },
          $maxDistance: radiusInMeters
        }
      };
    }
    
    if (validatedFilters.category) {
      query.category = { $in: validatedFilters.category };
    }
    
    const skip = (validatedFilters.page - 1) * validatedFilters.limit;
    
    const [venues, total] = await Promise.all([
      Venue.find(query)
        .skip(skip)
        .limit(validatedFilters.limit)
        .lean(),
      Venue.countDocuments(query)
    ]);
    
    return NextResponse.json({
      venues,
      total,
      page: validatedFilters.page,
      limit: validatedFilters.limit,
    });
  } catch (error) {
    console.error('Error fetching venues:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request parameters', details: error.errors }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}