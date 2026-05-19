import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var mongoose: MongooseConnection | undefined;
}

/**
 * Mongoose connection interface for type safety
 */
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Cached connection object to prevent multiple connections
 * during development with hot reloading
 */
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

/**
 * Establishes a connection to MongoDB using Mongoose
 * 
 * This function implements connection caching to prevent multiple
 * connections during development. It reuses the existing connection
 * if available, or creates a new one if not.
 * 
 * @returns Promise<typeof mongoose> - The Mongoose connection instance
 * @throws Error if MONGODB_URI is not defined or connection fails
 */
export async function connectToDB(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Check if MongoDB URI is defined in environment variables
  if (!process.env.MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // If no cached promise exists, create a new connection promise
  if (!cached.promise) {
    const opts = {
      // Buffering means mongoose will queue up operations if it gets disconnected
      // and retry them once reconnected. This is useful for serverless environments.
      bufferCommands: false,
      
      // Maximum time to wait for initial connection
      serverSelectionTimeoutMS: 5000,
      
      // Enable connection monitoring
      maxPoolSize: 10,
      
      // Minimum number of connections in the pool
      minPoolSize: 2,
    };

    // Create the connection promise
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((connection: typeof mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return connection;
      })
      .catch((error: unknown) => {
        console.error('❌ MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (error: unknown) {
    // Reset cached promise on error
    cached.promise = null;
    throw error;
  }

  // Cache the connection globally for development
  global.mongoose = cached;

  return cached.conn;
}

/**
 * Disconnects from MongoDB
 * Useful for cleanup in tests or when shutting down the application
 */
export async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    global.mongoose = { conn: null, promise: null };
    console.log('🔌 MongoDB disconnected');
  }
}

/**
 * Checks if MongoDB is connected
 * @returns boolean indicating connection status
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
