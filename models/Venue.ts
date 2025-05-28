import mongoose, { Schema, Document } from 'mongoose';

export interface IVenue extends Document {
  name: string;
  googleLink: string;
  websiteLink?: string;
  category: string[];
  address: string;
  openHours: string;
  phoneNumber: string;
  reviewCount: number;
  reviewRating: number;
  latitude: number;
  longitude: number;
  description: string;
  venueImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const VenueSchema = new Schema<IVenue>(
  {
    name: { type: String, required: true },
    googleLink: { type: String, required: true },
    websiteLink: { type: String },
    category: [{ type: String }],
    address: { type: String, required: true },
    openHours: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    reviewCount: { type: Number, default: 0 },
    reviewRating: { type: Number, default: 0 },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true },
    venueImage: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a geospatial index for location-based queries
VenueSchema.index({ latitude: 1, longitude: 1 });

export default mongoose.models.Venue || mongoose.model<IVenue>('Venue', VenueSchema);