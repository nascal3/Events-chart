import mongoose, { Schema, Document, Model } from 'mongoose';
import Event from './event.model';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  slug: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking schema with validation and indexes
const bookingSchema: Schema<IBooking> = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index on eventId for faster queries when filtering by event
bookingSchema.index({ eventId: 1 });

// Pre-save hook: verify that the referenced event exists
bookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  // Check if the referenced event exists in the database
  const eventExists = await Event.exists({ _id: booking.eventId });
  
  if (!eventExists) {
    throw new Error('Referenced event does not exist');
  }
});

// Create or retrieve the Booking model
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
