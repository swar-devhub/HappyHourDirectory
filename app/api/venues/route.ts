import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Venue from '@/models/Venue';
import { VenueFilterSchema } from '@/lib/types';
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await new Promise(res => setTimeout(res, 10000));
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const filters = {
      location: searchParams.get('location') || undefined,
      latitude: searchParams.get('latitude') ? parseFloat(searchParams.get('latitude') as string) : undefined,
      longitude: searchParams.get('longitude') ? parseFloat(searchParams.get('longitude') as string) : undefined,
      distance: searchParams.get('distance') ? parseFloat(searchParams.get('distance') as string) : 10,
      // category: searchParams.get('category') ? searchParams.get('category')?.split(',') : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10,
    };
    
    
    // Validate filters
    const { latitude, longitude, distance, page, limit } = VenueFilterSchema.parse(filters);
    
    await dbConnect();
    
    // Build query
    const query: any = {};
    


    
     const radiusInMeters = distance! * 1000;
    const pipeline: any = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [ longitude, latitude ]
          },
          distanceField: "calculatedDistance",
          maxDistance: radiusInMeters,
          spherical: true
        }
      },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ];

    const venues = await Venue.aggregate(pipeline);

    // 5) Count total matches (geo filter only; no sort needed)
    const total = await Venue.countDocuments({
      location: {
        $geoWithin: {
          $centerSphere: [
            [ longitude, latitude ],
            distance! / 6378.1     // radius in radians (earth ≈ 6378.1 km)
          ]
        }
      }
    });
    console.log(venues);
   console.log(total);
    // 6) Return paginated + sorted + counted result
    return NextResponse.json({ venues, total, page, limit });

   
  } catch (error) {
    console.error('Error fetching venues:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request parameters', details: error.errors }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}