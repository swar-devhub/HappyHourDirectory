import { NextResponse } from 'next/server';
import { z } from 'zod';
import { LocationSearchSchema } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = searchParams.get('limit') || '5';
    
    // Validate parameters
    const validatedParams = LocationSearchSchema.parse({
      query,
      limit: parseInt(limit),
    });
    
    // Search for locations using OpenStreetMap Nominatim API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        validatedParams.query
      )}&format=json&addressdetails=1&limit=${validatedParams.limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location suggestions');
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in location search:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request parameters', details: error.errors }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}