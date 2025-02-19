import { getMongoDBUri } from "@/utils/helpers/helpers";
import _mongoose, { connect } from "mongoose";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

async function connectDB() {

  const MONGODB_URI = await getMongoDBUri() as string;

  if (MONGODB_URI === "" || !MONGODB_URI) {
    console.log('uri:', MONGODB_URI);
    throw new Error("Please add your MongoDB URI to .env.local");
  }

  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
  if (cached.conn) {
    console.log("🚀 Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ New connection established");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Connection to database failed");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;