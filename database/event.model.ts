import mongoose, { Schema, Document, Model } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  organizer: string;
  tags: string[];
  agenda: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Event schema with validation and indexes
const eventSchema: Schema<IEvent> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [1, 'Description cannot be empty'],
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
      minlength: [1, 'Overview cannot be empty'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
      minlength: [1, 'Image cannot be empty'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      minlength: [1, 'Venue cannot be empty'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [1, 'Location cannot be empty'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      trim: true,
      minlength: [1, 'Date cannot be empty'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      trim: true,
      minlength: [1, 'Time cannot be empty'],
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      trim: true,
      minlength: [1, 'Mode cannot be empty'],
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
      minlength: [1, 'Audience cannot be empty'],
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
      minlength: [1, 'Organizer cannot be empty'],
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (tags: string[]) => tags.length > 0,
        message: 'Tags array cannot be empty',
      },
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (agenda: string[]) => agenda.length > 0,
        message: 'Agenda array cannot be empty',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Unique index on slug for faster lookups
eventSchema.index({ slug: 1 });

// Pre-save hook: generate slug from title and normalize date/time
eventSchema.pre<IEvent>('save', async function () {
  const event = this as IEvent;

  // Generate URL-friendly slug from title only if title is new or modified
  if (event.isModified('title')) {
    const baseSlug = event.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();

    // Ensure slug is unique by appending timestamp if needed
    let slug = baseSlug;
    let counter = 1;

    while (await mongoose.models.Event?.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    event.slug = slug;
  }

  // Validate and normalize date to ISO format
  if (event.isModified('date')) {
    const parsedDate = new Date(event.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }
    event.date = parsedDate.toISOString();
  }

  // Ensure time is in consistent format (HH:MM)
  if (event.isModified('time')) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(event.time)) {
      throw new Error('Time must be in HH:MM format');
    }
  }
});

// Create or retrieve the Event model
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
