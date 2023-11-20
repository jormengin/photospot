import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const dbUrl = process.env.MONGODB_URI;
  if (!dbUrl) {
    throw new Error("The MONGODB_URI environment variable is not defined.");
  }

  await mongoose.connect(dbUrl);
}
