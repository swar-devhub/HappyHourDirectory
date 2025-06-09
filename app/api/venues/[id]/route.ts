import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Venue from '@/models/Venue';
import { DUMMY_VENUES } from '@/lib/constants';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // In a real implementation, we would connect to the database and fetch the venue
    // await dbConnect();
    // const venue = await Venue.findById(id);
    
    // For demonstration purposes, return a dummy venue
    const venue = DUMMY_VENUES.find(v => v.id === id);
    
    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }
    
    return NextResponse.json(venue);
  } catch (error) {
    console.error('Error fetching venue:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}