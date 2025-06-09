import mongoose, { Schema, Document } from 'mongoose';

export interface IVenue extends Document {
  name: string;
  googleLink: string;
  websiteLink?: string;
  category?: string;
  address?: string;
  openHours?: string;
  phoneNumber?: string;
  reviewCount?: number;
  reviewRating?: number;
  // latitude: number;
  // longitude: number;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lon, lat]
  };
  // cid: string;
  description?: string;
  venueImage?: string;
  reviewsLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VenueSchema = new Schema<IVenue>(
  {
    name: { type: String, required: true },
    googleLink: { type: String},
    websiteLink: { type: String },
    category: { type: String },
    address: { type: String},
    openHours: { type: String},
    phoneNumber: { type: String },
    reviewCount: { type: Number, default: 0 },
    reviewRating: { type: Number, default: 0 },
    // latitude: { type: Number, required: true },
    // longitude: { type: Number, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number],   // [ longitude, latitude ]
        required: true
      }
    },
    // cid: { type: String },
    description: { type: String},
    venueImage: { type: String},
    reviewsLink: { type: String },
  },
  { timestamps: true }
);

// Create a 2dsphere index on location
VenueSchema.index({ location: '2dsphere' });

export default mongoose.models.Venue || mongoose.model<IVenue>('Venue', VenueSchema);